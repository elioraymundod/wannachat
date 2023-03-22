import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { WebAiService } from './web-ai.service';
import { ModelAnswer } from './models/model-answer';

@Controller('web-ai')
export class WebAiController {
  constructor(private readonly webAiSvc: WebAiService) {}

  @Post('/message')
  @UsePipes(ValidationPipe)
  getAnswer(@Body() data: ModelAnswer) {
    return this.webAiSvc.getModelAnswer(data.question);
  }
}
