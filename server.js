const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Redis = require("redis")
const redisClient = Redis.createClient({
host: 'redis-stedi-ryan',
port: 6379
});
const {createHash} = require('node:crypto');
const https = require('https');
const fs = require('fs');

const port = 3000;

// https.createServer({
//     key: fs.readFileSync('/etc/letsencrypt/archive/ryanwalker.cit270.com/privkey1.pem'),
//     cert: fs.readFileSync('/etc/letsencrypt/archive/ryanwalker.cit270.com/cert1.pem'),
//     ca: fs.readFileSync('/etc/letsencrypt/archive/ryanwalker.cit270.com/chain1.pem')
//   }, app).listen(port, () => {
//     redisClient.connect();
//     console.log('Listening...')
//   });

redisClient.on("connect", () => {
    console.log("Connected to Redis server");
    startServer();
  });
  
  redisClient.on("error", (err) => {
    console.log("Redis Server Error", err);
  });
  
async function startServer() {
  app.use(bodyParser.json()); // Allow JSON (Javascript Object Notation) requests

  app.get("/", (req, res) => {
    res.send("Welcome to Ryan's Node Server!");
  });

app.use(bodyParser.json()); //allow JSON (Javascript Object Notation) requests

app.get('/',(req,res) => {
    res.send("Welcome to Ryan's Node Server!")
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
    app.listen(port, () => {
        console.log("Listening on port: " + port);
      });
}