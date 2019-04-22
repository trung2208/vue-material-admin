/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


'use strict';

var service = require('../services/BotnetService');
var Cryptor = require('../util/cryptor');

// function log(state,log){
// 	console.log("["+new Date().toLocaleString()+"] - [" + state +"]: " +log);
// }
exports.collectData = function (req, res) {
    // dbUtil.createBotnet();
    var data = req.body.data;
    global.log("INFO","data receive : \n"+JSON.stringify(data)+"\n");
    var authToken = data.token;
    var action = req.body.action;
    if (!authToken) {
        res.status(401).send('invalid token...');
        return;
    }
    switch (action) {
        case "CREATE":
            //log("INFO",JSON.stringify(global.tokenList));
            if (global.tokenList.indexOf(authToken) < 0) {
               // log("INFO",authToken);
                res.status(401).send('invalid token...!');
                return;
            }
            service.findDevice(data.token, function (devices) {
                //log("INFO",JSON.stringify(devices));
                if (typeof devices !== 'undefined' && devices.length > 0) {
                    var result = {
                        "status": "duplicate!"
                    };
                    res.status(200).send(result);
                } else {
                    service.create(data, function (result) {
                        data.token = Buffer.from(Cryptor.encrypt(authToken + "-" + data.ip + "-" + result.model.created)).toString('base64');
                        data.updated = Date.now();
                       // log("INFO",authToken);
                       // log("INFO",data.token);
                        global.tokenList.splice(global.tokenList.indexOf(authToken), 1);
                        service.save(data);
                        result.model.token = data.token;
                        res.status(200).send(result);
                    });
                }
            });
            break;
        case "UPDATE":
            service.findDevice(data.token, function (devices) {
               // log("INFO",JSON.stringify(devices));
                if (typeof devices !== 'undefined' && devices.length > 0) {
                    data.updated=Date.now();
                    service.save(data);
                    var result = {
                        "status": true
                    };
                    res.status(200).send(result);

                } else {
                    var result = {
                        "status": false
                    };
                    res.status(200).send(result);
                }
            });

            break;
    }
};
exports.listed = function (req, res) {
    service.listedDevices(function (devices) {
        if (!devices) {
            res.status(500).send("error!");
        } else {
            res.status(200).send(devices);
        }
    });

};
exports.generateToken = function (req, res) {

    var data = req.body;
    global.log("INFO","\nGenerateToken: "+JSON.stringify(data)+"\n");

    if (!data || !data.time || !data.ip) {
        res.status(401).send("not authorzired!");
    }
    var plainText = data.time + "-" + data.ip;
    var cipher = Buffer.from(Cryptor.encrypt(plainText)).toString('base64');
    global.tokenList.push(cipher);
    res.status(200).send(cipher);
};
