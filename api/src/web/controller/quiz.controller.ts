import {Body, Controller, Get, Param, Post, UseGuards} from "@nestjs/common";
import {QuizService} from "../../service/quiz.service";
import {JwtAuthGuard} from "../../security/guard/jwt-auth.guard";
import {CreateQuizRequest} from "../dto/input/create-quiz.dto";
import {Subject} from "../../security/decorator/subject.decorator";
import {Principal} from "../dto/output/principal.dto";
import {Quiz} from "../dto/output/quiz.dto";
import {SubmitQuizRequest} from "../dto/input/submit-quiz.dto";
import {SubmissionReport} from "../dto/output/submission-report.dto";
import {Submission} from "../dto/output/submission.dto";


@Controller('quiz')
export class QuizController {

	constructor(private quizService: QuizService) {
	}

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

	@Get('mine')
	@UseGuards(JwtAuthGuard)
	public async getUserQuizzes(@Subject() principal: Principal): Promise<Quiz[]> {
		return this.quizService.getUserQuizzes(principal.id);
	}

	@Get('submission/mine')
	@UseGuards(JwtAuthGuard)
	public async getUserSubmissions(@Subject() principal: Principal): Promise<Submission[]> {
		return this.quizService.getUserSubmissions(principal.id);
	}

	@Get('submission/:id')
	@UseGuards(JwtAuthGuard)
	public async getSubmission(@Param('id') submissionId: number, @Subject() principal: Principal): Promise<Submission> {
		return this.quizService.submissionById(submissionId, principal.id);
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	public async getQuiz(@Param('id') quizId: number, @Subject() principal: Principal): Promise<Quiz> {
		return this.quizService.quizById(quizId, principal.id);
	}

	@Post(':id/submit')
	@UseGuards(JwtAuthGuard)
	public async submitQuiz(
		@Param('id') quizId: number,
		@Body() request: SubmitQuizRequest,
		@Subject() principal: Principal
	): Promise<SubmissionReport> {
		return this.quizService.submitQuiz(principal.id, quizId, request);
	}

}
