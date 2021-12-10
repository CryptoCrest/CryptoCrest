// create a reference to the model
let Completed = require('../models/completed');
let Survey=require("../models/survey")

//function to show error messages
function getErrorMessage(err) {
    if (err.errors) {
        for (let errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].message;
        }
    } else {
        return 'Unknown server error';
    }
};

//logic for getting survey list
/*module.exports.completedList = function(req, res, next) {  

    Survey.find((err, completedList) => {
        if(err)
        {
            console.error(err);
            return res.status(400).send({   
                success: false, 
                message: getErrorMessage(err)
            });
        }
        else
        {
            res.status(200).json(completedList);            
        }
    });
}

//gets survey by ID
exports.completedByID = function (req, res, next) {

    let id = req.params.id;
    
    Survey.findById(id, (err, item) => {
        if (err) return next(err);
        if (!item) return next(new Error('Failed to load a item '+ id +' from the survey '));

        req.item = item;
        console.log(item);
        next();
    });
};

exports.getItem = function (req, res) {
    res.status(200).json(req.item);
};



//logic to process edit survey items
/*module.exports.processEdit = (req, res, next) => {

    let id = req.params.id


    let updatedItem = new Survey(req.body)

    Survey.updateOne({_id: id}, updatedItem, (err) => {
        if(err)
        {
            console.log(err);
            //res.end(err);
            return res.status(400).json({
                success: false,
                message: getErrorMessage(err)
            });
        }
        else
        {
            
            res.status(200).json(updatedItem); 
        }
    });

}


module.exports.performDelete = (req, res, next) => {

    let id = req.params.id;


    Survey.deleteOne({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            // res.end(err);
            return res.status(400).send({
                success: false,
                message: getErrorMessage(err)
            });
        }
        else
        {
            
            res.status(200).json(
                {
                    success: true,
                    message:"Item "+id+ " deleted successfully"
                }
            ); 
        }
    });

}*/



//logic to process add survey items
module.exports.processAdd = (req, res, next) => {
    let surveyId=req.params.id;

    Completed.findById(surveyId, (error, completed)=>
    {if(error){
        return console.log(error);
    }else{
        let description= completed.surveyDescription;
        let questions=completed.questions;

        let completedSurvey=Completed({
            "surveyId": surveyId,
            "surveyDescription": description,
            "questions": questions

        })
        Completed.create(completedSurvey, (err, item) =>{
            if(err)
            {
                console.log(err);
                // res.end(err);
                return res.status(400).send({
                    success: false,
                    message: getErrorMessage(err)
                });
            }
            else
            {
                // refresh the book list
                console.log(item);
                res.status(200).json(item); 
            }
        });
    }
    })


 

   
    
}