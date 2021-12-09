import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Survey } from "../../model/survey.model";
import { SurveyRepository } from "../../model/survey.repository";

@Component({
    selector: "add-edit",
    templateUrl: "add_edit.component.html"
})

export class AddEditComponent {

    editing: boolean = false;
    item: Survey = new Survey();

    constructor(private repository: SurveyRepository,
                private router: Router,
                activeRoute: ActivatedRoute) 
    { 
        if (activeRoute.snapshot.params["mode"] == "delete") {
            this.deleteItem(activeRoute.snapshot.params["id"]);
        }

        this.editing = activeRoute.snapshot.params["mode"] == "edit";
        
        if (this.editing) {
            this.item = repository.getItem(activeRoute.snapshot.params["id"]);
        } 
          
    }

    save(form: NgForm) {
        this.repository.saveSurvey(this.item);
        this.router.navigateByUrl("survey/list");
    }

    private deleteItem(id: string){
        this.repository.deleteSurvey(id);
        this.router.navigateByUrl("survey/list");
    }
    
}