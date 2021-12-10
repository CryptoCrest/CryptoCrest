import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Survey } from 'src/app/model/survey.model';
import { SurveyRepository } from 'src/app/model/survey.repository';
import { NgForm} from '@angular/forms';
import { Question } from 'src/app/model/question.model';

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
    activeRoute: ActivatedRoute) { 
      this.item = repository.getItem(activeRoute.snapshot.params["id"]);
      this.questions.length=this.item.qty;
    }

  ngOnInit(): void {
  }
  
  addQuestions(ques: string, option1:string, option2:string){
    this.count++;
    this.question.ques=ques;
    this.question.option1=option1;
    this.question.option2=option2;
    let totalcount=this.item.surveyQuestions.length+this.count
    window.alert("item added:"+totalcount)

  }
  
  save(form: NgForm) {
    this.item.surveyQuestions.push(this.question);
    this.repository.saveSurvey(this.item);
    this.router.navigateByUrl('/survey/list');
    console.log(this.item);
}

}
