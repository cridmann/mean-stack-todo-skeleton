
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , models = require('./models/models.js')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , assetMgr = require('./lib/assetManager')
    , config = require('./lib/config.js').config;

var app = express();

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
            schemaFactory: models.Mongoose, // optional
            dbinstance: models.db,
            host: config.mongodb.host, // optional
            port: config.mongodb.port, // optional
            db: config.mongodb.dbname, // optional
            collection: 'sessions', // optional
            expire: 86400 // optional
        })
    }));

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

// load controllers
require('./lib/boot')(app, { verbose: !module.parent });

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port')); // change

});
