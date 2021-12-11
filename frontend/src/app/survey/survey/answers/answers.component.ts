import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/model/question.model';
import { Survey } from 'src/app/model/survey.model';
import { SurveyRepository } from 'src/app/model/survey.repository';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Completed } from 'src/app/model/completed.model';
import { AuthService } from 'src/app/model/auth.service';
@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css']
})
export class AnswersComponent implements OnInit {
  item:Survey=new Survey();
  answers: string[];
  question:Question=new Question();

  completed:Completed=new Completed();
  questions: Question[];
  respondent: string;

  constructor(private repository: SurveyRepository,
              private router: Router,
              private activeRoute:ActivatedRoute,
              private auth: AuthService) { 
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
    this.respondent=this.auth.username;
    this.questions=this.item.surveyQuestions;
   this.completed.respondent=this.respondent;
   this.completed.questions=this.item.surveyQuestions;
    this.item.surveyAnswers.push(this.completed);
    this.repository.saveSurvey(this.item);
    console.log(this.item);
    this.router.navigateByUrl("survey/list");
}

}
