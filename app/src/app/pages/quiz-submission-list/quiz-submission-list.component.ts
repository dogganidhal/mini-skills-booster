import { Component, OnInit } from '@angular/core';
import {Submission} from "../../models/submission.dto";
import {ActivatedRoute} from "@angular/router";
import {QuizService} from "../../services/quiz/quiz.service";
import {Quiz} from "../../models/quiz.dto";

@Component({
  selector: 'app-quiz-submission-list',
  templateUrl: './quiz-submission-list.component.html',
  styleUrls: ['./quiz-submission-list.component.scss']
})
export class QuizSubmissionListComponent implements OnInit {

  public loading = true;
  public quiz!: Quiz;
  public get submissions(): Submission[] {
    return this.quiz.submissions?.map(s => ({
      ...s,
      quiz: this.quiz
    })) || [];
  }

  constructor(private route: ActivatedRoute, private quizService: QuizService) { }

  public ngOnInit() {
    this.route.params
      .subscribe(({ id }) => this.quizService.quizById(id)
        .subscribe(q => {
          this.quiz = q;
          this.loading = false
        })
      );
  }

}
