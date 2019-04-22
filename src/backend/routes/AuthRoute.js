/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


'use strict';
module.exports = function (app) {
    var controller = require('../controllers/AuthController');

    // todoList Routes
    app.route('/Auth/')
             .get(controller.authorized);
    app.route('/checkAuth/:phone')
            .get(controller.getAuthStatus);
    app.route('/hello').get(controller.hello);
};