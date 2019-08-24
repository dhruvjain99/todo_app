const Task = require('../models/task');


module.exports.home = function(req, res){
    return res.render('home',{
        title: "Todo App"
    });
}


module.exports.create = function(req, res){
    Task.create({
        description: req.body.description,
        category: req.body.category,
        dueDate: req.body.dueDate
    }, function(err, newTask){
        if(err){
            console.log("Error in creating a new task in mongoDb :: Error");
            return;
        }
        console.log("New Task Created :: ", newTask);
        return res.redirect('back');
    });
}