let mongoose = require('mongoose');

//model class for survey
let surveyModel = mongoose.Schema(
    {
        item: String,
        qty: Number,
        status: String,
        surveyQuestions:
           [ {
                _id: String,
                ques: String,
                option1: String,
                option2: String,
                userAnswer:String,

            }],
        
    },
    {
        collection: "survey"
    }
);

module.exports = mongoose.model('survey', surveyModel);