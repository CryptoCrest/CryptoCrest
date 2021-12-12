import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from "@angular/router";
import { AppComponent } from './app.component';
import { AuthGuard } from './survey/auth/auth.guard';
import { FormsModule } from '@angular/forms';
      imports: [
         FormsModule
      ]

import {IndexModule} from './survey/index.module';
import {IndexComponent} from './survey/index.component';
import { PartialsModule } from './survey/partials/partials.module';
import { SurveyModule } from "./survey/survey/survey.module";
import { ListComponent } from './survey/survey/list.component';
import { AuthModule } from './survey/auth/auth.module';
import { SignInComponent } from './survey/auth/signin.component';
import { SignUpComponent } from './survey/auth/signup.component';
import { UserprofileComponent } from './survey/auth/userprofile.component';
import { EditprofileComponent } from './survey/auth/editprofile.component';

import { AddEditComponent } from './survey/survey/add_edit.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    IndexModule,
    PartialsModule,
    SurveyModule,
    AuthModule,
    RouterModule.forRoot([
      { path: "", component: IndexComponent },
      { path: "survey/list", component: ListComponent },
      { path: "survey/:mode", component: AddEditComponent, canActivate: [AuthGuard]},
      { path: "survey/:mode/:id", component: AddEditComponent, canActivate: [AuthGuard] },
      { path: "users/signin", component: SignInComponent },
      { path: "users/signup", component: SignUpComponent },
      { path: "users/userprofile", component: UserprofileComponent },
      { path: "users/editprofile", component: EditprofileComponent },
      { path: "**", redirectTo: "" }
    ])
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
