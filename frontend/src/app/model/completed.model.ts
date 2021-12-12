import { Answer } from "./answer.model";
export class Completed {

    //constructor storing question model
    constructor(
        public respondent?: string,
        public answers?: Array<Answer>,
      
       
    
    ){}

}