const Task = require('../models/task');


module.exports.home = function(req, res){
    Task.find({}, function(err, tasks){
        if(err){
            console.log("Error in fetching data from the database :: MongoDb");
            return;
        }
        console.log("All the tasks are fetched from the database :: MongoDb");
        return res.render('home',{
            title: "Todo App",
            tasks_list: tasks
        });
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