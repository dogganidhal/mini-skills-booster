import {Component, Input, OnInit} from '@angular/core';
import {Submission} from "../../models/submission.dto";

@Component({
  selector: 'app-user-submission-list',
  templateUrl: './user-submission-list.component.html',
  styleUrls: ['./user-submission-list.component.scss']
})
export class UserSubmissionListComponent implements OnInit {

  @Input()
  public submissions!: Submission[];

  constructor() { }

  public ngOnInit() {

  }

}
