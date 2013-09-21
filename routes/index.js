
/*
 * GET home page.
 */

exports.index = function(Todo, cssIn, jsIn) {
  return function(req, res) {
    Todo.find({}, function(error, todos) {
      res.render('index', {
        title: 'Express',
        todos : todos,
        js : jsIn,
        css : cssIn
      });
    });
  };
};

exports.test = function(app){
  return function(req, res){
    app.get('theModels').Todo.find({}, function(error, todos){
      res.json(todos);
    });  
  };
};

exports.addTodo = function(Todo) {
  return function(req, res) {
    var todo = new Todo(req.body);
    todo.save(function(error, todo) {
      if (error || !todo) {
        res.json({ error : error });
      } else {
        res.json({ todo : todo });
      }
    });
  };
};

exports.get = function(Todo) {
  return function(req, res) {
    Todo.find({}, function(error, todos) {
      res.json({ todos : todos });
    });
  }
};

exports.update = function(Todo) {
  return function(req, res) {
    Todo.findOne({ _id : req.params.id }, function(error, todo) {
      if (error || !todo) {
        res.json({ error : error });
      } else {
        todo.done = req.body.done;
        todo.save(function(error, todo) {
          if (error || !todo) {
            res.json({ error : error });
          } else {
            res.json({ todo : todo });
          }
        });
      }
    });
  }
};