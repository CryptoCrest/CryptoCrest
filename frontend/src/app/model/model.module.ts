import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { SurveyRepository } from "./survey.repository";
import { RestDataSource } from "./rest.datasource";
import { AuthService } from "./auth.service";
import { UserRepository } from "./user.repository";

@NgModule({
    imports: [HttpClientModule],
    providers: [
        SurveyRepository,
        UserRepository,
        RestDataSource,
        AuthService 

    ]
})

export class ModelModule { }