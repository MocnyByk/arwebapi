var mongoose        = require('mongoose');
var express         = require('express');
var errorHandler    = require('./../common/handler-error');
var auth            = require('./../common/handler-authorization');

var router      = express.Router()
    .post('/login', function(req, res){
        var token = auth.login(req);
        if(!token){
            auth.sendUnauthorized(res);
            return;
        }

        res.json(JSON.stringify(token));
    });

module.exports = router;