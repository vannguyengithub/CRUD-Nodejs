var express = require('express');
var router = express.Router();

/* GET home page. */
// app.use('/admin', require('./routes/backend/home'));
// app.use('/admin/dashboard', require('./routes/backend/dashboard'));
// app.use('/admin/items', require('./routes/backend/items'));

router.use('/', require('./home'));
router.use('/dashboard', require('./dashboard'));
router.use('/items', require('./items'));

module.exports = router;
