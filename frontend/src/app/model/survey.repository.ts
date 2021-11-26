import { Injectable } from "@angular/core";
import { Survey} from "./survey.model";
import { ResponseModel } from "./response.model";
import { RestDataSource } from "./rest.datasource";

@Injectable()
export class SurveyRepository {
    private survey: Survey[] = [];

    constructor(private dataSource: RestDataSource) {
        dataSource.getSurveyList().subscribe(data => {
            this.survey = data;
        });
    }

    //gets survey
    getSurvey(): Survey[] {
        return this.survey;
    }

    //gets item by id
    getItem(id: string): Survey {
        return (this.survey.find(item => item._id === id)!);
    }

    //saves survey from user
    saveSurvey(item: Survey) {
        if (item._id == null || item._id == "") {
            this.dataSource.insertSurvey(item)
                .subscribe(p => this.survey.push(p));
        } else {
            this.dataSource.updateSurvey(item)
                .subscribe(p => {
                    this.survey.splice(this.survey.
                        findIndex(i => i._id == item._id), 1, item);
                });
        }
    }

    //deletes survey
    deleteSurvey(id: string) {
        this.dataSource.deleteSurvey(id).subscribe(response => {
            if (response.success) {
                this.survey.splice(this.survey.
                    findIndex(item => item._id == id), 1);                                
            }
            else{
                alert(response.message);
            }
        })
    }
}