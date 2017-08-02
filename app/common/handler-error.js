var express = require('express');
var logger  = require('./handler-logger');

module.exports = {
    handleError: function(err, res){
        if(err.name === 'ValidationError'){
            res.status(400);
            res.send({ message: err.message });
        }
        else{
            // If all else fails, shutdown the server.
            logger.log(JSON.stringify(err));
            res.status(500);
            res.send({ message: 'Unknown error occured.' });
        }
    }
}