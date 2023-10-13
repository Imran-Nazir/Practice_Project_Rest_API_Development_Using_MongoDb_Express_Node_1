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

exports.SelectTodo = (req, res)=>{
    let Username = req.headers['Username'];
    let Query = {Username: Username};

    TodoListModel.find(Query).then((data)=>{res.status(200).json({status: 'OK', data: data})})
    .catch((err)=>{res.status(400).json({status: 'Error', data: err})});
}

exports.UpdateTodo = (req, res)=>{
    let Username = req.headers['Username'];
    let Query = {Username: Username};
    let reqBody = req.body;

    TodoListModel.updateOne(Query, reqBody, {upsert: true}).then((data)=>{res.status(200).json({status: 'OK', data: data})})
    .catch((err)=>{res.status(400).json({status: 'Error', data: err.toString()})});
}