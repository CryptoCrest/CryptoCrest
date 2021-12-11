import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Completed } from 'src/app/model/completed.model';
import { Survey } from 'src/app/model/survey.model';
import { SurveyRepository } from 'src/app/model/survey.repository';

@Component({
  selector: 'app-answer-table',
  templateUrl: './answer-table.component.html',
  styleUrls: ['./answer-table.component.css']
})
export class AnswerTableComponent implements OnInit {
  item: Survey=new Survey();
  completed: Completed=new Completed();
  completedList:Completed[];
  constructor(private repository: SurveyRepository,
    private router: Router,
    private activeRoute: ActivatedRoute) {
      this.item = repository.getItem(activeRoute.snapshot.params["id"]);
      this.completedList=this.item.surveyAnswers
     }

  ngOnInit(): void {
  }

}
