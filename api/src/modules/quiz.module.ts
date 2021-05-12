import {Module} from "@nestjs/common";
import {QuizController} from "../web/controller/quiz.controller";
import {QuizService} from "../service/quiz.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Quiz} from "../model/quiz.entity";
import {User} from "../model/user.entity";
import {Question} from "../model/question.entity";
import {Suggestion} from "../model/suggestion.entity";
import {Answer} from "../model/answer.entity";
import {Submission} from "../model/submission.entity";


@Module({
	imports: [
		TypeOrmModule.forFeature([Quiz, User, Question, Suggestion, Answer, Submission])
	],
	providers: [QuizService],
	controllers: [QuizController]
})
export class QuizModule {}
