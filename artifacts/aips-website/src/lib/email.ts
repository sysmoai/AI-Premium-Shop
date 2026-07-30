import sgMail from '@sendgrid/mail';

const sendGridApiKey = process.env.SENDGRID_API_KEY;
const fromEmail = 'orders@aipremiumshop.com';

if (sendGridApiKey) {
  sgMail.setApiKey(sendGridApiKey);
}

interface EmailParams {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendOrderConfirmationEmail(
  customerEmail: string,
  productName: string,
  orderId: string,
  totalBdt: number
) {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #f4b942;">Order Confirmed! 🎉</h1>
      <p>Thank you for your order at <strong>AI Premium Shop</strong>!</p>

      <div style="background-color: #0A0E27; padding: 20px; border-radius: 8px; color: white;">
        <h3>Order Details</h3>
        <p><strong>Order ID:</strong> ${orderId}</p>
        <p><strong>Product:</strong> ${productName}</p>
        <p><strong>Amount:</strong> ৳${totalBdt.toLocaleString('en-BD')}</p>
      </div>

      <h3>What's Next?</h3>
      <ol>
        <li>Your subscription will be activated within 5-30 minutes</li>
        <li>You will receive account credentials via email</li>
        <li>Login and start using the AI tool immediately</li>
      </ol>

      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
        <p>Questions? Contact us:</p>
        <p>
          <a href="https://wa.me/8801865385348">📱 WhatsApp: +880 1865-385348</a><br/>
          <a href="mailto:support@aipremiumshop.com">📧 Email: support@aipremiumshop.com</a>
        </p>
      </div>

      <footer style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
        <p>© 2026 AI Premium Shop. All rights reserved.</p>
        <p>118+ Premium AI Tools at Bangladesh-Friendly Prices</p>
      </footer>
    </div>
  `;

  return sendEmail({
    to: customerEmail,
    subject: `✅ Order Confirmed - ${productName}`,
    html,
  });
}

export async function sendDeliveryNotificationEmail(
  customerEmail: string,
  productName: string,
  credentials: { username: string; password: string; accountLink: string }
) {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #f4b942;">🚀 Your Account is Ready!</h1>
      <p>Great news! Your <strong>${productName}</strong> subscription is now active.</p>

      <div style="background-color: #0A0E27; padding: 20px; border-radius: 8px; color: white;">
        <h3>Account Credentials</h3>
        <p><strong>Username/Email:</strong> ${credentials.username}</p>
        <p><strong>Password:</strong> ${credentials.password}</p>
        <p><a href="${credentials.accountLink}" style="color: #f4b942; text-decoration: none; font-weight: bold;">👉 Click here to login</a></p>
      </div>

      <h3>Getting Started</h3>
      <ol>
        <li>Click the login link above</li>
        <li>Enter your credentials</li>
        <li>Start using ${productName} immediately!</li>
      </ol>

      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
        <p><strong>⚠️ Important Security Tips:</strong></p>
        <ul>
          <li>Change your password after first login</li>
          <li>Don't share credentials with others</li>
          <li>Account is for single user only</li>
        </ul>
      </div>

      <footer style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
        <p>Need help? Contact us on <a href="https://wa.me/8801865385348">WhatsApp</a></p>
        <p>© 2026 AI Premium Shop</p>
      </footer>
    </div>
  `;

  return sendEmail({
    to: customerEmail,
    subject: `🎉 ${productName} Account Ready - Login Now!`,
    html,
  });
}

export async function sendSupportReplyEmail(
  customerEmail: string,
  supportResponse: string,
  ticketId: string
) {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #f4b942;">We've Replied to Your Support Ticket</h1>
      <p>Ticket ID: <strong>${ticketId}</strong></p>

      <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; border-left: 4px solid #f4b942;">
        <p>${supportResponse}</p>
      </div>

      <footer style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
        <p>© 2026 AI Premium Shop</p>
      </footer>
    </div>
  `;

  return sendEmail({
    to: customerEmail,
    subject: `Support Reply - Ticket #${ticketId}`,
    html,
  });
}

async function sendEmail({ to, subject, html, text }: EmailParams) {
  if (!sendGridApiKey) {
    console.warn('⚠️  SendGrid API key not configured. Email not sent.');
    console.log('Email preview:', { to, subject });
    return { success: false, message: 'SendGrid not configured' };
  }

  try {
    const msg = {
      to,
      from: fromEmail,
      subject,
      html,
      text: text || 'Check HTML version',
    };

    const response = await sgMail.send(msg);
    console.log(`✅ Email sent to ${to}`);
    return { success: true, messageId: response[0].headers['x-message-id'] };
  } catch (error) {
    console.error('❌ SendGrid error:', error);
    return { success: false, error };
  }
}

const emailService = { sendOrderConfirmationEmail, sendDeliveryNotificationEmail, sendSupportReplyEmail };
export default emailService;
