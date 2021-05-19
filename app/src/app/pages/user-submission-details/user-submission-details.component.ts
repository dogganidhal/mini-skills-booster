import {Component, OnInit} from '@angular/core';
import {Submission} from "../../models/submission.dto";
import {ActivatedRoute} from "@angular/router";
import {QuizService} from "../../services/quiz/quiz.service";
import {Answer} from "../../models/answer.dto";
import {Location} from "@angular/common";

@Component({
  selector: 'app-user-submission-details',
  templateUrl: './user-submission-details.component.html',
  styleUrls: ['./user-submission-details.component.scss']
})
export class UserSubmissionDetailsComponent implements OnInit {

  public submission?: Submission;
  public loading: boolean = false;

  constructor(private route: ActivatedRoute, private quizService: QuizService, private location: Location) { }

  public ngOnInit() {
    this.loading = true;
    this.route.params
      .subscribe(({ id }) => {
        this.quizService.submissionById(id)
          .subscribe(s => {
            this.submission = s;
            this.loading = false
          });
      });
  }

  public getAnswer(questionId: number): Answer | undefined {
    return this.submission?.answers?.filter(a => a.question.id === questionId)?.pop();
  }

  public goBack() {
    this.location.back();
  }
}
