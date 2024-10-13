import { Body, Injectable } from '@nestjs/common';
import { UserService } from 'src/users/providers/user.service';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { Property } from './property.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MetaOption } from 'src/metaoptions/meta-option.entity';
import { TagsService } from 'src/tags/tags.service';
import { PatchPropertyDto } from './dto/patchProperty.dto';

@Injectable()
export class PropertyService {
  constructor(
    private readonly userService: UserService,

    private readonly tagsService: TagsService,

    @InjectRepository(Property)
    private readonly propRepository: Repository<Property>,

    @InjectRepository(MetaOption)
    public readonly metaOptionRepo: Repository<MetaOption>,
  ) {}

  public async create(@Body() createPropDto: CreatePropertyDto) {
    let author = await this.userService.findUserById(createPropDto.authorId);

    let tags = await this.tagsService.findTags(createPropDto.tags);
    let property = this.propRepository.create({
      ...createPropDto,
      author,
      tags,
    });

    return await this.propRepository.save(property);
  }

  public async findAll() {
    return await this.propRepository.find();
  }

  public async delete(id: number) {
    await this.propRepository.delete({ id });

    return { deleted: true };
  }

  public async update(updateDto: PatchPropertyDto) {
    // Find the tags
    let tags = await this.tagsService.findTags(updateDto.tags);

    // Find the post
    let property = await this.propRepository.findOneBy({ id: updateDto.id });

    // Update the properties
    property.title = updateDto.title ?? property.title;
    property.propertyStatus =
      updateDto.propertyStatus ?? property.propertyStatus;
    property.description = updateDto.description ?? property.description;
    property.propertyType = updateDto.propertyType ?? property.propertyType;
    property.area = updateDto.area ?? property.area;

    // Assign the new tags
    property.tags = tags;

    // Save the post and return
    return await this.propRepository.save(property);
  }
}
