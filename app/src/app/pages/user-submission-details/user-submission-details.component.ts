import {Component, OnInit} from '@angular/core';
import {Submission} from "../../models/submission.dto";
import {ActivatedRoute} from "@angular/router";
import {QuizService} from "../../services/quiz/quiz.service";

@Component({
  selector: 'app-user-submission-details',
  templateUrl: './user-submission-details.component.html',
  styleUrls: ['./user-submission-details.component.scss']
})
export class UserSubmissionDetailsComponent implements OnInit {

  public submission?: Submission;
  public loading: boolean = true;

  constructor(private route: ActivatedRoute, private quizService: QuizService) { }

  public ngOnInit() {
    this.route.params
      .subscribe(({ id }) => this.quizService.submissionById(id)
        .subscribe(s => {
          this.submission = s;
          this.loading = false
        })
      );
  }

}
