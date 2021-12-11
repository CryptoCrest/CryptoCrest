import { Question } from "./question.model";
export class Completed {

    //constructor storing question model
    constructor(
        public respondent?: string,
        public questions?: Array<Question>
       
    
    ){}

}