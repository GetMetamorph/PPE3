const connection = require("../models/db");
const mysql = require("mysql");
const dbConfig = require("../config/db.config");


exports.register = (req, res, next) => {
    console.log(req.body);

    const { username, email, password, passwordconfirm } = req.body

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (req.body.email === undefined || req.body.username === undefined || req.body.password === undefined || req.body.passwordconfirm === undefined) {
        res.json({ error: true, message: 'Champs non défini' });
    } else if (req.body.email.length < 5 || req.body.username.length <= 2 || req.body.password.length < 5) {
        res.json({ error: true, message: 'Mdp, mail ou name trop petit' });
    } else if (!re.test(String(req.body.email).toLowerCase())) {
        res.json({ error: true, message: 'Email invalide' });
    } else if (password !== passwordconfirm) {
        res.json({ error: true, message: 'Les mots de passes ne correspondent pas.' });
    } else {
        //Si tout est bon, créée l'utilisateur
        next()
    }

}