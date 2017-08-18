var mongoose        = require('mongoose');
var express         = require('express');
var errorHandler    = require('./../common/handler-error');
var auth            = require('./../common/handler-authorization');
var logger          = require('./../common/handler-logger');
var VisitData       = require('./../models/visitdata');
var WebConfig       = require('./../models/websiteconfig');

var helper = {
    getVisitData: function(req, visitData = undefined){
        if(!req || !req.body)
            return undefined;

        if(!visitData){
            visitData = new Inqiury();
        }
        
        if(req.body.ipAddress !== undefined)
            visitData.ipAddress = req.body.ipAddress;
        if(req.body.browser !== undefined)
            visitData.browser = req.body.browser;
        if(req.body.countryCode !== undefined)
            visitData.countryCode = req.body.countryCode;
        if(req.body.countryName !== undefined)
            visitData.countryName = req.body.countryName;
        if(req.body.city !== undefined)
            visitData.city = req.body.city;
        if(req.body.screenSize !== undefined)
            visitData.screenSize = req.body.screenSize;

        return visitData;
    }
};

var router = express.Router()

    .post('/',function(req, res){

        var visitData = helper.getVisitData(req);

        visitData.save(function(err) {
            if (err){
                errorHandler.handleError(err, res);
            }
            else{
                // Log the visit into our config table.
                WebConfig.find(function(err, configs){
                    if(err){
                        logger.log('Error encountered in POST route-visitdata while updating visit count.')
                        logger.log(err);
                    }
                    else if(!configs){
                        logger.log('No web configuration found...');
                    }
                    else{
                        var config = configs[0];
                        config.visitCount += 1;
                        config.visitCountLastUpdated = new Date();
                        config.save(function(err){
                            if(err){
                                logger.log('Error while saving visitCount in config.');
                                logger.log(err);
                            }
                        });
                    }
                });

                res.json({_id: visitData._id});
            }
        });
    });

module.exports = router;