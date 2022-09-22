import { Injectable } from '@nestjs/common';
import { CreateMailDto } from './dto/create-mail.dto';
import { createTransport, Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

@Injectable()
export class MailService {
  sendGmail(
    createMailDto: CreateMailDto,
  ): Promise<SMTPTransport.SentMessageInfo> {
    const transporter = this.getTransporter();

    return transporter.sendMail({
      from: `${createMailDto.name} <${process.env.GMAIL_USER}>`,
      to: 'webvasenkov@gmail.com',
      subject: 'Message from portfolio',
      text: `createMailDto.text by ${createMailDto.email}`,
      html: `<b>${createMailDto.text} by ${createMailDto.email}</b>`,
    });
  }

  getTransporter(): Transporter {
    return createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });
  }
}
