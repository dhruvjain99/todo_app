const Task = require('../models/task');

//Controller to render the home page
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

//Controller to create a new task
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


//Controller to delete multiple tasks
module.exports.delete = function(req,res){
    console.log(req.body);
    let id_list = new Array(0);
    for(let prop in req.body){
        id_list.push(req.body[prop]);
    }
    //console.log("**********" + id_list);
    Task.deleteMany({_id: {$in: id_list}}, function(err){
        if(err){
            console.log("Error in deleting tasks from the database.");
            return;
        }
        return res.redirect('back');
    });
}