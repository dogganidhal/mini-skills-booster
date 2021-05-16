import {Component, Input, OnInit} from '@angular/core';
import {Quiz} from "../../models/quiz.dto";

@Component({
  selector: 'app-user-quiz-list',
  templateUrl: './user-quiz-list.component.html',
  styleUrls: ['./user-quiz-list.component.scss']
})
export class UserQuizListComponent implements OnInit {

  @Input()
  public quizzes: Quiz[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
