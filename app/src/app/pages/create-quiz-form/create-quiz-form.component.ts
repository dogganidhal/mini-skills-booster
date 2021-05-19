import {Component, OnInit} from '@angular/core';
import {CreateQuestionRequest, CreateQuizRequest} from "../../models/create-quiz.dto";
import {QuizService} from "../../services/quiz/quiz.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-quiz-form',
  templateUrl: './create-quiz-form.component.html',
  styleUrls: ['./create-quiz-form.component.scss']
})
export class CreateQuizFormComponent implements OnInit {

  public loading = false;
  public name: string = '';
  public description: string = '';
  public dueDateString: string = new Date().toISOString();
  public questionIndices: number[] = [];

  public get valid(): boolean {
    return this.name.length > 0 && this.description.length > 0 &&
      this.dueDate.getTime() > new Date().getTime() && this.questionIndices.length > 0;
  }

  private questions: CreateQuestionRequest[] = [];
  private quiz: CreateQuizRequest = {
    name: '',
    description: '',
    dueDate: new Date(),
    questions: []
  };

  private get dueDate(): Date {
    return new Date(Date.parse(this.dueDateString));
  }

  constructor(private quizService: QuizService, private messageService: MessageService, private router: Router) { }

  public ngOnInit() {

  }

  public submit() {
    this.loading = true;
    this.quizService
      .createQuiz(this.quiz)
      .subscribe(
        () => {
          this.loading = false;
          this.router.navigateByUrl('');

        },
        e => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error creating quiz',
            detail: e.toString()
          })
        }
      )
  }

  public updateQuiz() {
    this.quiz = {
      name: this.name,
      description: this.description,
      dueDate: this.dueDate,
      questions: this.questions
    };
    console.log(this.quiz);
  }

  public addQuestion() {
    this.questionIndices.push(this.questionIndices.length);
    this.updateQuiz();
  }

  public editQuestion(index: number, question: CreateQuestionRequest) {
    this.questions = [...this.questions.slice(0, index), question, ...this.questions.slice(index + 1)];
    this.updateQuiz();
  }
}
