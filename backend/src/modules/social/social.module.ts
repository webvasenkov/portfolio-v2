import { Module } from '@nestjs/common';
import { SocialService } from './social.service';
import { SocialController } from './social.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocialEntity } from './entities/social.entity';
import { appGuard } from 'src/lib/helper';

@Module({
  imports: [TypeOrmModule.forFeature([SocialEntity])],
  controllers: [SocialController],
  providers: [SocialService, appGuard],
})
export class SocialModule {}
