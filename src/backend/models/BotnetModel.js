/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schema = new Schema(
        {
            name: String,
            token: String,
            ip: String,
            isAlive: Boolean,
            created:{type: Date, default: Date.now},
            updated: {type: Date, default: Date.now},
            os: String,
            struct: String,
            mixed: Schema.Types.Mixed,
            _uId: Schema.Types.ObjectId,
            nested: {stuff: {type: String, lowercase: true, trim: true}}
        });
var BotnetModel = mongoose.model('devices', schema);
console.log(JSON.stringify(BotnetModel));

module.exports=BotnetModel;