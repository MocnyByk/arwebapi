var mongoose        = require('mongoose');
var express         = require('express');
var errorHandler    = require('./../common/handler-error');
var Document        = require('./../models/document');

var helper = {
    getDocument: function(req){
        if(!req || !req.body)
            return undefined;

        var document = new Document();
        
        document.title = req.body.title;
        document.description = req.body.description
        document.docType = req.body.docType
        document.mimeType = req.body.mimeType
        document.docUrl = req.body.docUrl
        document.thumbnailUrl = req.body.thumbnailUrl
        //document.createDate = N/A, doesn't change.
        document.createMember = req.body.createMember
        document.height = req.body.height
        document.width = req.body.width
        document.folder = req.body.folder

        return document;
    }
};

// router.get('/test', function(req, res){
//     res.json({ message: 'We hit the test route.' });
// });

var router      = express.Router()
    .get('/test', function(req, res){
        res.json({ message: 'We hit the test route.' });
    })

    // GET /
    // REQUIRE AUTH
    // RETURN all documents for the authorized user
    .get('/', function(req, res){
        var document = mongoose.model('Document');
        res.json(document);
    })
    
    // GET /:base64FolderPath 
    // RETURN all documents under the given path

    // POST
    // REQUIRE AUTH
    router.post('/',function(req, res){
        var document = helper.getDocument(req);

        document.save(function(err) {
            if (err){
                errorHandler.handleError(err, res);
            }
            else{
                res.json({_id: document._id});
            }
        });
    });

module.exports = router;
