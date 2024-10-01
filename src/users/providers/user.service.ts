import { Injectable } from '@nestjs/common';
import { PropertyService } from 'src/property/property.service';

@Injectable()
export class UserService {
  constructor(private readonly propertyService: PropertyService) {}
  public findAll() {
    return this.propertyService.findAll;
  }
}
