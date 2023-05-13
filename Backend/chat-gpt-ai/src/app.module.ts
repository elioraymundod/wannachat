import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebAiModule } from './web-ai/web-ai.module';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './web-ai/exception-filters/HttpExceptionFilter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './web-ai/models/user-model';

@Module({
  imports: [
    WebAiModule, ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'wannachat',
      entities: [
        User
      ],
      synchronize: true,
    }),
    WebAiModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
