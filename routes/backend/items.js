var express = require('express');
var router = express.Router();

const systemConfig = require('./../../configs/system');
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
        totalItemPerPage    : 3,
        currentPage         : parseInt(ParamsHelpers.getParam(req.query, 'page', 1)),
        pageRanges          : 3,
    };

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

// change status
router.get('/change-status/:id/:status', async (req, res, next) => {
    let currentStatus = ParamsHelpers.getParam(req.params, 'status', 'active');
    let id            = ParamsHelpers.getParam(req.params, 'id', '');
    // active <-> inactive
    let status        = (currentStatus === 'active') ? 'inactive' : 'active';

    ItemsModel.findById(id).then( (itemResult) => {
        itemResult.status = status;
        itemResult.save().then((result) => {
            res.redirect(`/${systemConfig.prefixAdmin}/items`);
        });
    });
  

});

// delete item
router.get('/delete/:id', async (req, res, next) => {
    try {
        let id = ParamsHelpers.getParam(req.params, 'id', '');
        const result = await ItemsModel.deleteOne({ _id: id });

        if (result.deletedCount > 0) {
            res.redirect(`/${systemConfig.prefixAdmin}/items`);
        } else {
            res.status(404).send('Item not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


router.get('/add', (req, res, next) => {
    res.render('pages/items/add', { pageTitle: 'Items Add page' });
});


module.exports = router;