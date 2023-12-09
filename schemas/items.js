const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({ 
    name: String, 
    status: String,
    ordering: String,      
});

module.exports = mongoose.model('items', schema);