let mongoose = require('mongoose');

// Create a model class
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