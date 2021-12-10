import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Survey } from 'src/app/model/survey.model';
import { SurveyRepository } from 'src/app/model/survey.repository';

@Component({
  selector: 'app-view-answers',
  templateUrl: './view-answers.component.html',
  styleUrls: ['./view-answers.component.css']
})
export class ViewAnswersComponent implements OnInit {
  item:Survey=new Survey();

  constructor(private repository: SurveyRepository,
    private router: Router,
    private activeRoute: ActivatedRoute) {
      this.item = repository.getItem(activeRoute.snapshot.params["id"]);

     }

  ngOnInit(): void {
  }
  get surveyList(): Survey[] {
    return this.repository.getSurvey();        
}

}
