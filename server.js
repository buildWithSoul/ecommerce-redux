"use strict"

const express = require('express');
const app = express();
const path = require('path');

// Middleware
app.use(express.static('public'))

app.get('*', function(req, res) {
	res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
