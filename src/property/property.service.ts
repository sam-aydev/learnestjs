import {
  BadRequestException,
  Body,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { UserService } from 'src/users/providers/user.service';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { Property } from './property.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MetaOption } from 'src/metaoptions/meta-option.entity';
import { TagsService } from 'src/tags/tags.service';
import { PatchPropertyDto } from './dto/patchProperty.dto';
import { ConfigService } from '@nestjs/config';
import { GetPropertyDto } from './dto/get-property.dto';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';

@Injectable()
export class PropertyService {
  constructor(
    private readonly userService: UserService,

    private readonly tagsService: TagsService,

    @InjectRepository(Property)
    private propRepository: Repository<Property>,

    @InjectRepository(MetaOption)
    public metaOptionRepo: Repository<MetaOption>,

    public readonly configService: ConfigService,

    private readonly paginationProvider: PaginationProvider,
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

  public async findAll(
    getPropertyDto: GetPropertyDto,
  ): Promise<Paginated<Property>> {
    const enviroment = this.configService.get<string>('S3_BUCKET');
    console.log(enviroment);
    let properties = await this.paginationProvider.paginateQuery(
      {
        limit: getPropertyDto.limit,
        page: getPropertyDto.page,
      },
      this.propRepository,
    );

    return properties;
  }

  public async delete(id: number) {
    await this.propRepository.delete({ id });

    return { deleted: true };
  }

  public async update(updateDto: PatchPropertyDto) {
    // Find the tags
    let tags = undefined;
    try {
      tags = await this.tagsService.findTags(updateDto.tags);
    } catch (error) {
      throw new RequestTimeoutException('Unable to connect to server', {
        description: 'connection timeout',
      });
    }

    if (!tags) throw new BadRequestException('no tags found');
    // Find the post
    let property = undefined;
    try {
      property = await this.propRepository.findOneBy({ id: updateDto.id });
    } catch (error) {
      throw new RequestTimeoutException('Unable to connect to server', {
        description: 'connection timeout',
      });
    }

    if (!property) throw new BadRequestException('No property data found!');

    // Update the properties
    property.title = updateDto.title ?? property.title;
    property.propertyStatus =
      updateDto.propertyStatus ?? property.propertyStatus;
    property.description = updateDto.description ?? property.description;
    property.propertyType = updateDto.propertyType ?? property.propertyType;
    property.area = updateDto.area ?? property.area;

    // Assign the new tags
    property.tags = tags;

    // Save the property and return
    let propertySave = undefined;
    try {
      propertySave = await this.propRepository.save(property);
    } catch (error) {
      throw new RequestTimeoutException('Unable to connect to server', {
        description: 'connection timeout',
      });
    }
    if (!propertySave)
      throw new BadRequestException('Not your updated the property!');
    return propertySave;
  }
}
