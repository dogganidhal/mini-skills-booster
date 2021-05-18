import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Question} from "../../models/question.dto";
import {SubmitAnswerRequest} from "../../models/submit-quiz.dto";
import {QuestionType} from "../../models/question-type.dto";

@Component({
  selector: 'app-question-panel',
  templateUrl: './question-panel.component.html',
  styleUrls: ['./question-panel.component.scss']
})
export class QuestionPanelComponent implements OnInit {

  @Input()
  public question!: Question;

  @Input()
  public editable = true;

  @Output()
  public answerChanged = new EventEmitter<SubmitAnswerRequest>();

  private answer!: SubmitAnswerRequest;

  public multiSuggestions: number[] = [];
  public singleSuggestion: number | undefined;
  public freeTextAnswer: string | undefined;

  constructor() { }

  public ngOnInit(): void {
    this.answer = {
      questionId: this.question.id
    };
  }

  public updateAnswer() {
    const suggestionIds = this.question.type === QuestionType.MultipleChoice ?
      this.multiSuggestions :
      this.singleSuggestion ?
        [this.singleSuggestion] :
        [];
    this.answer = {
      ...this.answer,
      suggestionIds,
      content: this.question.type === QuestionType.FreeText ? this.freeTextAnswer : undefined
    };
    this.answerChanged.emit(this.answer);
  }

}
