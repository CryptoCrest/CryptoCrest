import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/model/question.model';
import { Survey } from 'src/app/model/survey.model';
import { SurveyRepository } from 'src/app/model/survey.repository';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Completed } from 'src/app/model/completed.model';
import { AuthService } from 'src/app/model/auth.service';
import { Answer } from 'src/app/model/answer.model';
@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css']
})
export class AnswersComponent implements OnInit {
  item:Survey=new Survey();
  answers: string[];
  question:Question=new Question();
  //response: Answer=new Answer();
  responses: Answer[]=[];
  completed:Completed=new Completed();
  //questions: Question[];
  respondent: string;

  constructor(private repository: SurveyRepository,
              private router: Router,
              private activeRoute:ActivatedRoute,
              private auth: AuthService) { 
                this.item = repository.getItem(activeRoute.snapshot.params["id"]);
                //this.responses.length=this.item.surveyQuestions.length;
                
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
     // this.item.surveyQuestions.forEach(value)
    // this.completed.questions[i].ques=this.item.surveyQuestions[i].ques;
    // this.completed.questions[i].userAnswer=this.answers[i];
     // this.item.surveyQuestions[i].userAnswer=this.answers[i];
      //this.completed.questions.push(this.item.surveyQuestions[i]);
      //this.completed.questions[i].userAnswer=this.item.surveyQuestions[i].userAnswer;
      let question=this.item.surveyQuestions[i].ques;
      let answer=this.answers[i];
      let response=new Answer(question, answer)
      this.responses.push(response);
    }
    //this.responses.push(this.response);
    
    //this.respondent=this.auth.username;
    //this.questions=this.item.surveyQuestions;
   if(this.auth.username===null){
     this.completed.respondent="Anonymous";
   }else{
    this.completed.respondent=this.auth.username;
   }
   this.completed.answers=this.responses;
   //this.completed.questions=this.item.surveyQuestions;
    this.item.surveyAnswers.push(this.completed);
    this.repository.saveSurvey(this.item);
    console.log(this.item);
    this.router.navigateByUrl("survey/list");
}

}
function value(value: any) {
  throw new Error('Function not implemented.');
}

