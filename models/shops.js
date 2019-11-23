const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shopSchema = new Schema({
	shopName    : { type: String },
	description : String,
	socialCause : String,
	products    : [{ type: Schema.Types.ObjectId, ref: 'Product' }],
	website     : String,
	img         : String
});

const Shop = mongoose.model('Shop', shopSchema);

module.exports = Shop;
