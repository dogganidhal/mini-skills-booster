import {Component, Input, OnInit} from '@angular/core';
import {Question} from "../../models/question.dto";
import {Answer} from "../../models/answer.dto";
import {QuestionType} from "../../models/question-type.dto";

@Component({
  selector: 'app-answer-panel',
  templateUrl: './answer-panel.component.html',
  styleUrls: ['./answer-panel.component.scss']
})
export class AnswerPanelComponent implements OnInit {

  @Input()
  public question!: Question;

  @Input()
  public answer!: Answer;

  public multipleSuggestionIds!: string[];

  public singleSuggestionId: string | undefined;

  constructor() { }

  public ngOnInit() {
    this.multipleSuggestionIds = this.question.type === QuestionType.MultipleChoice ?
      this.answer.suggestions!.map(s => s.id.toString()) :
      [];
    this.singleSuggestionId = this.question.type === QuestionType.SingleChoice ?
      this.answer.suggestions![0].id.toString() :
      undefined;
    console.log({
      questionType: this.question.type,
      multipleSuggestionIds: this.multipleSuggestionIds,
      singleSuggestionId: this.singleSuggestionId
    })
  }

}
