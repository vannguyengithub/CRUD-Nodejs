var express = require('express');
var router = express.Router();

const ItemsModel = require('./../../schemas/items');
const UtilsHelpers = require('./../../helpers/utils');
const ParamsHelpers = require('./../../helpers/params');



router.get('(/:status)?',  async (req, res, next) => {
    let objWhere = {}
    let keyword = ParamsHelpers.getParam(req.query, 'keyword', '');
    let currentStatus = ParamsHelpers.getParam(req.params, 'status', 'all');
    let statusFilter = UtilsHelpers.createFilterStatus(currentStatus);
    
    let pagination = {
        totalItem           : 1,  
        totalItemPerPage    : 2,
        currentPage         : 1,
        pageRanges          : 3,
    };

    pagination.currentPage = parseInt(ParamsHelpers.getParam(req.query, 'page', 1));

    if(currentStatus === 'all') {
        if(keyword !== '') objWhere = { name: new RegExp(keyword, 'i') };
    } else {
        objWhere = {status: currentStatus, name: new RegExp(keyword, 'i') };
    }

    // ItemsModel.countDocuments(objWhere).then( (data) => {
    //     pagination.totalItem = data;
    // });
    const data = await ItemsModel.countDocuments(objWhere);
    pagination.totalItem = data;

    ItemsModel
        .find(objWhere)
        .sort({ordering: 'asc'})
        .skip((pagination.currentPage - 1) * pagination.totalItemPerPage)
        .limit(pagination.totalItemPerPage)
        .then( (items ) => {
        res.render('pages/items/list', { 
            pageTitle: 'Items',
            items: items,
            statusFilter: statusFilter,
            currentStatus: currentStatus,
            keyword: keyword,
            pagination: pagination
        });
    });
});

router.get('/add', (req, res, next) => {
    res.render('pages/items/add', { pageTitle: 'Items Add page' });
});


module.exports = router;