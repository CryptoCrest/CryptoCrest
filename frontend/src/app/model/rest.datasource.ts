import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Survey } from "./survey.model";
import { User } from "./user.model";
import { map } from "rxjs/operators";
import { HttpHeaders } from '@angular/common/http';

import { ResponseModel } from "./response.model";

const PROTOCOL = "http";
const PORT = 3000;

@Injectable()
export class RestDataSource {

    baseUrl: string;
    auth_token: string;

    constructor(private http: HttpClient) {
        this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
    }

    //gets survey list
    getSurveyList(): Observable<Survey[]> {
        return this.http.get<Survey[]>(this.baseUrl + "survey/list");
    }

    //insert survey items
    insertSurvey(item: Survey): Observable<Survey> {
        return this.http.post<Survey>(this.baseUrl + "survey/add",
            item, this.getOptions());
    }

    //update survey item
    updateSurvey(item: Survey): Observable<Survey> {
        return this.http.put<Survey>(`${this.baseUrl}survey/edit/${item._id}`,
            item, this.getOptions());
    }

    //delete survey 
    deleteSurvey(id: string): Observable<ResponseModel> {
        return this.http.delete<any>(`${this.baseUrl}survey/delete/${id}`,
            this.getOptions()).pipe(map(response => {
                return response;
            }));
    }

    //authenticate user
    authenticate(username: string, pass: string): Observable<boolean> {
        return this.http.post<any>(this.baseUrl + "users/signin", {
            username: username, password: pass
        }).pipe(map(response => {
            this.auth_token = response.success ? response.token : null;
            return response.success;
        }));
    }

    //sign up for user
    signupUser(user: User): Observable<ResponseModel> {
        return this.http.post<ResponseModel>(this.baseUrl + "users/signup", user)
            .pipe(map(response => {
                return response;
            }));
    }

    private getOptions() {
        return {
            headers: new HttpHeaders({
                "Authorization": `Bearer ${this.auth_token}`
            })
        }
    }
}
