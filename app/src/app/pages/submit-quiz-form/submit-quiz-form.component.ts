import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {QuizService} from "../../services/quiz/quiz.service";
import {Quiz} from "../../models/quiz.dto";
import {SubmitAnswerRequest} from "../../models/submit-quiz.dto";
import {catchError} from "rxjs/operators";
import {MessageService} from "primeng/api";
import {of} from "rxjs";

@Component({
  selector: 'app-submit-quiz-form',
  templateUrl: './submit-quiz-form.component.html',
  styleUrls: ['./submit-quiz-form.component.scss']
})
export class SubmitQuizFormComponent implements OnInit {

  public quiz!: Quiz;
  public loading = true;
  public valid = false

  private answers: { [key: number]: SubmitAnswerRequest } = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private quizService: QuizService,
    private messageService: MessageService
  ) { }

  public ngOnInit() {
    this.route.params
      .subscribe(({ id }) => this.quizService.quizById(id)
        .subscribe(q => {
          this.quiz = q;
          this.loading = false
        })
      );
  }

  public addOrEditAnswers(answer: SubmitAnswerRequest) {
    this.answers[answer.questionId] = answer;
    this.valid = this.quiz.questions.length === Object.values(this.answers).length;
  }

  public submit() {
    if (this.valid) {
      this.loading = true;
      this.quizService
        .submitQuiz(this.quiz.id, { answers: Object.values(this.answers) })
        .subscribe(
          () => {
            this.router.navigateByUrl('/');
            this.loading = false;
          },
          err => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: err
            });
            this.loading = false;
          }
        );
    }
  }

}
