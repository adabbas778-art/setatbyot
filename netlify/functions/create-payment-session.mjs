
import { getDeployStore } from "@netlify/blobs";
export default async function handler(request, context) {
  const json = (data, status = 200) =>
    Response.json(data, {
      status,
      headers: { "Cache-Control": "no-store" }
    });

  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  // Never allow this test function on the live website
  if (context?.deploy?.context !== "deploy-preview") {
  return json({ error: "Sandbox only" }, 403);
}

  const token = process.env.BANK_ETIHAD_SANDBOX_TOKEN;

  if (!token) {
    return json({ error: "Sandbox token not configured" }, 503);
  }

  const origin = new URL(request.url).origin;

  if (request.headers.get("origin") !== origin) {
    return json({ error: "Invalid origin" }, 403);
  }

  try {
    const response = await fetch(
      "https://merchant-order-token.baelab.net/v1/payments/capture-context",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": token,
          "User-Agent": "SetatByot-Sandbox/1.0"
        },
        body: JSON.stringify({
          targetOrigins: [origin],
          totalAmount: "1.00",
          currency: "JOD",
          withDecode: true
        })
      }
    );

    if (!response.ok) {
      return json({ error: "Bank test session failed" }, 502);
    }

    const data = await response.json();

    if (!data.token || !data.clientLibrary || !data.clientLibraryIntegrity) {
      return json({ error: "Incomplete bank response" }, 502);
    }

  const orderId = crypto.randomUUID();

const store = getDeployStore("payment-sandbox-sessions");

await store.setJSON(orderId, {
  status: "pending",
  amount: "1.00",
  currency: "JOD",
  captureContext: data.token,
  origin,
  createdAt: new Date().toISOString()
}, { onlyIfNew: true });

return json({
  orderId,
  token: data.token,
  clientLibrary: data.clientLibrary,
  clientLibraryIntegrity: data.clientLibraryIntegrity
});
  } catch {
    return json({ error: "Unable to contact bank sandbox" }, 502);
  }
}
