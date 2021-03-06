const Room = require("../models/roomModels");

// Create and Save a new Room
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Room
    const room = new Room({
        name: req.body.room_name,
        houseid: req.body.HSE_Id,
        category: req.body.room_category
    });

    // Save Room in the database
    Room.create(room, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Room."
            });
        else res.redirect('http://localhost:4200/myhome');
    });
};

// Retrieve all Room from the database.
exports.findAll = (req, res) => {
    Room.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving room."
            });
        else res.send(data);
    });
};
exports.addproduct = (req, res) => {
    console.log(req.body)
    Room.addproduct(req.body.PDC_Id, req.body.STK_Qty, req.body.ROM_Id, req.body.HSE_Id, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving room."
            });
        else {
            res.redirect('http://localhost:4200/inventory');
        }
    });
};
exports.getAllByHouse = (req, res) => {
    Room.getAllByHouse(req.params.idhouse, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving room."
            });
        else res.send(data);
    });
};

// Find a single Room with a roomid
exports.findOne = (req, res) => {
    Room.findById(req.params.idRoom, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Room with id ${req.params.roomid}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Room with id " + req.params.roomid
                });
            }
        } else res.send(data);
    });
};

exports.findByName = (req, res, next) => {
    Room.findByName(req.body.room, (err, data) => {
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
            req.body.ROM_Id = data.ROM_Id
            req.body.HSE_Id = data.HSE_Id
            next()
        }
    });
};


// Update a Room identified by the roomid in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Room.updateById(
        req.params.roomid,
        new Room(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Room with id ${req.params.roomid}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Room with id " + req.params.roomid
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Room with the specified roomid in the request
exports.delete = (req, res) => {
    Room.remove(req.params.idRoom, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Room with id ${req.params.roomid}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Room with id " + req.params.roomid
                });
            }
        } else res.send({ message: `Room was deleted successfully!` });
    });
};

// Delete all Room from the database.
exports.deleteAll = (req, res) => {
    Room.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while removing all room."
            });
        else res.send({ message: `All Room were deleted successfully!` });
    });
};