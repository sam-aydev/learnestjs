import { Test, TestingModule } from '@nestjs/testing';
import { MetaoptionsController } from './metaoptions.controller';

describe('MetaoptionsController', () => {
  let controller: MetaoptionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MetaoptionsController],
    }).compile();

    controller = module.get<MetaoptionsController>(MetaoptionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
