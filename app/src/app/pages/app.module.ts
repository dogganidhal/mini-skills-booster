import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthComponent } from './auth/auth.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "../interceptors/auth/auth.interceptor";
import {MainComponent} from "./main/main.component";
import {TabViewModule} from "primeng/tabview";
import {CardModule} from "primeng/card";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {MessageModule} from "primeng/message";
import {MessagesModule} from "primeng/messages";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ProgressBarModule} from "primeng/progressbar";
import {ToastModule} from "primeng/toast";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    AuthComponent,
    AuthComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
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
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
