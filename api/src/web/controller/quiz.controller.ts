import {Body, Controller, Get, Param, Post, UseGuards} from "@nestjs/common";
import {QuizService} from "../../service/quiz.service";
import {JwtAuthGuard} from "../../security/guard/jwt-auth.guard";
import {CreateQuizRequest} from "../dto/input/create-quiz.dto";
import {Subject} from "../../security/decorator/subject.decorator";
import {Principal} from "../dto/output/principal.dto";
import {Quiz} from "../dto/output/quiz.dto";


@Controller('quiz')
export class QuizController {

	constructor(private quizService: QuizService) {}

	@Post()
	@UseGuards(JwtAuthGuard)
	public async createQuiz(@Body() request: CreateQuizRequest, @Subject() principal: Principal): Promise<Quiz> {
		return this.quizService.createQuiz(principal.id, request);
	}

	@Get()
	@UseGuards(JwtAuthGuard)
	public async listQuizzes(): Promise<Quiz[]> {
		return this.quizService.listQuizzes();
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	public async getQuiz(@Param('id') quizId: number): Promise<Quiz> {
		return this.quizService.quizById(quizId);
	}

}
