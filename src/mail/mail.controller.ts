import { Controller, Post, Body } from '@nestjs/common';
import { sendMailDto } from './dto/send-mail.dto';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private mailService: MailService) {}

  @Post()
  createUser(@Body() newSendMail: sendMailDto) {
    return this.mailService.sendMail(newSendMail);
  }
}
