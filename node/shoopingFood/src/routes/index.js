module.exports = app => {
    const user = require("../controllers/userControllers"),
        room = require("../controllers/roomControllers"),
        product = require("../controllers/productControllers"),
        house = require("../controllers/houseControllers"),
        auth = require("../middlewares/auth"),
        login = require("../middlewares/login");

    // Create
    app.post("/house/:userid", house.create, user.updateHouse, user.findOneId, login.loginEZ);
    app.post("/houseJoin/:userid", house.findId, user.updateHouse, user.findOneId, login.loginEZ);
    app.post("/room", room.create);
    app.post("/product", product.create, room.findByName, product.findByName, room.addproduct);
    app.post("/user", auth.register, user.create);

    // login
    app.post("/log", login.login);

    // Retrieve all
    app.get("/house", house.findAll);
    app.get("/room", room.findAll);
    app.get("/product", product.findAll);
    app.get("/user", user.findAll);

    // Retrieve by id
    app.get("/room/:idRoom", room.findOne);
    app.get("/Myhome/:idhouse", room.getAllByHouse);
    app.get("/products/:idhouse", product.getAllByHouse);
    app.get("/product/:productid", product.findOne);
    app.get("/ProductTotal/:idRoom", product.findTotal);
    app.get("/productsRoom/:idRoom", product.getAllByRoom);
    app.get("/user/:userid", user.findOneId);

    app.get("/qty/:qty&:PDC_Id&:ROM_Id", product.updateQty);


    // Update
    app.put("/house/:idhouse", house.update);
    app.put("/room/:idRoom", room.update);
    app.put("/product/:idProducts", product.update);
    app.post("/user/:userid", auth.register, user.update, login.login);

    // Delete
    app.delete("/house/:idhouse", house.delete);
    app.delete("/room/:idRoom", room.delete);
    app.delete("/user/:userid", user.delete);

    app.delete("/product/:productid&:roomid", product.removeInRoom);

    // Delete all
    app.delete("/house", house.deleteAll);
    app.delete("/room", room.deleteAll);
    app.delete("/product", product.deleteAll);
    app.delete("/user", user.deleteAll);
};