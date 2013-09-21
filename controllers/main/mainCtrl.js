exports.engine = 'jade';

exports.tester = {
    tester : function(req, res){
        req.app.get('theModels').Todo.find({}, function(error, todos){
            res.json(todos);
        });
    },
    restricted : false
};

exports.index = {
    index : function(req, res){
        //res.redirect('/todos');
        res.render('index', {
            js : req.app.get('clientjs').renderTags("loginCtrl"),
            css : req.app.get('clientcss').renderTags()
        })
    },
    restricted : false
};