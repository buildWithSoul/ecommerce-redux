"use strict"

const express = require('express');
const app = express();
const path = require('path');

// Middleware
app.use(express.static('public'))

app.get('/', function(req, res) {
	res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
});

app.listen(3000, function(){
	console.log('web-server');
});