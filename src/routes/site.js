const express = require('express');
const app = express();
const router = express.Router();
const { auth,requiresAuth } = require('express-openid-connect');
// const jwt = require('express-jwt');
// const jwtAuthz = require('express-jwt-authz');
// const jwksRsa = require("jwks-rsa");

const siteController = require('../controllers/SiteController');

// const checkPermissions = jwtAuthz(["read:users"],{ 
//     customScopeKey: "permissions"
// });


router.get('/search', siteController.search);
router.get('/', siteController.index);
router.get('/login',(req, res) =>{
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
})

// router.get('/profile',requiresAuth(),(req, res) =>{
//     res.send(JSON.stringify(req.oidc.user));
// })
router.get('/profile',requiresAuth(),(req, res) =>{
    res.render('profile')
})
router.get('/dashboard',(req, res) =>{
    res.render('user-list')
})

module.exports = router;
