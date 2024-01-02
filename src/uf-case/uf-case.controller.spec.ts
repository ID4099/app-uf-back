import { Test, TestingModule } from '@nestjs/testing';
import { UfCaseController } from './uf-case.controller';
import { UfCaseService } from './uf-case.service';

describe('UfCaseController', () => {
  let controller: UfCaseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UfCaseController],
      providers: [UfCaseService],
    }).compile();

    controller = module.get<UfCaseController>(UfCaseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
