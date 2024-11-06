import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FindOneBgGoogleIdProvider {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>
    ){}
    
    public async findOneByGoogleId(googleId: string){
        return await this.usersRepository.findOneBy({googleId})
    }
}
