let mongoose = require('mongoose');

//model class for survey
let surveyModel = mongoose.Schema(
    {
        creator: String,
        startDate: Date,
        endDate: Date,
        item: String,
        qty: Number,
        status: String,
        surveyQuestions:
           [ {
                _id: String,
                ques: String,
                option1: String,
                option2: String,
             

            }],
        surveyAnswers:
        [{
                respondent:String,
                answers:
                 [{
                ques: String,
                answer:String
                }],
            
            }
        ]
        
    },
    {
        collection: "survey"
    }
);

module.exports = mongoose.model('survey', surveyModel);