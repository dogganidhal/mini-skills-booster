import {Component, OnDestroy, OnInit} from '@angular/core';
import {Quiz} from "../../models/quiz.dto";
import {Submission} from "../../models/submission.dto";
import {QuizService} from "../../services/quiz/quiz.service";
import {Subscription} from "rxjs";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-main',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  private quizzesLoading = true;
  private submissionsLoading = true;

  private subscriptions: Subscription[] = [];

  public get loading(): boolean {
    return this.quizzesLoading || this.submissionsLoading;
  }

  public userQuizzes: Quiz[] = [];
  public userSubmissions: Submission[] = [];

  constructor(private quizService: QuizService, private authService: AuthService) { }

  public ngOnInit() {
    this.subscriptions.push(
      this.quizService
        .loadUserQuizzes()
        .subscribe(quizzes => this.userQuizzes = quizzes),
      this.quizService
        .loadUserSubmissions()
        .subscribe(submissions => this.userSubmissions = submissions)
    );
  }

  public ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  public logout() {
    this.authService.logout();
  }

}
