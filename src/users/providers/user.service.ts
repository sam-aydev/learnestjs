import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PropertyService } from 'src/property/property.service';
import { Repository } from 'typeorm';
import { User } from '../user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>) {}
  public async createUser(createUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: {
        email: createUserDto.email
      }
    })

    let newUser = this.userRepository.create(createUserDto)
    newUser = await this.userRepository.save(newUser)
    return newUser
  }
}
