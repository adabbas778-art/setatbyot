
import { getDeployStore } from "@netlify/blobs";
import { decodeProtectedHeader, importJWK, jwtVerify } from "jose";

export default async function handler(request, context) {
  const reply = (data, status = 200) =>
    Response.json(data, {
      status,
      headers: { "Cache-Control": "no-store" }
    });

  if (request.method !== "POST") {
    return reply({ error: "Method not allowed" }, 405);
  }

  if (context?.deploy?.context !== "deploy-preview") {
    return reply({ error: "Sandbox only" }, 403);
  }

  if (request.headers.get("origin") !== new URL(request.url).origin) {
    return reply({ error: "Invalid origin" }, 403);
  }

  try {
    const body = await request.json();
    const { orderId, resultJWT } = body;

    if (
      typeof orderId !== "string" ||
      !/^[0-9a-f-]{36}$/i.test(orderId) ||
      typeof resultJWT !== "string" ||
      resultJWT.length > 20000
    ) {
      return reply({ error: "Invalid request" }, 400);
    }

    const store = getDeployStore("payment-sandbox-sessions");
    const order = await store.get(orderId, {
      type: "json",
      consistency: "strong"
    });

    if (!order || order.status !== "pending") {
      return reply({ error: "Invalid or processed order" }, 409);
    }

    const header = decodeProtectedHeader(resultJWT);

    if (
      header.alg !== "RS256" ||
      typeof header.kid !== "string" ||
      !/^[a-zA-Z0-9_-]{1,128}$/.test(header.kid)
    ) {
      return reply({ error: "Invalid JWT header" }, 400);
    }

    const keyResponse = await fetch(
      `https://apitest.cybersource.com/flex/v2/public-keys/${encodeURIComponent(header.kid)}`
    );

    if (!keyResponse.ok) {
      return reply({ error: "Unable to retrieve verification key" }, 502);
    }

    const jwk = await keyResponse.json();

    if (jwk.kty !== "RSA" || !jwk.n || !jwk.e) {
      return reply({ error: "Invalid verification key" }, 502);
    }

    const publicKey = await importJWK(jwk, "RS256");

    await jwtVerify(resultJWT, publicKey, {
      algorithms: ["RS256"]
    });

    return reply({
      signatureVerified: true,
      paymentConfirmed: false,
      message: "Signature verified. Payment checks are still pending."
    });

  } catch {
    return reply({
      signatureVerified: false,
      paymentConfirmed: false,
      error: "Payment result verification failed"
    }, 400);
  }
}
