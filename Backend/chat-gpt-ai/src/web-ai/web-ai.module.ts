import { Module } from '@nestjs/common';
import { WebAiController } from './web-ai.controller';
import { WebAiService } from './web-ai.service';

@Module({
  controllers: [WebAiController],
  providers: [WebAiService]
})
export class WebAiModule {}
