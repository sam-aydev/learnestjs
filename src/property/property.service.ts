import { Injectable } from '@nestjs/common';

@Injectable()
export class PropertyService {
  public findAll() {
    return 'All users returned';
  }
}
