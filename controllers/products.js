const express = require('express');
const router = express.Router();
const Product = require('../models/products.js');
const Shop = require('../models/shops.js');

//___________________
//7 Restful Routes
//___________________

// Index
router.get('/', (req, res) => {
	Product.find({}, (err, allProducts) => {
		if (req.session.currentUser) {
			res.render('products/index.ejs', {
				products : allProducts
			});
		} else {
			res.render('products/indexnotlogged.ejs', {
				products : allProducts
			});
		}
	});
});

//New
router.get('/new', (req, res) => {
	Product.findById(req.params.id).populate('shop').exec((err, foundProduct) => {
		// console.log(foundProduct);
		if (err) {
			console.log('error: ', err);
		}

		Shop.find({}, (err, foundShops) => {
			res.render('products/new.ejs', {
				product  : foundProduct,
				allShops : foundShops
			});
		});
	});
});

//Create
router.post('/', (req, res) => {
	Product.create(req.body, (err, createdProduct) => {
		if (err) console.log('error this is with create route!');
		res.redirect('/products');
	});
});

//Delete
router.delete('/:id', (req, res) => {
	Product.findByIdAndRemove(req.params.id, () => {
		res.redirect('/products');
	});
});

//Edit route
router.get('/:id/edit', (req, res) => {
	Product.findById(req.params.id).populate('shop').exec((err, foundProduct) => {
		// console.log(foundProduct);
		if (err) {
			console.log('error: ', err);
		}

		Shop.find({}, (err, foundShops) => {
			res.render('products/edit.ejs', {
				product  : foundProduct,
				allShops : foundShops
			});
		});
	});
});

// Update: PUT '/products/:id'
router.put('/:id', (req, res) => {
	Product.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedProduct) => {
		res.redirect('/products/' + req.params.id);
	});
});

//Show route
router.get('/:id', (req, res) => {
	Product.findById(req.params.id).populate('shop').exec((err, foundProduct) => {
		if (err) {
			console.log('error: ', err);
		}
		// console.log(foundProduct);

		if (req.session.currentUser) {
			res.render('products/show.ejs', {
				product : foundProduct
			});
		} else {
			res.render('products/shownotlogged.ejs', {
				product : foundProduct
			});
		}
	});
});

module.exports = router;
