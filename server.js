// Setup basic express server
var express = require("express");
var app = express();
var server = require("http").createServer(app);
var options = {
  cors: true,
};

var io = require("socket.io")(server, options);
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/src"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/src/pages/ambi_puzzle.html");
});

app.get("/ori", function (req, res) {
  res.sendFile(__dirname + "/src/pages/orient_puzzle.html");
});

app.get("/blowme", function (req, res) {
  res.sendFile(__dirname + "/src/pages/blow_puzzle.html");
});

app.get("/complete", function (req, res) {
  res.sendFile(__dirname + "/src/pages/puzzles_complete.html");
});

io.sockets.on("connection", function (socket) {
  socket.on("ambi_data", function (message) {
    console.log(message);
    io.emit("ambi_data", message);
  });

  socket.on("ambi_solution", function (message) {
    io.emit("ambi_solution", message);
  });

  socket.on("gyro_data", function (message) {
    io.emit("gyro_data", message);
  });

  socket.on("gyro_solution", function (message) {
    io.emit("gyro_solution", message);
  });

  socket.on("blow_data", function (message) {
    io.emit("blow_data", message);
  });

  socket.on("blow_solution", function (message) {
    io.emit("blow_solution", message);
  });
});

console.log("Server started.");
server.listen(port, function () {
  console.log("Server listening at port %d", port);
});
