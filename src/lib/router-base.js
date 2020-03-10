const express = require('express');
const config = require ("../config");

class RouterBase{
    constructor(){
        this.router = express.Router();
        this.config = config;
        this.prepareResponse();
    }
    prepareResponse(){
        //to be inplemented by base classes
    }
}

module.exports = RouterBase;