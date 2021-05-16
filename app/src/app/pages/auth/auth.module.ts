import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from "../login/login.component";
import {SignUpComponent} from "../sign-up/sign-up.component";
import {AuthComponent} from "./auth.component";
import {TabViewModule} from "primeng/tabview";
import {CardModule} from "primeng/card";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {MessagesModule} from "primeng/messages";
import {MessageModule} from "primeng/message";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ProgressBarModule} from "primeng/progressbar";
import {ToastModule} from "primeng/toast";


@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent,
    AuthComponent,
  ],
  imports: [
    CommonModule,
    TabViewModule,
    CardModule,
    InputTextModule,
    FormsModule,
    ButtonModule,
    MessagesModule,
    MessageModule,
    BrowserAnimationsModule,
    ProgressBarModule,
    ToastModule
  ]
})
export class AuthModule { }
