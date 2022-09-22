import { Controller,  Post, Body} from '@nestjs/common';
import { MailService } from './mail.service';
import { CreateMailDto } from './dto/create-mail.dto';
import { Public } from 'src/decorators/public.decorator';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Public()
  @Post('gmail')
  sendGmail(@Body() createMailDto: CreateMailDto) {
    return this.mailService.sendGmail(createMailDto);
  }
}
