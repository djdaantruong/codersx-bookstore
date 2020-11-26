var db = require('../db');
var shortid = require('shortid');
const e = require('express');

module.exports.index = function(req, res){
    var page = parseInt(req.query.page) || 1; //n
    var perPage = 8; //x

    var start = (page - 1) * perPage;
    var end = page * perPage;

    var drop = (page - 1) * perPage;

	res.render('products/index', {
        //Cach 1
        // products: db.get('products').value().slice(start, end)
        //Cach 2: dung cac method trong database lodash, doc va thuc hanh cho viec hoc cung nhu di lam
        products: db.get('products').drop(drop).take(perPage).value()
    });
    res.locals.page = page;
    res.locals.drop = drop;
};