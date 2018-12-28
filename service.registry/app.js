var express = require('express');
const Register = require('./register')

var app = express();
var register = new Register();

app.listen(3000);