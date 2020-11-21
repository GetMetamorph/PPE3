const connection = require("../models/db");
const mysql = require("mysql");
const dbConfig = require("../config/db.config");

// Create a connection to the database
const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

exports.register = (req, res) => {$
    console.log(req.body);
    
    const { name, mail, password, passwordconfirm } = req.body

    connection.query('SELECT email FROM t_user_usr WHERE email = ? ', [email], (error, results) => {
        if(error) {
            console.log(error);
        }

        if(result.length > 0) {
            return res.render('register', {
                message: 'Cette adresse mail est déjà utilisé.'
            })
        }
        else if( password !== passwordconfirm ) {
            return res.render('register', {
                message: 'Les mots de passe ne correspondent pas.'
            })
        }
    })
    
    

}