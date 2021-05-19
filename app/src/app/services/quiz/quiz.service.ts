import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";
import {BaseService} from "../index";
import {Quiz} from "../../models/quiz.dto";
import {Submission} from "../../models/submission.dto";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {SubmitQuizRequest} from "../../models/submit-quiz.dto";
import {SubmissionReport} from "../../models/submission-report.dto";
import {CreateQuizRequest} from "../../models/create-quiz.dto";

@Injectable({
  providedIn: 'root'
})
export class QuizService extends BaseService {

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  public loadUserQuizzes(): Observable<Quiz[]> {
    return this.httpClient
      .get<Quiz[]>(`${environment.apiUrl}/quiz/mine`)
      .pipe(catchError(this.handleError.bind(this)));
  }

  public loadUserSubmissions(): Observable<Submission[]> {
    return this.httpClient
      .get<Submission[]>(`${environment.apiUrl}/quiz/submission/mine`)
      .pipe(catchError(this.handleError.bind(this)));
  }

  public quizById(id: number): Observable<Quiz> {
    return this.httpClient
      .get<Quiz>(`${environment.apiUrl}/quiz/${id}`)
      .pipe(catchError(this.handleError.bind(this)));
  }

  public submissionById(id: number): Observable<Submission> {
    return this.httpClient
      .get<Submission>(`${environment.apiUrl}/quiz/submission/${id}`)
      .pipe(catchError(this.handleError.bind(this)));
  }

  public submitQuiz(quizId: number, request: SubmitQuizRequest): Observable<SubmissionReport> {
    return this.httpClient
      .post<SubmissionReport>(`${environment.apiUrl}/quiz/${quizId}/submit`, request)
      .pipe(catchError(this.handleError.bind(this)));
  }

  public createQuiz(request: CreateQuizRequest): Observable<Quiz> {
    return this.httpClient
      .post<Quiz>(`${environment.apiUrl}/quiz`, request)
      .pipe(catchError(this.handleError.bind(this)));
  }

}
