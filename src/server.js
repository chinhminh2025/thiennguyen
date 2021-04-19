const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const path = require('path')
const app = express()
require('dotenv').config();
const { auth,requiresAuth } = require('express-openid-connect');
const route = require('./routes');
const expressLayouts = require('express-ejs-layouts');
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const uri = process.env.MONGO_DB_URI || 'mongodb+srv://database:1234@thiennguyen.mujmy.mongodb.net/blog?retryWrites=true&w=majority';

mongoose.connect(uri, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
})

// Static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + '/public/css'))
app.use('/js', express.static(__dirname + '/public/js'))
app.use('/assets', express.static(__dirname + '/public/assets'))
app.use('/dashboard', express.static(__dirname + '/public/dashboard'))
app.use('/scss', express.static(__dirname + '/public/scss'))
app.use('/vendor', express.static(__dirname + '/public/vendor'))

// Set Templating Engine
app.use(expressLayouts)
app.set('views', path.join(__dirname,  'views'));
app.set('layout', './layouts/full-width')
app.set('view engine', 'ejs')

app.use(
  auth({
  authRequired:false,
  auth0Logout:true,
    issuerBaseURL: process.env.ISSUER_BASE_URL ,
    baseURL: process.env.BASE_URL ,
    clientID: process.env.CLIENT_ID ,
    secret: process.env.SECRET
  })
);

route(app);

app.listen(3000)