import nodemailer from "nodemailer";

interface Credentials {
  auth: {
    user: string;
    pass: string;
  };
  receiver: string;
  host: string;
  emailContent: {
    from: string;
    subject: string;
    text: string;
    html: string;
  };
}

const defaultMailSettings = {
  port: 465,
  secure: true,
};
export default async function mailer(rawConfig: Credentials) {
  const config = { ...defaultMailSettings, ...rawConfig };

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: config.auth,
  });

  const response = await transporter.sendMail({
    ...config.emailContent,
    to: config.receiver,
  });

  return response;
}
