/**
* Used for minification and obfuscating
*/

var piler = require("piler");

var clientjs = piler.createJSManager();
var clientcss = piler.createCSSManager();

/**
*GLOBAL 
*/
clientcss.addFile("./public/stylesheets/style.css");
clientcss.addFile("./public/javascripts/vendor/bootstrap-css/css/bootstrap.css");
clientjs.addFile("./public/javascripts/vendor/angular/angular.js");
clientjs.addFile("./public/javascripts/vendor/angular-bootstrap/ui-bootstrap-tpls.js");
clientjs.addFile("./public/javascripts/TodoModule.js");


/**
* Todos page
*/
clientjs.addFile("todoListCtrl","./public/javascripts/controllers/TodoListController.js");
clientjs.addFile("todoListCtrl","./public/javascripts/controllers/AuthController.js");


/**
* Login page
*/ 
clientjs.addFile("loginCtrl","./public/javascripts/controllers/AuthController.js");


/**
* Register page
*/
clientjs.addFile("registerCtrl","./public/javascripts/controllers/RegisterController.js");


exports.clientjs = clientjs;
exports.clientcss = clientcss;