const express = require('express');
const devController = require('./controllers/devController');
const searchController = require('./controllers/searchController');

const route = express.Router();

route.get('/dev', devController.index);
route.get('/search', searchController.index)
route.post('/dev', devController.store);

module.exports = route;