// defining all the modules
const mod = {
    express : require('express'),
    dotenv : require('dotenv').config(),
    exphbs : require('express-handlebars'),
    mongoose : require('mongoose'),
    multer : require('multer'),
    nodemailer : require('nodemailer'),
    hbs : require('nodemailer-express-handlebars'),
    sessions : require('express-session'),
    bcrypt : require('bcrypt'),
    path : require('path'),
    cookieParser : require('cookie-parser'),
    express_validator : require('express-validator'),
    rn : require('random-number')
}

module.exports = mod;