import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebAiModule } from './web-ai/web-ai.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [WebAiModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
