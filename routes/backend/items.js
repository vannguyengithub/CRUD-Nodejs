var express = require('express');
var router = express.Router();

const ItemsModel = require('./../../schemas/items');
const UtilsHelpers = require('./../../helpers/utils');
const ParamsHelpers = require('./../../helpers/params');



router.get('(/:status)?',  (req, res, next) => {
    let objWhere = {}
    let keyword = ParamsHelpers.getParam(req.query, 'keyword', '');

    let currentStatus = ParamsHelpers.getParam(req.params, 'status', 'all');
    
    let statusFilter = UtilsHelpers.createFilterStatus(currentStatus);
    
    if(currentStatus === 'all') {
        if(keyword !== '') objWhere = { name: new RegExp(keyword, 'i') };
    } else {
        objWhere = {status: currentStatus, name: new RegExp(keyword, 'i') };
    }

    ItemsModel.find(objWhere).then( (items ) => {
        res.render('pages/items/list', { 
            pageTitle: 'Items',
            items: items,
            statusFilter: statusFilter,
            currentStatus: currentStatus,
            keyword: keyword
        });
    });
});

router.get('/add', (req, res, next) => {
    res.render('pages/items/add', { pageTitle: 'Items Add page' });
});


module.exports = router;
