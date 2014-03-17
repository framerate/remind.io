'use strict';

var express = require('express');

var app = express();

app.set('views', 'views');
app.set('view engine', 'ejs');
app.use(express.static('static'));

require('./lib/routes')(app);
console.log('Server Listening on port 2015');
app.listen(2015);
