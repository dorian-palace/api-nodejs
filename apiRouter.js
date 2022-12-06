const express = require('express');
const groupCtrl = require('./routes/groupCtrl');
const usersCtrl = require('./routes/usersCtrl');

//Router

exports.router =  (function () {
    var apiRouter = express.Router();

    //Route Utilisateur 
    apiRouter.route('/user/register/').post(usersCtrl.register);
    apiRouter.route('/user/login/').post(usersCtrl.login);
    apiRouter.route('/user/').get(usersCtrl.listUser);

    //Route Group
    apiRouter.route('/group/new/').post(groupCtrl.newGroup);
    apiRouter.route('/group/').get(groupCtrl.listGroup);
    return apiRouter;
})();