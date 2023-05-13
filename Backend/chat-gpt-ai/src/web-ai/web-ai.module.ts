import { Module } from '@nestjs/common';
import { WebAiController } from './web-ai.controller';
import { WebAiService } from './web-ai.service';
import { UserRepository } from './repositories/user-repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user-model';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [WebAiController],
  providers: [WebAiService, UserRepository],
  exports: [WebAiService]
})
export class WebAiModule {}
