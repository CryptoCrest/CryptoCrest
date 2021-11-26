let mongoose = require('mongoose');

//model class for survey
let surveyModel = mongoose.Schema(
    {
        item: String,
        qty: Number,
        status: String,
        
    },
    {
        collection: "survey"
    }
);

module.exports = mongoose.model('Survey', surveyModel);