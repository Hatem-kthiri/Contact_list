const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Contact = require("../models/Contact");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { extractToken } = require("../middlewares/user");
require("dotenv").config();

// registration
// @route   POST api/users/register
// @desc    this route is for registering the user
// @access  Public
router.post("/register", (req, res) => {
    const { userName, email, password, password2 } = req.body;
    // verifying if the email already exists in the DB
    User.findOne({ email: email }).then((user) => {
        if (user) {
            res.status(409).json({ msg: "email already exists" });
        } else if (password !== password2) {
            res.status(400).json({ msg: "passwords are not the same" });
        } else {
            const newUser = new User({
                userName,
                email,
                password,
            });
            bcrypt.genSalt(10, function (err, salt) {
                if (err) throw err;
                bcrypt.hash(newUser.password, salt, (err, cryptedPassword) => {
                    if (err) throw err;
                    newUser.password = cryptedPassword;
                    newUser.save((err) => {
                        if (err) throw err;
                    });
                    res.status(200).json({
                        status: 200,
                        msg: "user registered successfully",
                        user: newUser,
                    });
                });
            });
        }
    });
});

// login
// @route   POST api/users/login
// @desc    this route is for the user sign in
// @access  Public
router.post("/login", (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email: email })
        .then((user) => {
            if (user) {
                bcrypt.compare(
                    password,
                    user.password,
                    (err, passwordMatch) => {
                        if (err) throw err;
                        if (passwordMatch === true) {
                            jwt.sign(
                                { user },
                                process.env.SECRETKEY,
                                (err, token) => {
                                    if (err) throw err;
                                    res.status(200).json({
                                        status: 200,
                                        msg: "logged in successfully",
                                        token: token,
                                    });
                                }
                            );
                        } else {
                            res.status(400).json({
                                status: 400,
                                msg: "wrong password",
                            });
                        }
                    }
                );
            } else {
                res.status(400).json({
                    status: 400,
                    msg: "email doesn't exist",
                });
            }
        })
        .catch((err) => console.log(err));
});


module.exports = router;
