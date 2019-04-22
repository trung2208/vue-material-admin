/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


'use strict';
var SIZE = Object.freeze({
    SMALL: {value: 0, name: "Small", code: "S"},
    MEDIUM: {value: 1, name: "Medium", code: "M"},
    LARGE: {value: 2, name: "Large", code: "L"}
});
var SMS_STATE = Object.freeze({
    NOT_SENT: 0,
    SENDING: 1,
    SENT: 2,
    SEND_FAILED: 3,
    ERROR: 4
});
class SmsModel {

    constructor(phone, authCode, template) {
        this.phone = phone;
        this.authCode = authCode;
        this.template = template;
        this.status = SMS_STATE.NOT_SEND;
    }
};
