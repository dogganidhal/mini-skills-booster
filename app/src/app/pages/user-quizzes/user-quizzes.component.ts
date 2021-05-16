import {Component, Input, OnInit} from '@angular/core';
import {Quiz} from "../../models/quiz.dto";

@Component({
  selector: 'app-user-quizzes',
  templateUrl: './user-quizzes.component.html',
  styleUrls: ['./user-quizzes.component.scss']
})
export class UserQuizzesComponent implements OnInit {

  @Input()
  public quizzes: Quiz[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
