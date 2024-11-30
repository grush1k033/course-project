import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/public.decorator';
@Public()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('mail')
  sendMailer(@Res() response: any) {
    const mail = this.appService.sendMail();

    return response.status(200).json({
      message: 'success',
      mail,
    });
  }
}
