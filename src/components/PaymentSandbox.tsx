
export default function PaymentSandbox() {
  const testBankConnection = async () => {
    try {
      const response = await fetch(
        '/.netlify/functions/create-payment-session',
        { method: 'POST' }
      );

      const data = await response.json();

      if (!response.ok || !data.token) {
        alert('تعذّر إنشاء جلسة الدفع التجريبية');
        return;
      }
      if (!data.orderId) {
  alert('تعذّر إنشاء رقم الطلب التجريبي');
  return;
}

sessionStorage.setItem(
  'setatbyotSandboxOrderId',
  data.orderId
);

    if (!data.clientLibrary || !data.clientLibraryIntegrity) {
  alert('بيانات نموذج الدفع غير مكتملة');
  return;
}

const script = document.createElement('script');

script.src = data.clientLibrary;
script.integrity = data.clientLibraryIntegrity;
script.crossOrigin = 'anonymous';
script.async = true;

script.onload = async () => {
  try {
    const bankAccept = (window as any).Accept;

    if (typeof bankAccept !== 'function') {
      throw new Error('Bank SDK unavailable');
    }

    const accept = await bankAccept(data.token);
    const up = await accept.unifiedPayments();

const orderId = sessionStorage.getItem('setatbyotSandboxOrderId');

if (!orderId) {
  alert('رقم الطلب التجريبي غير موجود');
  return;
}

const transientToken = await up.show({
  containers: {
    paymentSelection: '#payment-form'
  }
});

if (!transientToken) return;

if (typeof up.complete !== 'function') {
  alert('إتمام الدفع غير متاح في جلسة البنك الحالية');
  return;
}

const resultJWT = await up.complete(transientToken);

if (typeof resultJWT !== 'string') {
  alert('نتيجة البنك غير متوقعة. لم يتم تأكيد الدفع.');
  return;
}

const verifyResponse = await fetch(
  '/.netlify/functions/verify-payment-result',
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orderId, resultJWT })
  }
);

const verification = await verifyResponse.json();

if (!verifyResponse.ok || verification.signatureVerified !== true) {
  alert('تعذّر التحقق من توقيع البنك. لا تعتبر العملية مدفوعة.');
  return;
}

alert('تم التحقق من توقيع البنك، لكن تأكيد الدفع النهائي قيد التجهيز.');

  } catch {
    alert('تعذّر عرض نموذج الدفع التجريبي');
  }
};

script.onerror = () => {
  alert('تعذّر تحميل مكتبة الدفع من البنك');
};

document.body.appendChild(script);
    } catch {
      alert('الاتصال بالبنك يحتاج نسخة Netlify التجريبية، وليس Vite المحلي');
    }
  };

  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'var(--background)',
        color: 'var(--foreground)',
        display: 'grid',
        placeItems: 'center',
        padding: '24px',
      }}
    >
      <section
        style={{
          width: '100%',
          maxWidth: '480px',
          padding: '32px',
          border: '1px solid #D9BB70',
          borderRadius: '20px',
          textAlign: 'center',
        }}
      >
        <p style={{ color: '#B18C41', fontWeight: 700 }}>
          SETAT BYOT — PAYMENT SANDBOX
        </p>

        <h1>الدفع الإلكتروني</h1>

        <p>تجربة بوابة الدفع الخاصة ببنك الاتحاد</p>

        <h2>1.00 د.أ</h2>

        <button
          type="button"
          onClick={testBankConnection}
          style={{
            width: '100%',
            padding: '15px',
            marginTop: '20px',
            backgroundColor: '#123F39',
            color: '#E8C566',
            border: '1px solid #E8C566',
            borderRadius: '12px',
            fontSize: '17px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          💳 اختبار الاتصال ببنك الاتحاد
        </button>
        <div
  id="payment-form"
  style={{
    marginTop: '24px',
    textAlign: 'start',
  }}
/>

        <p style={{ fontSize: '14px', marginTop: '20px' }}>
          هذه صفحة اختبار فقط، ولا تستقبل دفعات حقيقية.
        </p>
      </section>
    </main>
  );
}
