import { Question } from "./question.model";
export class Survey {

    //constructor storing survey model
    constructor(
        public _id?: string,
        public item?: string,
        public qty?: number,
        public status?: string,
        public surveyQuestions?: Array<Question>  
    ){}

}
