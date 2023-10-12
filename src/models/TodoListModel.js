const mongoose  = require('mongoose');

const TodoSchema = mongoose.Schema({
    Username: {type:String},
    TodoSubject: {type:String},
    TodoDescription: {type:String},
    TodoStatus: {type:String},
    TodoCreateDate: {type:Date},
    TodoUpdateDate: {type:Date}
},
{versionKey: false});

const TodoListModel = mongoose.model('todolists', TodoSchema);

module.exports = TodoListModel;