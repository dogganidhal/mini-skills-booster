import {Component, Input, OnInit} from '@angular/core';
import {Submission} from "../../models/submission.dto";

@Component({
  selector: 'app-user-submissions',
  templateUrl: './user-submissions.component.html',
  styleUrls: ['./user-submissions.component.scss']
})
export class UserSubmissionsComponent implements OnInit {

  @Input()
  public submissions: Submission[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
