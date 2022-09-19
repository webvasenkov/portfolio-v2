import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSocialDto } from './dto/createSocialDto';
import { UpdateSocialDto } from './dto/updateSocialDto';
import { SocialEntity } from './social.entity';

@Injectable()
export class SocialService {
  constructor(
    @InjectRepository(SocialEntity)
    private readonly socialRep: Repository<SocialEntity>,
  ) {}

  async create(createSocialDto: CreateSocialDto): Promise<SocialEntity> {
    await this.checkNameExists(createSocialDto.name);
    const social = new SocialEntity();
    return this.save(social, createSocialDto);
  }

  findAll(): Promise<SocialEntity[]> {
    return this.socialRep.find();
  }

  async findOne(socialId: number): Promise<SocialEntity> {
    const social = await this.socialRep.findOne({
      where: { id: socialId },
    });

    if (!social) {
      throw new HttpException(
        'Social with this id not found',
        HttpStatus.NOT_FOUND,
      );
    }

    return social;
  }

  async update(
    socialId: number,
    updateSocialDto: UpdateSocialDto,
  ): Promise<SocialEntity> {
    const social = await this.findOne(socialId);
    await this.checkNameExists(updateSocialDto.name, socialId);
    return this.save(social, updateSocialDto);
  }

  async delete(socialId: number) {
    await this.findOne(socialId);
    this.socialRep.delete(socialId);
  }

  async checkNameExists(name: string, socialId?: number): Promise<HttpException | undefined> {
    const social = await this.socialRep.findOne({ where: { name } });

    if (social && social.id !== socialId) {
      throw new HttpException(
        'Social with this name already exists',
        HttpStatus.CONFLICT,
      );
    }

    return undefined;
  }

  save(social: SocialEntity, dto: CreateSocialDto): Promise<SocialEntity> {
    Object.assign(social, dto);
    return this.socialRep.save(social);
  }
}
