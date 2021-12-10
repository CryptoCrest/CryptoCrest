import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/model/question.model';
import { Survey } from 'src/app/model/survey.model';
import { SurveyRepository } from 'src/app/model/survey.repository';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Completed } from 'src/app/model/completed.model';
@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css']
})
export class AnswersComponent implements OnInit {
  item:Survey=new Survey();
  answers: string[];
  question:Question=new Question();
  surveyId: string;
  surveyDescription: string;
  questions: Question[];
  completed: Completed;

  constructor(private repository: SurveyRepository,
              private router: Router,
              private activeRoute:ActivatedRoute) { 
                this.item = repository.getItem(activeRoute.snapshot.params["id"]);
                /*this.surveyId=this.item._id;
                this.surveyDescription=this.item.status;
                this.questions=this.item.surveyQuestions;
                this.completed=new Completed(this.surveyId, this.surveyDescription, this.questions);*/

                this.answers=[];
              

              }

  ngOnInit(): void {
  }


  save() {
    for (let i=0; i<this.item.surveyQuestions.length; i++){
      this.item.surveyQuestions[i].userAnswer=this.answers[i];
    }
    //this.completed.questions=this.item.surveyQuestions;

    //this.repository.saveCompletedSurvey(this.completed);
    this.repository.saveSurvey(this.item);
    console.log(this.completed);
    this.router.navigateByUrl("survey/list");
}

}
