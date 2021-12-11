import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Completed } from 'src/app/model/completed.model';
import { Question } from 'src/app/model/question.model';
import { Survey } from 'src/app/model/survey.model';
import { SurveyRepository } from 'src/app/model/survey.repository';

@Component({
  selector: 'app-view-answers',
  templateUrl: './view-answers.component.html',
  styleUrls: ['./view-answers.component.css']
})
export class ViewAnswersComponent implements OnInit {
  item:Survey=new Survey();
  completedList: Completed[];
  questions: Question[];

  constructor(private repository: SurveyRepository,
    private router: Router,
    private activeRoute: ActivatedRoute) {
      this.item = repository.getItem(activeRoute.snapshot.params["id"]);
     this.completedList=this.item.surveyAnswers;
     for(let i=0; i<this.completedList.length; i++){
     this.questions=this.item.surveyAnswers[i].questions;
     }

     }

  ngOnInit(): void {
  }
  get surveyList(): Survey[] {
    return this.repository.getSurvey();        
}

}
