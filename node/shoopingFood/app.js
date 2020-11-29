const dotenv = require('dotenv'),
    express = require("express"),
    bodyParser = require("body-parser"),
    app = express(),
    cookieParser = require('cookie-parser'),
    cors = require('cors'),
    jwt = require('jsonwebtoken');

require('dotenv').config();


//dotenv.config({ path: './.env'});

app.use(cors({
    origin: [
        "http://localhost:4200"
    ],
    credentials: true
}));

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    req.body;
    res.json({ message: "Welcome Zoubida" });
});

//parse cookie
app.use(cookieParser());

app.post("/", (req, res) => {
    req.body;
    res.json(req.body);
});

app.all("/*", function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});

app.get('/checktoken', function(req, res) {
    var token = req.header('token');
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
        if (!err) {
            res.send(true)
        } else {
            res.send(err.message);
        }
    })
})


require("./src/routes/index")(app);

// set port, listen for requests
app.listen(8001, () => {
    console.log("Server is running on port 8001.");
});