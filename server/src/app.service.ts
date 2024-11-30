import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly mailService: MailerService) {}

  sendMail() {
    const message = `Forgot your password? If you didn't forget your password, please ignore this email!`;

    this.mailService.sendMail({
      from: 'Kingsley Okure <kingsleyokgeorge@gmail.com>',
      to: 'vltn.grushevskiy@mail.com',
      subject: `How to Send Emails with Nodemailer`,
      text: message,
    });
  }
}