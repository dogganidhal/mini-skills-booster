import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CreateSuggestionRequest} from "../../models/create-quiz.dto";

@Component({
  selector: 'app-create-suggestion-form',
  templateUrl: './create-suggestion-form.component.html',
  styleUrls: ['./create-suggestion-form.component.scss']
})
export class CreateSuggestionFormComponent implements OnInit {

  public content: string = '';
  public isCorrect: boolean = false;

  @Output()
  public suggestionChanged = new EventEmitter<CreateSuggestionRequest>();

  constructor() { }

  public ngOnInit() {

  }

  public updateSuggestion() {
    this.suggestionChanged.emit({
      isCorrect: this.isCorrect,
      content: this.content
    });
  }

}
