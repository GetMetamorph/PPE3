const Product = require("../models/productModels");

// Create and Save a new Product
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Product
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        Description: req.body.Description,
        Amazonlink: req.body.Amazonlink

    });

    // Save Product in the database
    Product.create(product, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Product."
            });
        else res.send(data);
    });
};

// Retrieve all Product from the database.
exports.findAll = (req, res) => {
    Product.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving product."
            });
        else res.send(data);
    });
};

// Find a single Product with a idproduct
exports.findOne = (req, res) => {
    Product.findById(req.params.idproduct, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Product with id ${req.params.idproduct}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Product with id " + req.params.idproduct
                });
            }
        } else res.send(data);
    });
};

// Update a Product identified by the idproduct in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Product.updateById(
        req.params.idproduct,
        new Product(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Product with id ${req.params.idproduct}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Product with id " + req.params.idproduct
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Product with the specified idproduct in the request
exports.delete = (req, res) => {
    Product.remove(req.params.idproduct, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Product with id ${req.params.idproduct}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Product with id " + req.params.idproduct
                });
            }
        } else res.send({ message: `Product was deleted successfully!` });
    });
};

// Delete all Product from the database.
exports.deleteAll = (req, res) => {
    Product.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while removing all product."
            });
        else res.send({ message: `All Product were deleted successfully!` });
    });
};