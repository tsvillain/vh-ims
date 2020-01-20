const route = require('express').Router();
const mongoose = require('mongoose');
const Products = require('../schema/productSchema');
/**
 * today dispached product
 * noOfexpiring products -
 * total products -
 * low stock products-
 */

const thirtyDays = 30*24*60*60*1000;

route.get('/', async (req, res) => {
    
    const dispachedToday = await Products.find({
        dispatchDate: Date.now()
    });

    const expiringProducts = await Products.find({
        expiryDate: Date.now() + thirtyDays
    });

    const noOfProducts = await Products.count({});
    
    const lowStockProduct = await Products.find({
        quantity: { $lte: 10 }
    });


    res.status(200).json({
        status: "success",
        data: {
            dispachedToday: dispachedToday.length === 0 ? null : dispachedToday,
            expiringProducts: expiringProducts.length === 0 ? null : dispachedToday,
            noOfProducts: noOfProducts,
            lowStockProduct: lowStockProduct.length === 0 ? null : dispachedToday
        }
    })
     
});

module.exports = route;