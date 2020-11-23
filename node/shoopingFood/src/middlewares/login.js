const connection = require("../models/db"),
    mysql = require("mysql"),
    bcrypt = require('bcrypt'),
    session = require('express-session'),
    User = require('../models/userModels');

exports.login = async(req, res, next) => {

    const { username, password } = req.body

    if (req.body.username === undefined || req.body.password === undefined) {
        res.json({ error: true, message: 'Champs non défini' });
    } else {
        hash = await User.Gethash(username)
        if (bcrypt.compareSync(password, hash)) {
            req.session.loggedin = true;
            req.session.username = username;
            res.redirect('http://localhost:4200/home');
        } else {
            res.json({ error: true, message: 'Mot de passe incorrect' });
        }
    }

}