exports.engine = 'jade';

/**
Path - /register/
Function : render register page
*/
exports.route_index = {
    route_index : function(req, res){
        res.render('register', {
            title: 'Express',
            js : req.app.get('clientjs').renderTags("registerCtrl"),
            css : req.app.get('clientcss').renderTags()
        });
    },
    restricted : false

};

/**
Path - /register.json
Function : register user
*/
exports.create = {};
exports.create.create = function(req, res) {
    var userModel = req.app.get('theModels').User;
    var user = new userModel(req.body);
    //res.json({"hello" : "world"});
    user.validate(function(error){
        if(error){
            console.log('failed validation: ' + JSON.stringify(error));
            res.json({ error : error});
        }
        else {
            user.save(function (error, user) {
                if (error || !user) {
                    res.json({ error: error });
                } else {
                    req.session.loggedIn = true;
                    req.session.user = user;
                    res.json({ redirect: '/todos' });
                }
            });
            /*user.save(function(err){
             if (err){
             console.log('Error: ' + err);
             throw err;
             }
             })*/
        }
    })

};
exports.create.restricted = false;