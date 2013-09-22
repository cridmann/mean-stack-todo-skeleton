/**
 * MODULE DEPENDENCIES
 * @type {*}
 */
var express = require('express')
  , fs = require('fs')
    , _ = require('underscore');

var restrict = function(req, res, next){
    if (req.session.user) {
        console.log('access granted!');
        next();
    } else {
        req.session.error = 'Access denied!';
        //res.redirect('/login');
        console.log('access denied!');
        res.redirect('/register');      // TODO: on a 'POST' this won't work.
    }
};

module.exports = function(parent, options){
  var verbose = options.verbose;
  fs.readdirSync(__dirname + '/../controllers').forEach(function(name){
    verbose && console.log('\n   %s:', name);
    console.log(name.length);
    var obj = require('./../controllers/' + name + '/' + name + 'Ctrl')
      , name = obj.name || name
      , prefix = obj.prefix || ''
      , app = express()
      , method
      , path;

      console.log('name: ' + name);

    // allow specifying the view engine
    if (obj.engine) app.set('view engine', obj.engine);
    app.set('views', __dirname + '/../controllers/' + name + '/views');

    // before middleware support
    if (obj.before) {
      path = '/' + name + '/:' + name + '_id';
      app.all(path, obj.before);
      verbose && console.log('     ALL %s -> before', path);
      path = '/' + name + '/:' + name + '_id/*';
      app.all(path, obj.before);
      verbose && console.log('     ALL %s -> before', path);
    }

    // generate routes based
    // on the exported methods
    for (var key in obj) {
      // "reserved" exports
      if (~['name', 'prefix', 'engine', 'before'].indexOf(key)) continue;
      console.log('key: ' + key);
      // route exports
      switch (key) {
        case 'show':
          method = 'get';
          path = '/' + name + '/:' + name + '_id.json';
          break;
        case 'list_route':
          method = 'get';
          path = '/' + name + 's'; 
          break;
        case 'list_json':  // used for XHR getting all results
          method = 'get'
          path = '/' + name + 's.json';
          break;
        case 'edit':
          method = 'get';
          path = '/' + name + '/:' + name + '_id/edit';
          break;
        case 'update':
          method = 'put';
          path = '/' + name + '/:' + name + '_id.json';
          break;
        case 'create':
          method = 'post';
          path = '/' + name + '.json';
          break;
        case 'create_rt':
          method = 'post';
          path = '/' + name + '.json';
          break;
        case 'index':
          method = 'get';
          path =  '/';
          break;
        case 'route_index':
          method = 'get';
          path = '/' + name;
          break;
        case 'tester':
          method = 'get';
          path = '/tester';   // USED FOR TESTING PURPOSES
          break;
        default:
          throw new Error('unrecognized route: ' + name + '.' + key);
      }

      path = prefix + path;
      verbose && console.log('method + path + key  + restricted\n' + method + ' + ' +
        path + ' + ' + key + ' + '  + ' + ' + obj[key].restricted);

        /*if (key === 'list_route' && name === 'todo'){
            console.log(obj.list_route.list_route);
            app[method](path, restrict);
        }
        else {
            app[method](path, obj[key]);
        }  */

        if (_.isUndefined(obj[key].restricted) || obj[key].restricted){
            app[method](path, restrict, obj[key][key]);
        }
        else {
            app[method](path, obj[key][key]);
        }

      //app[method](path, obj[key](parent));
      verbose && console.log('     %s %s -> %s', method.toUpperCase(), path, key);
    }

      app.get('/logout', function(req, res){
          req.session.loggedIn = false;
          req.session.destroy(function(){
              //res.redirect('/');
              res.json({redirect : '/'});
          });
          //res.json({"status" : "1"});
      });

    // mount the app
    parent.use(app);
  });
};