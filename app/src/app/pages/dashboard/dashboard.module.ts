import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardComponent} from "./dashboard.component";
import {ToolbarModule} from "primeng/toolbar";
import {ButtonModule} from "primeng/button";
import {SplitButtonModule} from "primeng/splitbutton";
import {TabViewModule} from "primeng/tabview";
import {UserQuizzesComponent} from "../user-quizzes/user-quizzes.component";
import {UserSubmissionsComponent} from "../user-submissions/user-submissions.component";
import {TableModule} from "primeng/table";
import {CardModule} from "primeng/card";



@NgModule({
  declarations: [
    DashboardComponent,
    UserQuizzesComponent,
    UserSubmissionsComponent
  ],
  imports: [
    CommonModule,
    ToolbarModule,
    ButtonModule,
    SplitButtonModule,
    TabViewModule,
    TableModule,
    CardModule
  ]
})
export class DashboardModule { }
