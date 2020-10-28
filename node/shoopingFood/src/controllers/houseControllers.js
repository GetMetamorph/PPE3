const House = require("../models/houseModels");

// Create and Save a new House
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a House
    const house = new House({
        name: req.body.name,
        adresse: req.body.adresse
    });

    // Save House in the database
    House.create(house, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the House."
            });
        else res.send(data);
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

// Find a single House with a idhouse
exports.findOne = (req, res) => {
    House.findById(req.params.idhouse, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found House with id ${req.params.idhouse}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving House with id " + req.params.idhouse
                });
            }
        } else res.send(data);
    });
};

// Update a House identified by the idhouse in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    House.updateById(
        req.params.idhouse,
        new House(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found House with id ${req.params.idhouse}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating House with id " + req.params.idhouse
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a House with the specified idhouse in the request
exports.delete = (req, res) => {
    House.remove(req.params.idhouse, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found House with id ${req.params.idhouse}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete House with id " + req.params.idhouse
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