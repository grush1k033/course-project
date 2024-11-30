import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/public.decorator';
import { MailDto } from './Interfaces/interfaces';
@Public()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('mail')
  sendMailer(@Res() response: any, @Body() dto: MailDto) {
    const mail = this.appService.sendMail(dto);

    return response.status(200).json({
      message: 'success',
      mail,
    });
  }
}
