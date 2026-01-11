const nodemailer = require('nodemailer');

// Create reusable transporter
const createTransporter = () => {
    return nodemailer.createTransporter({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });
};

// Send email
const sendEmail = async (options) => {
    try {
        const transporter = createTransporter();

        const mailOptions = {
            from: `IEPSL <${process.env.EMAIL_USER}>`,
            to: options.to,
            subject: options.subject,
            text: options.text,
            html: options.html
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.messageId);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

// Email templates
const emailTemplates = {
    // Welcome email after registration
    welcome: (memberName, email) => ({
        subject: 'Welcome to IEPSL - Registration Received',
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #008080;">Welcome to IEPSL!</h2>
        <p>Dear ${memberName},</p>
        <p>Thank you for registering with the Institute of Environmental Professionals Sri Lanka (IEPSL).</p>
        <p>Your registration has been received and is currently under review by our team.</p>
        <p>You will receive an email notification once your application has been processed.</p>
        <p>If you have any questions, please don't hesitate to contact us.</p>
        <br>
        <p>Best regards,<br>IEPSL Team</p>
      </div>
    `
    }),

    // Application approved
    approved: (memberName, membershipId) => ({
        subject: 'IEPSL Membership Approved',
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #10b981;">Congratulations! Your Membership is Approved</h2>
        <p>Dear ${memberName},</p>
        <p>We are pleased to inform you that your IEPSL membership application has been approved!</p>
        <p><strong>Your Membership ID:</strong> ${membershipId}</p>
        <p>You can now access all member benefits and services.</p>
        <p>Login to your account to view your membership card and profile.</p>
        <br>
        <p>Best regards,<br>IEPSL Team</p>
      </div>
    `
    }),

    // Application rejected
    rejected: (memberName, reason) => ({
        subject: 'IEPSL Membership Application Update',
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #ef4444;">Membership Application Status</h2>
        <p>Dear ${memberName},</p>
        <p>Thank you for your interest in IEPSL membership.</p>
        <p>After careful review, we regret to inform you that your application could not be approved at this time.</p>
        ${reason ? `<p><strong>Reason:</strong> ${reason}</p>` : ''}
        <p>If you have any questions or would like to reapply, please contact us.</p>
        <br>
        <p>Best regards,<br>IEPSL Team</p>
      </div>
    `
    }),

    // Payment received
    paymentReceived: (memberName, amount, receiptNumber) => ({
        subject: 'Payment Received - IEPSL',
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #008080;">Payment Received</h2>
        <p>Dear ${memberName},</p>
        <p>We have received your payment of <strong>LKR ${amount}</strong>.</p>
        <p><strong>Receipt Number:</strong> ${receiptNumber}</p>
        <p>Your payment is being verified and will be confirmed shortly.</p>
        <br>
        <p>Best regards,<br>IEPSL Team</p>
      </div>
    `
    })
};

// Send specific email types
exports.sendWelcomeEmail = async (to, memberName) => {
    const template = emailTemplates.welcome(memberName);
    return await sendEmail({ to, ...template });
};

exports.sendApprovalEmail = async (to, memberName, membershipId) => {
    const template = emailTemplates.approved(memberName, membershipId);
    return await sendEmail({ to, ...template });
};

exports.sendRejectionEmail = async (to, memberName, reason) => {
    const template = emailTemplates.rejected(memberName, reason);
    return await sendEmail({ to, ...template });
};

exports.sendPaymentReceivedEmail = async (to, memberName, amount, receiptNumber) => {
    const template = emailTemplates.paymentReceived(memberName, amount, receiptNumber);
    return await sendEmail({ to, ...template });
};

exports.sendEmail = sendEmail;
