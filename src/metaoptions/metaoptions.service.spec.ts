import { Test, TestingModule } from '@nestjs/testing';
import { MetaoptionsService } from './metaoptions.service';

describe('MetaoptionsService', () => {
  let service: MetaoptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MetaoptionsService],
    }).compile();

    service = module.get<MetaoptionsService>(MetaoptionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
