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

    isValidId: function(id){
        if(!id || !id.match(/^[0-9a-fA-F]{24}$/))
            return false;
        else {
            return true;
        }
    }
}