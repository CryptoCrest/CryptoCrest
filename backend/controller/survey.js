// create a reference to the model
let Survey = require('../models/survey');

function getErrorMessage(err) {
    if (err.errors) {
        for (let errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].message;
        }
    } else {
        return 'Unknown server error';
    }
};


module.exports.surveyList = function(req, res, next) {  

    Survey.find((err, surveyList) => {
        //console.log(inventoryList);
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
            // res.render('survey/list', {
            //     title: 'Survey List', 
            //     SurveyList: surveyList,
            //     userName: req.user ? req.user.username : ''
            // })
            res.status(200).json(surveyList);            
        }
    });
}

exports.surveyByID = function (req, res, next) {

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





// module.exports.displayEditPage = (req, res, next) => {
    
//     let id = req.params.id;

//     Survey.findById(id, (err, itemToEdit) => {
//         if(err)
//         {
//             console.log(err);
//             res.end(err);
//         }
//         else
//         {
//             //show the edit view
//             res.render('survey/add_edit', {
//                 title: 'Edit Item', 
//                 item: itemToEdit,
//                 userName: req.user ? req.user.username : ''
//             })
//         }
//     });
// }


module.exports.processEdit = (req, res, next) => {

    let id = req.params.id

    // let updatedItem = Survey({
    //     _id: req.body.id,
    //     item: req.body.item,
    //     qty: req.body.qty,
    //     status: req.body.status,
        
    // });

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
            // console.log(req.body);
            // refresh the book list
            // res.redirect('/survey/list');
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
            // refresh the book list
            // res.redirect('/survey/list');
            res.status(200).json(
                {
                    success: true,
                    message:"Item "+id+ " deleted successfully"
                }
            ); 
        }
    });

}


// module.exports.displayAddPage = (req, res, next) => {

//     let newItem = Survey();

//     res.render('survey/add_edit', {
//         title: 'Add a new Survey',
//         item: newItem,
//         userName: req.user ? req.user.username : ''
//     })          

// }

module.exports.processAdd = (req, res, next) => {

    // let newItem = Survey({
    //     _id: req.body.id,
    //     item: req.body.item,
    //     qty: req.body.qty,
    //     status: req.body.status,
        
    // });

    console.log(req.body);

    let newItem = new Survey(req.body)

    console.log(newItem);

    Survey.create(newItem, (err, item) =>{
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
            // res.redirect('/survey/list');
            res.status(200).json(item); 
        }
    });
    
}