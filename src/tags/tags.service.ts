import { Injectable } from '@nestjs/common';
import { TagDto } from './dto/tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './tags.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}
  public async createTags(createTagDto: TagDto) {
    let tagsCreation = this.tagRepository.create(createTagDto);
    return await this.tagRepository.save(tagsCreation);
  }
}
