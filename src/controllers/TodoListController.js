const TodoListModel = require('../models/TodoListModel');

exports.CreateTodo = (req, res)=>{
    let reqBody = req.body;
    
    let Username = req.headers['Username'];
    let TodoSubject = req.body['TodoSubject'];
    let TodoDescription = req.body['TodoDescription'];
    let TodoStatus = "New";
    let TodoCreateDate = Date.now();
    let TodoUpdateDate = Date.now();

    let PostBody = {
        Username: Username,
        TodoSubject: TodoSubject,
        TodoDescription: TodoDescription,
        TodoStatus: TodoStatus,
        TodoCreateDate: TodoCreateDate,
        TodoUpdateDate: TodoUpdateDate
    }
    TodoListModel.create(PostBody).then((data)=>{
            res.status(201).json({status: "Success", data: data})
        }).catch((error)=>{res.status(401).json({status: "Fail", data: error})})
}