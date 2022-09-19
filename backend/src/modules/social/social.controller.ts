import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { Public } from 'src/decorators/public.decorator';
import { CreateSocialDto } from './dto/createSocialDto';
import { UpdateSocialDto } from './dto/updateSocialDto';
import { SocialEntity } from './social.entity';
import { SocialService } from './social.service';

@Controller()
export class SocialController {
  constructor(private readonly socialService: SocialService) {}

  @Post('social')
  async create(
    @Body() createSocialDto: CreateSocialDto,
  ): Promise<{ social: SocialEntity }> {
    const social = await this.socialService.create(createSocialDto);
    return { social };
  }

  @Public()
  @Get('socials')
  async findAll(): Promise<{ socials: SocialEntity[] }> {
    const socials = await this.socialService.findAll();
    return { socials };
  }

  @Put('social/:id')
  async update(
    @Param('id', ParseIntPipe) socialId: number,
    @Body() updateSocialDto: UpdateSocialDto,
  ): Promise<{ social: SocialEntity }> {
    const social = await this.socialService.update(socialId, updateSocialDto);
    return { social };
  }

  @Delete('social/:id')
  async delete(
    @Param('id', ParseIntPipe) socialId: number,
  ): Promise<{ result: string }> {
    await this.socialService.delete(socialId);
    return { result: 'success' };
  }
}
