const Product = require("../models/productModels");

// Create and Save a new Product
exports.create = (req, res, next) => {
    console.log(req.body)
        // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Product
    const product = new Product({
        PDC_Name: req.body.PDC_Name,
        PDC_Price: req.body.PDC_Price,
        PDC_Description: req.body.PDC_Description,
        PDC_Link: req.body.PDC_Link

    });

    // Save Product in the database
    Product.create(product, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Product."
            });
        else {
            req.body.PDC_Name = data.PDC_Name
            next()
        }
    });
};
exports.findByName = (req, res, next) => {
    Product.findByName(req.body.PDC_Name, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Room with id .`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Room with id "
                });
            }
        } else {
            req.body.PDC_Id = data.PDC_Id
            next()
        }
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

// Find a single Product with a productid
exports.findOne = (req, res) => {
    Product.findById(req.params.productid, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Product with id ${req.params.productid}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Product with id " + req.params.productid
                });
            }
        } else res.send(data);
    });
};

exports.findTotal = (req, res) => {
    Product.findTotalById(req.params.productid, req.params.idRoom, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Product with id ${req.params.productid}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Product with id " + req.params.productid
                });
            }
        } else res.send(data);
    });
};

exports.getAllByHouse = (req, res) => {
    Product.getAllByHouse(req.params.idhouse, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving room."
            });
        else res.send(data);
    });
};

exports.getAllByRoom = (req, res) => {
    Product.getAllByRoom(req.params.idRoom, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving room."
            });
        else res.send(data);
    });
};

// Update a Product identified by the productid in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Product.updateById(
        req.params.productid,
        new Product(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Product with id ${req.params.productid}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Product with id " + req.params.productid
                    });
                }
            } else res.send(data);
        }
    );
};

exports.updateQty = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Product.updateQty(req.params.qty, req.params.PDC_Id, req.params.ROM_Id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Product with id.`
                });
            } else {
                res.status(500).send({
                    message: "Error updating Product with id "
                });
            }
        } else res.send(data);
    });
};

// Delete a Product with the specified productid in the request
exports.delete = (req, res) => {
    Product.remove(req.params.productid, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Product with id ${req.params.productid}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Product with id " + req.params.productid
                });
            }
        } else res.send({ message: `Product was deleted successfully!` });
    });
};
exports.removeInRoom = (req, res) => {
    Product.removeInRoom(req.params.productid, req.params.roomid, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Product with id ${req.params.productid}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Product with id " + req.params.productid
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