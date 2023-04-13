import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport';

@Injectable()
export class MailService {
   transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;
   constructor(){
      this.transporter = nodemailer.createTransport({
         host: process.env.SMTP_HOST,
         port:Number(process.env.SMTP_PORT),
         secure: false,
         auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
         }
      })
   }

   async sendActivationMail(email:string, link:string) {
      await this.transporter.sendMail({
         from: process.env.SMTP_USER,
         to: email,
         subject: `Активация аккаунта на ${process.env.API_URL}`,
         text: '',
         html: 
            `
               <div>
                  <h1>Для активации перейдите по ссылке</h1>
                  <a href="${link}">${link}</h1>
               </div>
            `
      })
   }
}
