var express = require('express');
var router = express.Router();

const ItemsModel = require('./../../schemas/items');



router.get('/',  (req, res, next) => {
    ItemsModel.find({ }).then( (items ) => {
        res.render('pages/items/list', { 
            pageTitle: 'Items',
            items: items 
        });
    })

});

router.get('/add', (req, res, next) => {
    res.render('pages/items/add', { pageTitle: 'Items Add page' });
});


module.exports = router;
