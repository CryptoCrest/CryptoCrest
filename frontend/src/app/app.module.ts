import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from "@angular/router";
import { AppComponent } from './app.component';
import { AuthGuard } from './survey/auth/auth.guard';
import { ReactiveFormsModule } from '@angular/forms';

import {IndexModule} from './survey/index.module';
import {IndexComponent} from './survey/index.component';
import { PartialsModule } from './survey/partials/partials.module';
import { SurveyModule } from "./survey/survey/survey.module";
import { ListComponent } from './survey/survey/list.component';
import { AuthModule } from './survey/auth/auth.module';
import { SignInComponent } from './survey/auth/signin.component';
import { SignUpComponent } from './survey/auth/signup.component';
import { AddEditComponent } from './survey/survey/add_edit.component';
import { QuestionsComponent } from './survey/survey/questions/questions.component';

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
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: "", component: IndexComponent },
      { path: "survey/list", component: ListComponent },
     { path: "survey/:mode", component: AddEditComponent, 
      canActivate: [AuthGuard]
    },
      { path: "survey/:mode/:id", component: AddEditComponent, 
     canActivate: [AuthGuard] 
    },
      { path: "users/signin", component: SignInComponent },
      { path: "users/signup", component: SignUpComponent },
      { path: "addQues/:id", component: QuestionsComponent,
       canActivate:[AuthGuard]
      },
     { path: "**", redirectTo: "" }
    ])
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
