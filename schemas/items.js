const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({ 
    name: String, 
    status: String,
    ordering: Number,      
});

module.exports = mongoose.model('items', schema);