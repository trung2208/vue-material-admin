/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

'use strict';
// init serial comm in here


var interval=0;
exports.hello = function (req, res) {
    res.json({"word": "hello from server!"});
};
 
exports.authorized = function (req, res) {
    const Gpio = require('orange-pi-gpio');
 
let gpio5 = new Gpio({pin:9, mode: 'out', ready: ()=>{
    let value = 1;
 
   interval= setInterval(function() {
        process.stdout.write('\x1B[2J\x1B[0f\u001b[0;0H');
 
        if(value){
            console.log('\x1b[32m%s\x1b[0m', `ON`);
        } else {
            console.log('\x1b[31m%s\x1b[0m', `OFF`);
        }
        
        gpio5.write(value);
        value = +!value;
    }, 50);
 
}});
res.json({"do":"done! ","pid":interval});
};
exports.getAuthStatus = function (req, res) {
	clearInterval(interval);
    console.log("CheckAuth!");
res.json({"push":"clear interval!"});

};