const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Redis = require("redis")
const redisClient = Redis.createClient({url:'redis://127.0.0.1:6379'});
const {createHash} = require('node:crypto');
const https = require('https')
const fs = require('fs');

const port = 3000;

https.createServer({
    key: fs.readFileSync('privkey1.pem'),
    cert: fs.readFileSync('cert1.pem'),
    chain: fs.readFileSync('fullchain1.pem')
  }, app).listen(3000, () => {
    redisClient.connect();
    console.log('Listening...')
  });
  
// app.listen(port, ()=> {
//     redisClient.connect(); //the API Sever is trying to connect with Redis
//     console.log("Listening on port: " + port)
// });

app.use(bodyParser.json()); //allow JSON (Javascript Object Notation) requests

app.get('/',(req,res) => {
    res.send("Welcome to Ryan's Node Server! :)")
    // res.redirect("http://google.com")
})

app.post("/login", async (req,res) => {
    const loginBody = req.body;
    const userName = loginBody.userName;
    const password = loginBody.password;
    const hashedPassword = passsword = null ? null: createHash('sha3-256').update(password).digest('hex');
    console.log("Hashed Password: " + hashedPassword);
    const redisPassword = passsword = null ? null: await redisClient.hGet('hashedpasswords',userName);
    console.log("Password for " + userName + " " + redisPassword);
    if (password != null && hashedPassword == redisPassword) {
        
        res.send("Welcome "+ userName);
    }
    else {
        res.status(401); //unathorized
        res.send("Incorrect Password");
    }
});