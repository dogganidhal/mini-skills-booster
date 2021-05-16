import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";
import {BaseService} from "../index";
import {Quiz} from "../../models/quiz.dto";
import {Submission} from "../../models/submission.dto";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

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

}
