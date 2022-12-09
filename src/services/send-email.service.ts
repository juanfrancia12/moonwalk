import { createTransport } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import {
  SEND_MAIL_USER,
  SEND_MAIL_PASS,
  SEND_MAIL_FROM,
  SEND_MAIL_TO,
} from "../config";

const config: SMTPTransport | SMTPTransport.Options | string = {
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: SEND_MAIL_USER,
    pass: SEND_MAIL_PASS,
  },
};

const MESSAGE_FROM = SEND_MAIL_FROM;
const MESSAGE_TO = SEND_MAIL_TO;
const MESSAGE_SUBJECT = "Correo de prueba 3";
const MESSAGE_TEXT =
  "Este es la segunda prueba de nodemailer, node js y typescript";
// const HTML = '<strong>Hello world?</strong>'

export const SendEmailService = async ({
  message_to,
  message_subject,
  message_text,
}: SendEmailServiceProps) => {
  const mensaje = {
    from: MESSAGE_FROM,
    to: message_to || MESSAGE_TO,
    subject: message_subject || MESSAGE_SUBJECT,
    text: message_text || MESSAGE_TEXT,
  };

  const transport = createTransport(config);

  const info = await transport.sendMail(mensaje);
  console.log(info);
};

type SendEmailServiceProps = {
  message_to?: string;
  message_subject?: string;
  message_text?: string;
};
