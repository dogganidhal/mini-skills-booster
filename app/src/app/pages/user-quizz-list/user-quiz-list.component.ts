import {Component, Inject, Input, OnInit} from '@angular/core';
import {Quiz} from "../../models/quiz.dto";
import {DOCUMENT} from "@angular/common";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-user-quiz-list',
  templateUrl: './user-quiz-list.component.html',
  styleUrls: ['./user-quiz-list.component.scss']
})
export class UserQuizListComponent implements OnInit {

  @Input()
  public quizzes: Quiz[] = [];

  constructor(@Inject(DOCUMENT) private document: Document, private messageService: MessageService) { }

  public ngOnInit() {

  }

  public shareUrl(quiz: Quiz): string {
    return `${this.document.URL}quiz/${quiz.id}/submit`;
  }

  public notifyClipboardCopy() {
    console.log(this.messageService)
    this.messageService.add({
      severity: 'info',
      summary: 'URL Copied !',
      detail: 'The submission URL is copied to your clipboard !'
    })
  }
}
