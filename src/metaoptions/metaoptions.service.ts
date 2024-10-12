import { Injectable } from '@nestjs/common';
import { MetaOptionDto } from './dto/metaoption.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from './meta-option.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MetaoptionsService {
  constructor(
    @InjectRepository(MetaOption)
    private readonly metaOptionsRepo: Repository<MetaOption>,
  ) {}

  public async create(createMetaOptions: MetaOptionDto) {
    let metaOption = this.metaOptionsRepo.create(createMetaOptions);

    return await this.metaOptionsRepo.save(metaOption);
  }
}
