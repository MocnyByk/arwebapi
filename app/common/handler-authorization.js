var express = require('express');

module.exports = {

    // Uses Authorization/Basic to create a token.
    // Returns '{token: ""}'
    login: function(req){
        return { token: 'ABCD' };
    },

    // Uses Authorization/Token to verify validity of login token.
    // Returns '{memberCode: ""}'
    authenticate: function(req){
        return { memberCode: 'API_TEST' };
    },

    sendNotFound: function(res){
        res.status(404);
        res.send({ message: 'Requested Resource Was Not Found At Designated Location.' });
    },

    sendUnauthorized: function(res){
        res.status(401);
        res.send({ message: 'Unable to access requested resource.' });
    },

    sendBadRequest: function(res, msg){
        res.status(400);

        if(msg){
            res.send({ message: msg });
        }
        else{
            res.send({ message: 'Bad Request.' });
        }
    },

    isValidId: function(id){
        if(!id || !id.match(/^[0-9a-fA-F]{24}$/))
            return false;
        else {
            return true;
        }
    }
}