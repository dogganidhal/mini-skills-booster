import { Module } from '@nestjs/common';
import {AuthModule} from "./auth.module";
import {DatabaseModule} from "./database.module";
import {ConfigModule} from "@nestjs/config";
import {QuizModule} from "./quiz.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    DatabaseModule, AuthModule, QuizModule
  ],
})
export class AppModule {}
