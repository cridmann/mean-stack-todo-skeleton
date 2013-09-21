exports.engine = 'jade';

// create session/login
var create = {
    create: function (req, res) {
        var userModel = req.app.get('theModels').User;
        userModel.getAuthenticated(req.body.email, req.body.password,
            function (err, user, reason) {
                if (err) throw err;

                if (user) {
                    console.log('login success');
                    req.session.loggedIn = true;
                    req.session.user = user;
                    res.json({"redirect": "/todos"});
                }
                else {
                    console.log('login failed');
                    res.json({ error: reason == 2 ? 'Max attempts reached.  Please try later' :
                        'Invalid user/pass.'});
                }
            })
    },
    restricted: false
};

exports.create = create;




