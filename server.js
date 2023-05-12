const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Redis = require("redis")
const redisClient = Redis.createClient();

const port = 3000;
app.listen(port, ()=> {
    redisClient.connect();
    console.log("Listening on port: " + port)
});

app.use(bodyParser.json());

app.get('/',(req,res) => {
    res.send("Welcome to Ryan's Node Server! :)")
    // res.redirect("http://google.com")
})

app.post("/login", (req,res) => {
    const loginBody = req.body;
    const userName = loginBody.userName;
    const password = loginBody.password;
    if (password === "P@ssw0r") {
        res.send("welcome "+ userName);
    }
    else {
        res.status(401); //unathorized
        res.send("Incorrect Password");
    }
});