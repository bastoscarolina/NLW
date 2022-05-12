import { MailAdapter, SendEmailData } from "../mail-adapter";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "21bb8a7e8eec9e",
      pass: "d448a7232567e3"
    }
});
export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({subject,body}: SendEmailData){
        await transport.sendMail({
        from:'Equipe Feddget <oi!feedget.com>',
        to:'Carolina Bastos <kerolzinha95@gmail.com>',
        subject,
        html:body
    })
    }
}