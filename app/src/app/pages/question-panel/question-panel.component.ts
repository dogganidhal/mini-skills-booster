import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Question} from "../../models/question.dto";
import {SubmitAnswerRequest} from "../../models/submit-quiz.dto";

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

  public get multiSuggestions(): number[] {
    return this.answer.suggestionIds || [];
  }
  public set multiSuggestions(value: number[]) {
    this.answer = {
      ...this.answer,
      suggestionIds: value
    };
    this.answerChanged.emit(this.answer);
  }
  public get singleSuggestion(): string | undefined {
    return this.answer.suggestionIds && this.answer.suggestionIds[0]?.toString();
  }
  public set singleSuggestion(value: string | undefined) {
    this.answer = {
      ...this.answer,
      suggestionIds: value ? [parseInt(value)] : []
    };
    this.answerChanged.emit(this.answer);
  }
  public get freeTextAnswer(): string | undefined {
    return this.answer.content;
  }
  public set freeTextAnswer(value: string | undefined) {
    this.answer = {
      ...this.answer,
      content: value
    };
    this.answerChanged.emit(this.answer);
  }

  constructor() { }

  ngOnInit(): void {
    this.answer = {
      questionId: this.question.id
    };
  }

}
