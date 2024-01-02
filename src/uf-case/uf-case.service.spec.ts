import { Test, TestingModule } from '@nestjs/testing';
import { UfCaseService } from './uf-case.service';

describe('UfCaseService', () => {
  let service: UfCaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UfCaseService],
    }).compile();

    service = module.get<UfCaseService>(UfCaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
