import { Question } from "./question.model";
export class Completed {

    //constructor storing question model
    constructor(
        public surveyId: string,
        public surveyDescription: string,
        public questions: Array<Question>
       
    
    ){}

}