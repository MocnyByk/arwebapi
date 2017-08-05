var mongoose        = require('mongoose');
var express         = require('express');
var errorHandler    = require('./../common/handler-error');
var auth            = require('./../common/handler-authorization');
var logger          = require('./../common/handler-logger');
var Content         = require('./../models/contents');

var helper = {
    getContent: function(req, content = undefined){
        if(!req || !req.body)
            return undefined;

        if(content === undefined){
            content = new Inqiury();
        }
        
        if(req.body.tag !== undefined)
            content.tag = req.body.tag;
        if(req.body.subTag !== undefined)
            content.subTag = req.body.subTag;
        if(req.body.data !== undefined)
            content.data = req.body.data;

        return content;
    }
};

var router = express.Router()

    // GET /
    // RETURN all inquiries under the search parameters
    .get('/', function(req, res){
        var tag = req.query.tag;
        var subTag = req.query.subTag;
        var searchObj = {};

        if(!tag){
            auth.sendUnauthorized(res);
            return;
        }
        else{
            searchObj.tag = tag;
        }

        if(subTag){
            searchObj.subTag = subTag;
        }

        Content.find(searchObj, function(err, contents){
            if(err){
                errorHandler.handleError(err, res);
            }
            else if(!contents){
                auth.sendNotFound(res);
            }
            else{
                res.json(contents);
            }
        });
    })
    
    // PUT
    // REQUIRE AUTH
    .put('/:content_id',function(req, res){
        var contentId = req.params.content_id;
        if(!contentId){
            auth.sendBadRequest('No content id given.');
            return;
        }

        if(!auth.isValidId(contentId)){
            auth.sendBadRequest('Invalid content id given.');
            return;
        }

        var member = auth.authenticate(req);
        if(!member){
            auth.sendUnauthorized(res);
            return;
        }

        Content.findById(contentId, function(err, content){
            if(err){
                errorHandler.handleError(err, res);
            }
            else if(!content){
                auth.sendNotFound(res);
            }
            else{
                var inqToSave = helper.getContent(req, content);
                content.__v += 1;

                inqToSave.save(function(err){
                    if (err){
                        errorHandler.handleError(err, res);
                    }
                    else
                    {
                        res.json({_id: content._id});
                    }
                });
            }
        });
    });

module.exports = router;