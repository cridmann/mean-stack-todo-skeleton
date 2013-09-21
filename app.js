
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , models = require('./models/models.js')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  /*, assetManager = require('connect-assetmanager')
  , assetHandler = require('connect-assetmanager-handlers')*/
  //, piler = require("piler")
  , assetMgr = require('./lib/assetManager')
    , config = require('./lib/config.js').config;

var app = express();

/*var Mongoose = require('mongoose');
var db = Mongoose.createConnection('localhost', 'mytestapp');

var TodoSchema = require('./models/Todo.js').TodoSchema;
var Todo = db.model('todos', TodoSchema);*/

/*var assetManagerGroups = {
    'js': {
        'route': /\/static\/javascripts\/scripts\.js/
        , 'path': './public/javascripts/'
        , 'dataType': 'javascript'
        , 'files': [
            'vendor/angular/angular.js',
            'vendor/angular-bootstrap/ui-bootstrap-tpls.js',
            'TodoModule.js',
            'controllers/TodoListController.js'
        ]
    }, 'css': {
        'route': /\/static\/stylesheets\/style\.css/
        , 'path': './public/stylesheets/'
        , 'dataType': 'css'
        , 'files': [
         'style.css',
         '../javascripts/vendor/bootstrap-css/css/bootstrap.css'
        ]
        , 'preManipulate': {
            // Regexp to match user-agents including MSIE.
            'MSIE': [
                assetHandler.yuiCssOptimize
                , assetHandler.fixVendorPrefixes
                , assetHandler.fixGradients
                , assetHandler.stripDataUrlsPrefix
            ],
            // Matches all (regex start line)
            '^': [
                assetHandler.yuiCssOptimize
                , assetHandler.fixVendorPrefixes
                , assetHandler.fixGradients
                , assetHandler.replaceImageRefToBase64(root)
            ]
        }
    }
};

var assetsManagerMiddleware = assetManager(assetManagerGroups);*/

//var clientjs = piler.createJSManager();
//var clientcss = piler.createCSSManager();


// all environments
app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    // set the models
    app.set('theModels', models);
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.cookieParser('shhhh, very secret'));

    app.use(express.session({
        secret: 'a4f8071f-c873-4447-8ee2',
        cookie: { maxAge: 2628000000 },
        store: new (require('express-sessions'))({
            storage: 'mongodb',
            instance: models.Mongoose, // optional
            dbinstance: models.db,
            host: config.mongodb.host, // optional
            port: config.mongodb.port, // optional
            db: config.mongodb.dbname, // optional
            collection: 'sessions', // optional
            expire: 86400 // optional
        })
    }));

    //app.use(express.cookieSession());
    // app.enable('trust proxy') // might be able to use this for other server serving files
    //app.use(assetsManagerMiddleware);
    /*clientjs.bind(app);
     clientcss.bind(app);
     clientcss.addFile("./public/stylesheets/style.css");
     clientcss.addFile("./public/javascripts/vendor/bootstrap-css/css/bootstrap.css");

     clientjs.addFile("./public/javascripts/vendor/angular/angular.js");
     clientjs.addFile("./public/javascripts/vendor/angular-bootstrap/ui-bootstrap-tpls.js");
     clientjs.addFile("./public/javascripts/TodoModule.js");
     clientjs.addFile("todoListCtrl","./public/javascripts/controllers/TodoListController.js");*/

    assetMgr.clientjs.bind(app);
    assetMgr.clientcss.bind(app);

    app.set('clientjs', assetMgr.clientjs);
    app.set('clientcss', assetMgr.clientcss);

});

app.configure('development', function(){
  console.log('DEPLOY DEV');  
  app.use(express.errorHandler());
  app.locals.pretty = true;  // don't minify jade templates
  app.use(express.static(path.join(__dirname, 'public')));

  // add DEV DB path here
});

app.configure('production', function(){
  // add prod DB path here
});

/*app.get('/', routes.index(Todo, clientcss.renderTags(), clientjs.renderTags('todoListCtrl')));
app.get('/users', user.list);
app.get('/todos.json', routes.get(Todo));

app.put('/todo/:id.json', routes.update(Todo));

app.post('/todo.json', routes.addTodo(Todo));*/



// load controllers
require('./lib/boot')(app, { verbose: !module.parent });

//app.get('/test', routes.test(app));

/*var Mongoose = require('mongoose');
var db = Mongoose.createConnection('localhost', 'mytestapp');

var TodoSchema = require('./models/TodoSchema.js').TodoSchema;
var Todo = db.model('todos', TodoSchema);
*/


/*app.get('/todos', function(req, res){
    var mos = app.get('theModels');
    app.get('theModels').Todo.find({}, function(error, todos){
      res.json(todos);
  });
});

app.post('/todo.json', function(req, res){
    var TodoSch = app.get('theModels').Todo;
    var todo = new TodoSch(req.body);
    //var todo = new app.get('theModels').Todo(req.body);
    todo.save(function(error, todo) {
      if (error || !todo) {
        res.json({ error : error });
      } else {
        res.json({ todo : todo });
      }
    });  
});*/



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port')); // change

});
