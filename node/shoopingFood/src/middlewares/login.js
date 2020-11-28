const dbConfig = require("../config/db.config");
const connection = require("../models/db"),
    mysql = require("mysql"),
    bcrypt = require('bcrypt'),
    session = require('express-session'),
    User = require('../models/userModels'),
    jwt = require('jsonwebtoken');

require('dotenv').config();

exports.login = async(req, res, next) => {
    try{
        const { email, password } = req.body;

        if (req.body.email === undefined || req.body.password === undefined) {
            res.json({ error: true, message: 'Champs non défini' });
        } else {
            hash = await User.Gethash(email)
            if (bcrypt.compare(password, hash)) {
                //old
                req.session.loggedin = true;
                req.session.email = email;
                //old
                connection.query('SELECT USR_Id, USR_Firstname, USR_Mail, USR_Password, HSE_Id FROM T_USER_USR WHERE USR_Mail = ?', [email], async (error, results) => {
                    const id = results[0].id;

                    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                        expiresIn: process.env.JWT_EXPIRES_IN
                    });

                    console.log("Le token est : " + token)

                    const cookieOptions = {
                        expires: new Date(
                            Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                        ),
                        httpOnly: true                    
                    }

                    res.cookie('jwt', token, cookieOptions);
                    res.status(240).redirect('http://localhost:4200/home')
                })

            } else {
                res.json({ error: true, message: 'Mot de passe incorrect'});
            }
        }
    }
    catch (error){
        console.log(error)
    }

}
