import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { MailDto } from './Interfaces/interfaces';

@Injectable()
export class AppService {
  constructor(private readonly mailService: MailerService) {}

  sendMail(dto: MailDto) {
    const message = `Чтобы подтвердить заказ, необходимо перейти по ссылке`;

    this.mailService.sendMail({
      from: 'Expert Car<grushevskiy.yevgeniy@gmail.com>',
      to: dto.mail,
      subject: `Подтверждение заказа № ${dto.orderNumber}`,
      text: message,
      html: `
        <div>${message} <a href="${dto.link}">${dto.link}</a></div>
      `
    });
  }
}