const User = require("../models/userModels"),
    bcrypt = require('bcrypt');

// Create and Save a new User
exports.create = async(req, res) => {
    console.time();

    const isExist = await User.checkEmail(req.body.email)
        // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    if (isExist != 0) {
        res.json({ error: true, message: 'Cette adresse mail est déjà utilisé.' })
    } else {
        // Create a User
        const salt = await bcrypt.genSalt(10) // Création du salt random
        const hash = await bcrypt.hash(req.body.password, salt) // Chiffrement du password
        const user = new User({
            USR_Mail: req.body.email,
            USR_Firstname: req.body.username,
            USR_Password: hash
        });

        // Save User in the database
        User.create(user, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the User."
                });
            } else res.redirect('http://localhost:4200');
        });
        console.timeEnd();

    };
}

// Retrieve all User from the database.
exports.findAll = (req, res) => {
    User.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving user."
            });
        else res.redirect('http://localhost:4200');

    });
};

// Find a single User with a userid
exports.findOneId = (req, res, next) => {
    User.findById(req.params.userid, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found User with id ${req.params.userid}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving User with id " + req.params.userid
                });
            }
        } else next()

    });


};
// Find a single User with a username
exports.findOneName = (req, res) => {
    User.findByName(req.params.username, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found User with name ${req.params.username}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving User with name " + req.params.username
                });
            }
        } else res.redirect('http://localhost:4200');

    });
};
// Update a User identified by the userid in the request
exports.update = async(req, res) => {

    const isExist = await User.checkEmail(req.body.email)

    const isOwner = await User.checkEmailU(req.body.email, req.params.userid)

    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    if (isExist != 0 && isOwner != 1) {
        res.json({ error: true, message: 'Cette adresse mail est déjà utilisé.' })
    } else {
        const salt = await bcrypt.genSalt(10) // Création du salt random
        const hash = await bcrypt.hash(req.body.password, salt) // Chiffrement du password
        const useru = new User({
            USR_Mail: req.body.email,
            USR_Firstname: req.body.username,
            USR_Password: hash
        });
        User.updateById(req.params.userid, useru, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found User with id ${req.params.userid}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating User with id " + req.params.userid
                    });
                }
            } else {
                res.redirect("http://localhost:4200")
            }

        });
    };
}

exports.updateHouse = (req, res, next) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    User.updateHouse(req.params.userid, req.body.HSE_Id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found User with id ${req.params.userid}.`
                });
            } else {
                res.status(500).send({
                    message: "Error updating User with id " + req.params.userid
                });
            }
        } else {
            next()
        }

    });

}

// Delete a User with the specified userid in the request
exports.delete = (req, res) => {
    User.remove(req.params.userid, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found User with id ${req.params.userid}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete User with id " + req.params.userid
                });
            }
        } else res.send({ message: `User was deleted successfully!` });
    });
};


// Delete all User from the database.
exports.deleteAll = (req, res) => {
    User.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while removing all user."
            });
        else res.send({ message: `All User were deleted successfully!` });
    });
};