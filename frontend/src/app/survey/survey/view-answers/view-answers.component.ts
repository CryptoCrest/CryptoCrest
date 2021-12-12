import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Completed } from 'src/app/model/completed.model';
import { Question } from 'src/app/model/question.model';
import { Survey } from 'src/app/model/survey.model';
import { SurveyRepository } from 'src/app/model/survey.repository';
import * as XLSX from "xlsx";
@Component({
  selector: 'app-view-answers',
  templateUrl: './view-answers.component.html',
  styleUrls: ['./view-answers.component.css']
})
export class ViewAnswersComponent implements OnInit {
  item:Survey=new Survey();
  completedList: Completed[];
  questions: Question[];
  title ="export_to_excel";
  filename="excelsheet.xlsx";

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

  exportexcel() :void{
    let table=document.getElementById("exceltable");
    const ws:XLSX.WorkSheet=XLSX.utils.table_to_sheet(table);
    const wb:XLSX.WorkBook=XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, this.filename);
  }

}
