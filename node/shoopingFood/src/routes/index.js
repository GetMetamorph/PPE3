module.exports = app => {
    const user = require("../controllers/userControllers"),
        room = require("../controllers/roomControllers"),
        product = require("../controllers/productControllers"),
        house = require("../controllers/houseControllers"),
        auth = require("../middlewares/auth"),
        login = require("../middlewares/login");

    // Create
    app.post("/house", house.create);
    app.post("/room", room.create);
    app.post("/product", product.create);
    app.post("/user", auth.register, user.create);

    // login
    app.post("/log", login.login);

    // Retrieve all
    app.get("/house", house.findAll);
    app.get("/room", room.findAll);
    app.get("/product", product.findAll);
    app.get("/user", user.findAll);

    // Retrieve by id
    app.get("/house/:idhouse", house.findOne);
    app.get("/room/:idRoom", room.findOne);
    app.get("/Myhome/:idhouse", room.getAllByHouse);
    app.get("/product/:idProducts", product.findOne);
    app.get("/user/:userid", user.findOneId);

    // Update
    app.put("/house/:idhouse", house.update);
    app.put("/room/:idRoom", room.update);
    app.put("/product/:idProducts", product.update);
    app.post("/user/:userid", auth.register, user.update, login.login);

    // Delete
    app.delete("/house/:idhouse", house.delete);
    app.delete("/room/:idRoom", room.delete);
    app.delete("/product/:idProducts", product.delete);
    app.delete("/user/:userid", user.delete);

    // Delete all
    app.delete("/house", house.deleteAll);
    app.delete("/room", room.deleteAll);
    app.delete("/product", product.deleteAll);
    app.delete("/user", user.deleteAll);
};