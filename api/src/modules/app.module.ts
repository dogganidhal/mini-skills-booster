import { Module } from '@nestjs/common';
import { QuizService } from '../service/quiz.service';
import { QuizController } from "../web/controller/quiz.controller";
import {AuthModule} from "./auth.module";
import {DatabaseModule} from "./database.module";
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    DatabaseModule, AuthModule
  ],
  providers: [QuizService],
  controllers: [QuizController]
})
export class AppModule {}
