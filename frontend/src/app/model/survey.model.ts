import { Question } from "./question.model";
export class Survey {

    //constructor storing survey model
    constructor(
        public _id?: string,
        public creator?: string,
        public date?: Date,
        public item?: string,
        public qty?: number,
        public status?: string,
        public surveyQuestions?: Array<Question>  
    ){}

}
