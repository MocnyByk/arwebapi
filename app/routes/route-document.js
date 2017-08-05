var mongoose        = require('mongoose');
var express         = require('express');
var errorHandler    = require('./../common/handler-error');
var auth            = require('./../common/handler-authorization');
var logger          = require('./../common/handler-logger');
var Document        = require('./../models/document');

var helper = {
    getDocument: function(req, document = undefined){
        if(!req || !req.body)
            return undefined;

        if(document === undefined){
            document = new Document();
        }
        
        //document._id = req.body._id; // Never should be set
        if(req.body.title !== undefined)
            document.title = req.body.title;
        if(req.body.description !== undefined)
            document.description = req.body.description;
        if(req.body.docType !== undefined)
            document.docType = req.body.docType;
        if(req.body.mimeType !== undefined)
            document.mimeType = req.body.mimeType;
        if(req.body.docUrl !== undefined)
            document.docUrl = req.body.docUrl;
        if(req.body.thumbnailUrl !== undefined)
            document.thumbnailUrl = req.body.thumbnailUrl;
        //document.createDate = N/A, doesn't change.
        //document.createMember = N/A, Part of authorization
        if(req.body.height !== undefined)
            document.height = req.body.height;
        if(req.body.width !== undefined)
            document.width = req.body.width;
        if(req.body.folder !== undefined)
            document.folder = req.body.folder;
        if(req.body.displayOrder !== undefined)
            document.displayOrder = req.body.displayOrder;

        return document;
    }
};

var router      = express.Router()

    // GET /
    // REQUIRE AUTH
    // RETURN all documents
    .get('/', function(req, res){

        var qFolder = req.query.folder;
        var searchObj = {};

        if(qFolder){
            searchObj.folder = qFolder;
        }

        Document.find(searchObj, function(err, documents){
            if(err){
                errorHandler.handleError(err, res);
            }
            else if(!documents){
                auth.sendNotFound(res);
            }
            else{
                res.json(documents);
            }
        });
    })
    
    // GET
    // RETURN all distinct folder paths
    .get('/folder', function(req, res){
        var query = Document.find({ displayOrder: 1 }).select('folder', 'thumbnailUrl');

        query.exec(function(err, folders){
            if(err){
                errorHandler.handleError(err, res);
            }
            else{
                res.json(folders);
            }
        });
    })

    // GET /:document_id 
    // RETURN the document of the given id
    .get('/:document_id', function(req, res){
        var docId = req.params.document_id;
        if(!docId){
            auth.sendBadRequest('No document id given.');
            return;
        }

        if(!auth.isValidId(docId)){
            auth.sendBadRequest('Invalid document id given.');
            return;
        }

        Document.findById(docId, function(err, document){
            if(err){
                errorHandler.handleError(err, res);
            }
            else if(!document){
                auth.sendNotFound(res);
            }
            else{
                res.json(document);
            }
        });
    })

    // POST
    // REQUIRE AUTH
    .post('/',function(req, res){
        var member = auth.authenticate(req);
        if(!member){
            auth.sendUnauthorized(res);
            return;
        }

        var document = helper.getDocument(req);
        document.createMember = member.memberCode;

        document.save(function(err) {
            if (err){
                errorHandler.handleError(err, res);
            }
            else{
                res.json({_id: document._id});
            }
        });
    })
    
    // PUT
    // REQUIRE AUTH
    .put('/:document_id',function(req, res){
        var docId = req.params.document_id;
        if(!docId){
            auth.sendBadRequest('No document id given.');
            return;
        }

        if(!auth.isValidId(docId)){
            auth.sendBadRequest('Invalid document id given.');
            return;
        }

        var member = auth.authenticate(req);
        if(!member){
            auth.sendUnauthorized(res);
            return;
        }

        Document.findById(docId, function(err, document){
            if(err){
                errorHandler.handleError(err, res);
            }
            else if(!document){
                auth.sendNotFound(res);
            }
            else{
                var docToSave = helper.getDocument(req, document);
                document.__v += 1;

                docToSave.save(function(err){
                    if (err){
                        errorHandler.handleError(err, res);
                    }
                    else
                    {
                        res.json({_id: document._id});
                    }
                });
            }
        });
    })
    
    // DELETE
    // REQUIRE AUTH
    .delete('/:document_id',function(req, res){
        var docId = req.params.document_id;
        if(!docId){
            auth.sendBadRequest('No document id given.');
            return;
        }

        if(!auth.isValidId(docId)){
            auth.sendBadRequest('Invalid document id given.');
            return;
        }

        var member = auth.authenticate(req);
        if(!member){
            auth.sendUnauthorized(res);
            return;
        }

        Document.remove({_id: docId}, function(err, document){
            if (err){
                errorHandler.handleError(err, res);
            }
            else if(!document){
                auth.sendNotFound(res);
            }
            else{
                res.json(logger.buildMessageJson('Successfully Deleted'));
            }
        });
    });

module.exports = router;