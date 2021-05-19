import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {QuestionType} from "../../models/question-type.dto";
import {CreateQuestionRequest, CreateSuggestionRequest} from "../../models/create-quiz.dto";

@Component({
  selector: 'app-create-question-form',
  templateUrl: './create-question-form.component.html',
  styleUrls: ['./create-question-form.component.scss']
})
export class CreateQuestionFormComponent implements OnInit {

  public content: string = '';
  public questionType: string = QuestionType.FreeText;

  public questionTypeValues: QuestionType[] = [
    QuestionType.FreeText,
    QuestionType.SingleChoice,
    QuestionType.MultipleChoice
  ];

  public suggestionIndices: number[] = [];

  @Output()
  public questionChanged = new EventEmitter<CreateQuestionRequest>();

  private suggestions: CreateSuggestionRequest[] = [];

  private question!: CreateQuestionRequest;

  constructor() { }

  public ngOnInit() {

  }

  public updateQuestion() {
    this.question = {
      content: this.content,
      type: QuestionType.fromString(this.questionType),
      suggestions: this.questionType !== QuestionType.FreeText ? this.suggestions : undefined
    };
    this.questionChanged.emit(this.question);
  }

  public updateSuggestion(index: number, suggestion: CreateSuggestionRequest) {
    this.suggestions = [...this.suggestions.slice(0, index), suggestion, ...this.suggestions.slice(index + 1)];
    this.updateQuestion();
  }

  public questionTypeName(type: QuestionType): string {
    return QuestionType.questionTypeName(type);
  }

  public addSuggestion() {
    this.suggestionIndices.push(this.suggestionIndices.length);
  }
}
