const express = require('express');
const usersCtrl = require('./routes/usersCtrl');

//Router

exports.router =  (function () {
    var apiRouter = express.Router();

    //Route Utilisateur 
    apiRouter.route('/user/register/').post(usersCtrl.register);
    apiRouter.route('/user/login/').post(usersCtrl.login);

    return apiRouter;
})();