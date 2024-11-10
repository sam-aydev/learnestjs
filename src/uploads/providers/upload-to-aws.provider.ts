import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import * as path from 'path';
import { v4 as uuid4 } from 'uuid';

@Injectable()
export class UploadToAwsProvider {
  constructor(private readonly configService: ConfigService) {}
  public async fileUpload(file: Express.Multer.File) {
    try {
      const s3 = new S3();
      const uploadResult = await s3
        .upload({
          Bucket: this.configService.get('appConfig.awsBucketName'),
          Body: file.buffer,
          Key: this.generateFileName(file),
          ContentType: file.mimetype,
        })
        .promise();
    } catch (error) {
      throw new RequestTimeoutException(error);
    }
  }

  private generateFileName(file: Express.Multer.File) {
    // Extract file name
    let name = file.originalname.split('.')[0];

    // Remove white spaces
    name.replace(/\s/g, '').trim();

    // Extract the extension
    let extension = path.extname(file.originalname);

    // Generate the timestamp
    let timestamp = new Date().getTime().toString().trim();

    // Return file uuid
    return `${name}-${timestamp}-${uuid4()}${extension}`;
  }
}
