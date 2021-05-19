import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardComponent} from "./dashboard.component";
import {ToolbarModule} from "primeng/toolbar";
import {ButtonModule} from "primeng/button";
import {SplitButtonModule} from "primeng/splitbutton";
import {TabViewModule} from "primeng/tabview";
import {TableModule} from "primeng/table";
import {CardModule} from "primeng/card";
import {RouterModule} from "@angular/router";
import {UserSubmissionListComponent} from "../user-submission-list/user-submission-list.component";
import {UserSubmissionDetailsComponent} from "../user-submission-details/user-submission-details.component";
import {UserQuizListComponent} from "../user-quizz-list/user-quiz-list.component";
import {SubmitQuizFormComponent} from "../submit-quiz-form/submit-quiz-form.component";
import {CreateQuizFormComponent} from "../create-quiz-form/create-quiz-form.component";
import {ProgressBarModule} from "primeng/progressbar";
import {DividerModule} from "primeng/divider";
import {CheckboxModule} from "primeng/checkbox";
import {QuestionPanelComponent} from "../question-panel/question-panel.component";
import {FormsModule} from "@angular/forms";
import {RadioButtonModule} from "primeng/radiobutton";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ToastModule} from "primeng/toast";
import {AnswerPanelComponent} from "../answer-panel/answer-panel.component";
import {InputTextModule} from "primeng/inputtext";
import {CreateQuestionFormComponent} from "../create-question-form/create-question-form.component";
import {CreateSuggestionFormComponent} from "../create-suggestion-form/create-suggestion-form.component";



@NgModule({
  declarations: [
    DashboardComponent,
    UserQuizListComponent,
    UserSubmissionListComponent,
    UserSubmissionDetailsComponent,
    SubmitQuizFormComponent,
    CreateQuizFormComponent,
    QuestionPanelComponent,
    AnswerPanelComponent,
    CreateQuestionFormComponent,
    CreateSuggestionFormComponent
  ],
  imports: [
    CommonModule,
    ToolbarModule,
    ButtonModule,
    SplitButtonModule,
    TabViewModule,
    TableModule,
    CardModule,
    RouterModule,
    ProgressBarModule,
    DividerModule,
    CheckboxModule,
    FormsModule,
    RadioButtonModule,
    InputTextareaModule,
    ToastModule,
    InputTextModule
  ]
})
export class DashboardModule { }
