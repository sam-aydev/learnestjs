import { Body, Injectable } from '@nestjs/common';
import { UserService } from 'src/users/providers/user.service';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { Property } from './property.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MetaOption } from 'src/metaoptions/meta-option.entity';

@Injectable()
export class PropertyService {
  constructor(
    private readonly userService: UserService,

    @InjectRepository(Property)
    private readonly propRepository: Repository<Property>,

    @InjectRepository(MetaOption)
    public readonly metaOptionRepo: Repository<MetaOption>,
  ) {}

  public async create(@Body() createPropDto: CreatePropertyDto) {
    let author = await this.userService.findUserById(createPropDto.authorId);
    let property = this.propRepository.create({ ...createPropDto, author });

    return await this.propRepository.save(property);
  }

  public async findAll() {
    return await this.propRepository.find();
  }

  public async delete(id: number) {
    await this.propRepository.delete({ id });

    return { deleted: true };
  }
}
