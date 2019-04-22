/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var Botnet = require('../models/BotnetModel');

// function log(state,log){
// 	console.log("["+new Date().toLocaleString()+"] - [" + state+"]: " +log);
// }

function handleError(err){
    global.log("ERR",err);
    return;
}
exports.create = function (model, cb) {
    var res = {
        result: false
    };
    Botnet.create(model, function (err, awesome_instance) {
        if (err) {
            return handleError(err);
        }
        // luu!
        res.result = true;
        res.model = awesome_instance;
        global.log("INFO","\nresult create: " + JSON.stringify(res)+"\n");
        cb(res);
    });
};
exports.save = function (model) {
    var work = new Botnet(model);
    work.save(function (err) {
        if (err) {
            return handleError(err);
        }
    });
};
exports.listedDevices = function (cb) {
    global.log("INFO","in listed method");
    Botnet.find({}, null,{limit: 50}, function (err, devices) {
        //global.log("ERR",err);
        if (err) {
            return handleError(err);
        }
        global.log("INFO",JSON.stringify(devices.length));
        cb(devices);
    });
};
exports.findDevice = function (token, cb) {
    Botnet.find({"token": token}, function (err, devices) {
        if (err) {
            return handleError(err);
        }
        cb(devices);
    });
};

