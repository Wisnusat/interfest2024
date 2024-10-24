import nodemailer from 'nodemailer';

export async function POST(req, res) {
    const { email, subject, text } = await req.json();
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, 
            pass: process.env.EMAIL_PASS,
        },
    });
    // Set up email data
    const mailOptions = {
        from: 'INTERFEST 2024',
        to: email,
        subject: subject,
        text: text,
    };
    try {
        await transporter.sendMail(mailOptions);
        return new Response(JSON.stringify({ message: 'Email sent successfully' }), { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error);
        return new Response(JSON.stringify({ error: 'Error sending email' }), { status: 500 });
    }
}