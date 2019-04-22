/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


'use strict';
module.exports = function (app) {
    var controller = require('../controllers/BotnetController');

    app.route('/cdn/botnet')
            .post(controller.listed);
    app.route('/cdn/botnet/push').post(controller.collectData);
    app.route('/cdn/botnet/devices').get(controller.listed);
    app.route('/cdn/botnet/tokenGen').post(controller.generateToken);
};