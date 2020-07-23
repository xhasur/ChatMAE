const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const url = "mongodb://localhost/condorDB";

const app = express();

var server = require("http").createServer(app);
var io = require("socket.io")(server, { origins: "*:*" });

//models
const User = require("./models/user");

const cors = require("cors");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Api

app.post("/api/user/login", (req, res) => {
  mongoose.connect(url, { useNewUrlParser: true }, function (err) {
    if (err) throw err;
    User.find(
      {
        username: req.body.username,
        password: req.body.password,
      },
      function (err, user) {
        if (err) throw err;
        if (user.length === 1) {
          return res.status(200).json({
            status: "success",
            data: user,
          });
        } else {
          return res.status(200).json({
            status: "fail",
            message: "Login Failed",
          });
        }
      }
    );
  });
});

app.get("/api/user/login", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/user", (req, res) => {
  mongoose.connect(url, { useNewUrlParser: true }, function (err) {
    if (err) throw err;
    User.find().exec(function (err, response) {
      if (err) {
        return res.status(500).jsonp({
          err: err,
        });
      }
      return res.status(200).jsonp({
        result: response,
      });
    });
  });
});

// socket io
io.on("connection", function (socket) {
  socket.on("joinRoom", function (username) {
    console.log("joinRoom", username);
    socket.join(username);
  });

  socket.on("message", (message) => {
    io.emit("message", message);
  });

  socket.on("chatMessage", (msg) => {
    console.log("msg", msg.msg);
    console.log("room", msg.room);
    io.to(msg.room).emit("message", msg);
  });
});

server.listen(3000, () => console.log("Server running on port 3000!"));
