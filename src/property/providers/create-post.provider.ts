import {
  BadRequestException,
  Body,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { TagsService } from 'src/tags/tags.service';
import { UserService } from 'src/users/providers/user.service';
import { CreatePropertyDto } from '../dto/createProperty.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from '../property.entity';
import { Repository } from 'typeorm';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interfaces';

@Injectable()
export class CreatePostProvider {
  constructor(
    private readonly userService: UserService,

    private readonly tagsService: TagsService,
    @InjectRepository(Property)
    private propRepository: Repository<Property>,
  ) {}
  public async create(
    @Body() createPropDto: CreatePropertyDto,
    user: ActiveUserData,
  ) {
    let author = undefined;
    let tags = undefined;
    try {
      author = await this.userService.findUserById(user.sub);

      tags = await this.tagsService.findTags(createPropDto.tags);
    } catch (error) {
      throw new ConflictException(error);
    }

    if (createPropDto.tags.length !== tags.length) {
      throw new BadRequestException('Please check your tag Ids');
    }

    let property = this.propRepository.create({
      ...createPropDto,
      author,
      tags,
    });

    try {
      return await this.propRepository.save(property);
    } catch (error) {
      throw new ConflictException(error, {
        description: 'Ensure post slug is unique and not a duplicate',
      });
    }
  }
}
