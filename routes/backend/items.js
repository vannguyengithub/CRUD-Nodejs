var express = require('express');
var router = express.Router();

const ItemsModel = require('./../../schemas/items');
const UtilsHelpers = require('./../../helpers/utils');



router.get('(/:status)?',  (req, res, next) => {
    let objWhere = {}
    let currentStatus = req.params.status
    let statusFilter = UtilsHelpers.createFilterStatus(currentStatus);

    if(currentStatus !== 'all') objWhere = {status: currentStatus}
    ItemsModel.find(objWhere).then( (items ) => {
        res.render('pages/items/list', { 
            pageTitle: 'Items',
            items: items,
            statusFilter: statusFilter
        });
    });
});

router.get('/add', (req, res, next) => {
    res.render('pages/items/add', { pageTitle: 'Items Add page' });
});


module.exports = router;
