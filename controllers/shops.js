const express = require('express');
const router = express.Router();

//Require Shop and product model
const Shop = require('../models/shops.js');
const Product = require('../models/products.js');

//___________________
//7 Restful Routes
//___________________

//CHECKED
//New route: GET '/shops/new'
router.get('/new', (req, res) => {
	Shop.findById(req.params.id).populate('product').exec((err, foundShop) => {
		console.log(foundShop);
		if (err) {
			console.log('error: ', err);
		}

		Product.find({}, (err, foundProducts) => {
			console.log(foundProducts);
			res.render('shops/new.ejs', {
				shop     : foundShop,
				products : foundProducts
			});
		});
	});
});

//CHECKED
//Create route: POST '/shops'
router.post('/', (req, res) => {
	Shop.create(req.body, (err, createdShop) => {
		if (err) console.log('error this is with create route!');

		res.redirect('/shops');
	});
});

//Index route: GET '/shops'
router.get('/', (req, res) => {
	Shop.find({}, (err, allShops) => {
		if (req.session.currentUser) {
			res.render('shops/index.ejs', {
				shops : allShops
			});
		} else {
			res.render('shops/indexnotlogged.ejs', {
				shops : allShops
			});
		}
	});
});

//Delete route: DELETE '/shops/:id'
router.delete('/:id', (req, res) => {
	Shop.findByIdAndRemove(req.params.id, (err, data) => {
		res.redirect('/shops');
	});
});

//Edit route
router.get('/:id/edit', (req, res) => {
	Shop.findById(req.params.id).populate('product').exec((err, foundShop) => {
		// console.log(foundShop);
		if (err) {
			console.log('error: ', err);
		}

		Product.find({}, (err, foundProducts) => {
			console.log(foundProducts);
			res.render('shops/edit.ejs', {
				shop        : foundShop,
				allProducts : foundProducts
			});
		});
	});
});

// Update: PUT '/shops/:id'
router.put('/:id', (req, res) => {
	Shop.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedShop) => {
		res.redirect('/shops/' + req.params.id);
	});
});

// //Buy Route
// router.put('/:id/buy', (req, res) => {
// 	Shop.findByIdAndUpdate(req.params.id, { $inc: { qty: -1 } }, (err, shop) => {
// 		if (err) {
// 			console.log(err);
// 		}
// 		res.redirect('back');
// 	});
// });

//D
//Show route: GET '/shops/:id'
router.get('/:id', (req, res) => {
	Shop.findById(req.params.id).populate('products').exec((err, foundShop) => {
		if (err) {
			console.log('error: ', err);
		}
		if (req.session.currentUser) {
			res.render('shops/show.ejs', {
				shop : foundShop
			});
		} else {
			res.render('shops/shownotlogged.ejs', {
				shop : foundShop
			});
		}
	});
});

module.exports = router;
