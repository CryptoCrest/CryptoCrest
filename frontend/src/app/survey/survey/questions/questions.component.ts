import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Survey } from 'src/app/model/survey.model';
import { SurveyRepository } from 'src/app/model/survey.repository';
import { NgForm} from '@angular/forms';
import { Question } from 'src/app/model/question.model';
import { AuthService } from 'src/app/model/auth.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  count: number=0;
  item: Survey=new Survey();
  questions: Question[]=[];
  question: Question=new Question();
 
  constructor(private repository: SurveyRepository,
    private router: Router,
    activeRoute: ActivatedRoute,
    private auth:AuthService) { 
      this.item = repository.getItem(activeRoute.snapshot.params["id"]);
  
    }

  ngOnInit(): void {
  }
  
  addQuestions(ques: string, option1:string, option2:string){
    this.count++;
   /*this.question.ques=ques;
    this.question.option1=option1;
    this.question.option2=option2;*/
    let question=new Question(ques, option1, option2);
    let totalcount=this.item.surveyQuestions.length+this.count
    this.item.surveyQuestions.push(question);
    window.alert("item added:"+totalcount)
    this.item.creator=this.auth.username;
    this.repository.saveSurvey(this.item);
    //this.router.navigateByUrl('/survey/list');
    console.log(this.item);

  }


}
