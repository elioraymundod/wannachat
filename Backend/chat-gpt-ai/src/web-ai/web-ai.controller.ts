import {
  Body,
  Controller,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { WebAiService } from './web-ai.service';
import { ModelAnswer, ModelUser } from './models/model-answer';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ErrorsInterceptor } from './interceptors/errors/errors.interceptor';

@ApiTags('web-ai')
@Controller('web-ai')
export class WebAiController {
  constructor(private readonly webAiSvc: WebAiService) {}

  @Post('/message')
  @UsePipes(ValidationPipe)
  @ApiOperation({
    description:
      '## Se utiliza para realizar una pregunta basica a ChatGPT con modelo `text-davinci-003`',
  })
  getAnswer(@Body() data: ModelAnswer) {
    return this.webAiSvc.getModelAnswer(data.question);
  }

  @Post('/start/chat')
  @UsePipes(ValidationPipe)
  @ApiOperation({
    description:
      '## Se inicia la conversación con el bot con el modelo `gpt-3.5-turbo`',
  })
  @UseInterceptors(ErrorsInterceptor)
  async startChat(@Body() data: ModelUser) {
    return await this.webAiSvc.startChat(data.name);
  }
  @Post('/conversation/chat-bot')
  @UsePipes(ValidationPipe)
  @ApiOperation({
    description:
      '## Se continúa la conversión con el bot con el modelo `gpt-3.5-turbo`',
  })
  @UseInterceptors(ErrorsInterceptor)
  async getModelAnswerChat(@Body() data: ModelAnswer) {
    return await this.webAiSvc.askQuestionUser(data.question);
  }
}
