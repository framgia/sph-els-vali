const express = require('express')
const { body } = require('express-validator')
const { signup } = require('../controllers/userAuthController')
const { User } = require("../models");

const router = express.Router()

// Signup route
router.post('/signup', [
    body('email', "Please enter a valid email")
        .isEmail()
        .custom((value, {req})=>{
            return User.findOne({where:{email:value}}).then(user=>{
                if(user){
                    return Promise.reject(
                        "The Email is already exist, please try with another email"
                        );
                }
            })
        })
        .normalizeEmail(),
    body('password', 'Password should be at least 5 character long')
    .isLength({min:5})
    .trim()
    .isAlphanumeric()
], signup)

module.exports = router
