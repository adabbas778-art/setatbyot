
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

      alert('تم إنشاء جلسة تجريبية مع بنك الاتحاد بنجاح');
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

        <p style={{ fontSize: '14px', marginTop: '20px' }}>
          هذه صفحة اختبار فقط، ولا تستقبل دفعات حقيقية.
        </p>
      </section>
    </main>
  );
}
