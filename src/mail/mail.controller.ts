import { Controller, Post, Body } from '@nestjs/common';
import { sendMailDto } from './dto/send-mail.dto';
import { MailService } from './mail.service';
import { sendMailPortfolioDto } from './dto/send-mail-portfolio.dto';

@Controller('mail')
export class MailController {
  constructor(private mailService: MailService) {}

  @Post()
  sendMailActividadDos(@Body() newSendMail: sendMailDto) {
    return this.mailService.sendMail(newSendMail);
  }

  @Post('portfolio')
  sendMailPortfolio(@Body() newSendMail: sendMailPortfolioDto) {
    return this.mailService.sendMailPortfolio(newSendMail);
  }
}
