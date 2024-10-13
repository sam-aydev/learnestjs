import { Injectable } from '@nestjs/common';
import { TagDto } from './dto/tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './tags.entity';
import { In, Repository } from 'typeorm';

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

  public async findTags(tags: number[]) {
    let results = await this.tagRepository.find({
      where: {
        id: In(tags),
      },
    });

    return results;
  }

  public async deleteTags(id: number) {
    await this.tagRepository.delete(id);
    return { deleted: true, id };
  }

  public async softDeleteTag(id: number) {
    await this.tagRepository.softDelete(id);
    return { deleted: true, id };
  }
}
