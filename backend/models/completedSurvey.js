let mongoose = require('mongoose');

//model class for survey
let completed = mongoose.Schema(
    {
        surveyId: mongoose.Schema.Types.ObjectId,
        surveyDescription: String,
        questions:
                [{
                    _id: String,
                    ques: String,
                    option1: String,
                    option2: String,
                    userAnswer:String,
                }]
        
    },
    {
        collection: "completed"
    }
);

module.exports = mongoose.model(completed, completedModel);