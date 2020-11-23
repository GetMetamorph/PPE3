const express = require("express"),
    bodyParser = require("body-parser"),
    session = require('express-session'),
    app = express(),
    cors = require('cors');


app.use(cors({
    origin: [
        "http://localhost:4200"
    ],
    credentials: true
}));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
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

app.post("/", (req, res) => {
    req.body;
    res.json(req.body);
});

app.get('/home', function(req, res) {
    if (req.session.loggedin) {
        res.send('Welcome back, ' + request.session.username + '!');
    } else {
        res.redirect('https://localhost:4200/login');
    }
    res.end();
});

require("./src/routes/index")(app);

// set port, listen for requests
app.listen(8001, () => {
    console.log("Server is running on port 8001.");
});