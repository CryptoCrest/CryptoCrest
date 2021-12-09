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
    this.question.ques=ques;
    this.question.option1=option1;
    this.question.option2=option2;
    this.item.surveyQuestions.push(this.question);
    this.count++;
    window.alert("questions added: " +this.count);

  }
  
  save(form: NgForm) {
    this.repository.saveSurvey(this.item);
    console.log(this.item);
}

}
