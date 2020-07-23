const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const url = "mongodb://localhost/condorDB";

const app = express();

var server = require("http").createServer(app);
var io = require("socket.io")(server, { origins: "*:*" });

//models
const User = require("./models/user");
const Room = require("./models/room");
const historyChat = require("./models/history");

const cors = require("cors");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var arr = [
  {
    name: "Andres Lopez Restrepo",
    username: "andres",
    password: "123",
    id: "1",
    image: "https://bootdey.com/img/Content/user_1.jpg",
  },
  {
    name: "Pedro Palacio Puerta",
    username: "pedro",
    password: "456",
    id: "2",
    image: "https://www.bootdey.com/img/Content/user_3.jpg",
  },
  {
    name: "Juan Andres Perez",
    username: "juan",
    password: "789",
    id: "3",
    image: "https://www.bootdey.com/img/Content/user_6.jpg",
  },
  {
    name: "Monica Masso U",
    username: "monica",
    password: "321",
    id: "4",
    image: "https://www.bootdey.com/img/Content/user_2.jpg",
  },
];
var arrRooms = [{ name: "Software" }, { name: "Admin" }];

mongoose.connect(url, { useNewUrlParser: true }, function (err) {
  if (err) throw err;

  User.insertMany(arr, function (error, result) {
    console.log(error);
  });

  Room.insertMany(arrRooms, function (error, result) {
    console.log(error);
  });
});

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

app.get("/api/room", (req, res) => {
  mongoose.connect(url, { useNewUrlParser: true }, function (err) {
    if (err) throw err;
    Room.find().exec(function (err, response) {
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

app.get("/api/user/:id", (req, res) => {
  mongoose.connect(url, { useNewUrlParser: true }, function (err) {
    if (err) throw err;
    var id = req.params.id;
    User.find({ id: id }).exec(function (err, response) {
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

app.put("/api/user/:id", (req, res) => {
  mongoose.connect(url, { useNewUrlParser: true }, function (err) {
    if (err) throw err;
    var id = req.params.id;
    var user = req.body.user;
    User.updateOne({ id: id }, { $set: { image: user.image } }).exec(function (
      err,
      response
    ) {
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

app.put("/api/chat/:id", (req, res) => {
  mongoose.connect(url, { useNewUrlParser: true }, function (err) {
    if (err) throw err;
    var id = req.params.id;
    var history = req.body;
    console.log(history);
    historyChat
      .update(
        { id: id },
        { id: id, history: history.messages },
        { upsert: true }
      )
      .exec(function (err, response) {
        console.log(err);
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

app.get("/api/chat/:id", (req, res) => {
  mongoose.connect(url, { useNewUrlParser: true }, function (err) {
    if (err) throw err;
    var id = req.params.id;
    historyChat.find({ id: id }).exec(function (err, response) {
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
    socket.join(username);
  });

  socket.on("message", (message) => {
    io.emit("message", message);
  });

  socket.on("chatMessage", (msg) => {
    io.to(msg.room).emit("message", msg);
  });
});

server.listen(3000, () => console.log("Server running on port 3000!"));
