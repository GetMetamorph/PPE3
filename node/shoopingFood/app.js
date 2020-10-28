const express = require("express"),
    bodyParser = require("body-parser"),
    app = express();


// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    req.body;
    res.json({ message: "Welcome Zoubida" });
});

app.post("/", (req, res) => {
    req.body;
    res.json(req.body);
});

require("./src/routes/index")(app);

// set port, listen for requests
app.listen(8001, () => {
    console.log("Server is running on port 8001.");
});