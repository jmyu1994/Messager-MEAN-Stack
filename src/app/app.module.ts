import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import {SigninComponent} from './auth/signin.component';
import {LogoutComponent} from './auth/logout.component';
import {SignupComponent} from './auth/signup.component';
import {MessageComponent} from './messages/message.component';
import {MessageListComponent} from './messages/message-list.component';
import {MessagesComponent} from './messages/messages.component';
import {MessageInputComponent} from './messages/message-input.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {routing} from './app.routing';
import {HeaderComponent} from './shared/header.componenet';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from './services/auth.service';
import { ErrorComponent } from './error/error.component';
import {ErrorService} from './services/error.service';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    SigninComponent,
    LogoutComponent,
    AuthComponent,
    SignupComponent,
    MessageComponent,
    MessageListComponent,
    MessagesComponent,
    MessageInputComponent,
    HeaderComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule, routing, HttpClientModule
  ],
  providers: [AuthService, ErrorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
