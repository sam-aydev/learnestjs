import { Injectable } from '@nestjs/common';
import { UploadToAwsProvider } from './upload-to-aws.provider';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Upload } from '../upload.entity';

@Injectable()
export class UploadsService {
  constructor(
    private readonly uploadToAwsProvider: UploadToAwsProvider,

    @InjectRepository(Upload)
    private readonly uploadRepository: Repository<Upload>,
  ) {}
  public async uploadFile(file: Express.Multer.File) {
    // Upload the file AWS S3
    // Generate a new entity
  }
}
