const House = require("../models/houseModels");
// Create and Save a new House
exports.create = (req, res, next) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a House
    const house = new House({
        HSE_Name: req.body.HSE_Name,
        HSE_Address: req.body.HSE_Address
    });

    // Save House in the database
    House.create(house, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the House."
            });
        else {
            req.body.HSE_Id = data.id
            next()
        }
    });
};

// Retrieve all House from the database.
exports.findAll = (req, res) => {
    House.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving house."
            });
        else res.send(data);
    });
};

// Find a single House with a houseid
exports.findId = (req, res, next) => {
    House.findId(req.body.HSE_Name, req.body.HSE_Address, (err, data) => {
        console.log(data)
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found House with id.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving House with id "
                });
            }
        } else {
            req.body.HSE_Id = data.HSE_Id
            next()
        }
    });
};


// Update a House identified by the houseid in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    House.updateById(
        req.params.houseid,
        new House(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found House with id ${req.params.houseid}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating House with id " + req.params.houseid
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a House with the specified houseid in the request
exports.delete = (req, res) => {
    House.remove(req.params.houseid, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found House with id ${req.params.houseid}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete House with id " + req.params.houseid
                });
            }
        } else res.send({ message: `House was deleted successfully!` });
    });
};

// Delete all House from the database.
exports.deleteAll = (req, res) => {
    House.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while removing all house."
            });
        else res.send({ message: `All House were deleted successfully!` });
    });
};