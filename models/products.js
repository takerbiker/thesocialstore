const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productsSchema = new Schema({
	item        : String,
	description : String,
	price       : Number,
	img         : String,
	shop        : [{ type: Schema.Types.ObjectId, ref: 'Shop' }]
});

const Product = mongoose.model('Product', productsSchema);

module.exports = Product;
