import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthComponent} from "../auth/auth.component";
import {DashboardComponent} from "../dashboard/dashboard.component";
import {SubmitQuizFormComponent} from "../submit-quiz-form/submit-quiz-form.component";
import {UserSubmissionDetailsComponent} from "../user-submission-details/user-submission-details.component";
import {CreateQuizFormComponent} from "../create-quiz-form/create-quiz-form.component";
import {QuizSubmissionListComponent} from "../quiz-submission-list/quiz-submission-list.component";

const routes: Routes = [
  {
    path: 'auth', component: AuthComponent,
  },
  {
    path: '', component: DashboardComponent
  },
  {
    path: 'quiz/create', component: CreateQuizFormComponent, pathMatch: 'full'
  },
  {
    path: 'quiz/:id', component: QuizSubmissionListComponent,
  },
  {
    path: 'quiz/:id/submit', component: SubmitQuizFormComponent,
  },
  {
    path: 'submissions/:id', component: UserSubmissionDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
