/**
 * MODULE DEPENDENCIES
 */
var _ = require('underscore');


exports.engine = 'jade';
//var models = require('../../models/models.js');


// route - /todos
exports.list_route = {
    list_route : function (req, res) {
        console.log('hello world');
        //app.Todo.find({}, function(error, todos) {
        console.log('session user: ' + JSON.stringify(req.session.user));
        req.app.get('theModels').User.findOne({"email" : req.session.user.email}, function (error, user) {
            res.render('list', {
                title: 'Express',
                todos: user.todos,
                js: req.app.get('clientjs').renderTags("todoListCtrl"),
                css: req.app.get('clientcss').renderTags()
            });
        });
    },
    restricted: true
};

// route - /todos.json - allow XHR without reloading page
exports.list_json = {
    list_json : function(req, res) {
        console.log('hello world2');
        req.app.get('theModels').User.findOne({"email" : req.session.user.email}, function(error, user) {
            res.json({ todos : user.todos });
        })
    },
    restricted : true
};

exports.create = {};
exports.create.create = function(req, res) {
    var todoModel = req.app.get('theModels').Todo;
    var todo = new todoModel(req.body);

    req.app.get('theModels').User.findOne({"email" : req.session.user.email}, function(error, user){
        user.todos.push(todo);
        user.save(function(error, user) {
            if (error || !todo) {
                res.json({ error : error });
            } else {
                res.json({ todo : todo });
            }
        });
    });
};
exports.create.restricted = true;

exports.update = {
    update: function (req, res) {
        /*req.app.get('theModels').User.findOne({"email" : req.session.user.email }, function (error, user) {
            if (error || !user) {
                res.json({ error: error });
            } else {
                // find todo with _id: req.params.id
                console.log('req.params.id: ' + req.params.todo_id);
                console.log('todos: ' + JSON.stringify(user.todos));
                var todo = _.find(user.todos, function(todo){
                    return todo._id = req.params.todo_id;
                });
                todo.done = req.body.done;
                user.save(function (error, user) {
                    if (error || !todo) {
                        res.json({ error: error });
                    } else {
                        res.json({ todo: todo });
                    }
                });
            }
        });  */

        req.app.get('theModels').User.update(
            {"email" : req.session.user.email, "todos._id" : req.params.todo_id}
            ,{$set : {"todos.$.done" : req.body.done}}
            , function(err, results){
                if (err) console.log('err: ' + JSON.stringify(err));
                console.log('results: ' + JSON.stringify(results));
            });

    },
    restricted : true
};
