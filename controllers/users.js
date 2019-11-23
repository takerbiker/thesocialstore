const express = require('express');
const users = express.Router();
const User1 = require('../models/users.js');
const bcrypt = require('bcrypt')

users.post('/', (req, res) => {
	req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
	User1.create(req.body, (err, createdUser) => {
		res.redirect('/');
	});
});

users.get('/new', (req, res) => {
	res.render('users/new.ejs');
});

module.exports = users;
