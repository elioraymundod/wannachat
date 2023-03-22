import { Test, TestingModule } from '@nestjs/testing';
import { WebAiController } from './web-ai.controller';

describe('WebAiController', () => {
  let controller: WebAiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebAiController],
    }).compile();

    controller = module.get<WebAiController>(WebAiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
