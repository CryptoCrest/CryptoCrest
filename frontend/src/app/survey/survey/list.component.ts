import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/model/auth.service";
import { Survey } from "../../model/survey.model";
import { SurveyRepository } from "../../model/survey.repository";

@Component({
    selector: "list-survey",
    templateUrl: "list.component.html"
})

export class ListComponent {
    username:string;

    constructor(private repository: SurveyRepository,
        private router: Router,
        public auth:AuthService) 
    { 
        this.username=auth.username;
    }

    get surveyList(): Survey[] {
        return this.repository.getSurvey();        
    }

    deleteMethod(id: string) {
        if(confirm("Are you sure do you want to delete?")) {
            this.router.navigateByUrl("survey/delete/"+id);
        }
    }
    
}