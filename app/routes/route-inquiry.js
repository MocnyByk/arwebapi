var mongoose        = require('mongoose');
var express         = require('express');
var errorHandler    = require('./../common/handler-error');
var auth            = require('./../common/handler-authorization');
var logger          = require('./../common/handler-logger');
var Inqiury        = require('./../models/inquiry');

var helper = {
    getInquiry: function(req, inquiry = undefined){
        if(!req || !req.body)
            return undefined;

        if(!inquiry){
            inquiry = new Inqiury();
        }
        
        if(req.body.subject !== undefined)
            inquiry.subject = req.body.subject;
        if(req.body.description !== undefined)
            inquiry.description = req.body.description;
        if(req.body.author !== undefined)
            inquiry.author = req.body.author;
        if(req.body.email !== undefined)
            inquiry.email = req.body.email;
        if(req.body.markedRead !== undefined)
            inquiry.markedRead = req.body.markedRead;

        return inquiry;
    }
};

var router = express.Router()

    // GET /
    // REQUIRE AUTH
    // RETURN all inquiries for the authorized user
    .get('/', function(req, res){
        var member = auth.authenticate(req);
        if(!member){
            auth.sendUnauthorized(res);
            return;
        }

        Inqiury.find(function(err, inquiries){
            if(err){
                errorHandler.handleError(err, res);
            }
            else{
                res.json(inquiries);
            }
        });
    })

    .post('/',function(req, res){

        var inquiry = helper.getInquiry(req);

        inquiry.save(function(err) {
            if (err){
                errorHandler.handleError(err, res);
            }
            else{
                res.json({_id: inquiry._id});
            }
        });
    })

    // PUT
    // REQUIRE AUTH
    // Meant to mark things as read.
    .put('/:inquiry_id',function(req, res){
        var inqId = req.params.inquiry_id;
        if(!inqId){
            auth.sendBadRequest('No inquiry id given.');
            return;
        }

        if(!auth.isValidId(inqId)){
            auth.sendBadRequest('Invalid inquiry id given.');
            return;
        }

        var member = auth.authenticate(req);
        if(!member){
            auth.sendUnauthorized(res);
            return;
        }

        Inqiury.findById(inqId, function(err, inquiry){
            if(err){
                errorHandler.handleError(err, res);
            }
            else if(!inquiry){
                auth.sendNotFound(res);
            }
            else{
                var inqToSave = helper.getInquiry(req, inquiry);
                inquiry.__v += 1;

                inqToSave.save(function(err){
                    if (err){
                        errorHandler.handleError(err, res);
                    }
                    else
                    {
                        res.json({_id: inquiry._id});
                    }
                });
            }
        });
    })

    // DELETE
    // REQUIRE AUTH
    .delete('/:inquiry_id',function(req, res){
        var inqId = req.params.inquiry_id;
        if(!inqId){
            auth.sendBadRequest('No inquiry id given.');
            return;
        }

        if(!auth.isValidId(inqId)){
            auth.sendBadRequest('Invalid inquiry id given.');
            return;
        }

        var member = auth.authenticate(req);
        if(!member){
            auth.sendUnauthorized(res);
            return;
        }

        Inqiury.remove({_id: inqId}, function(err, inquiry){
            if (err){
                errorHandler.handleError(err, res);
            }
            else if(!inquiry){
                auth.sendNotFound(res);
            }
            else{
                res.json(logger.buildMessageJson('Successfully Deleted'));
            }
        });
    });

module.exports = router;