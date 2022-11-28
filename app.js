const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {});
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

let countUserOnline = 1;
io.on("connection", (socket) => {
  socket.on("join", (param) => {
    console.log("user join");
    countUserOnline++;
    io.emit("countUserOnline", countUserOnline);
  });
  socket.on("message", (param) => {
    console.log("user mengirim pesan");
    io.emit("message", param);
  });
  socket.on("disconnect", (param) => {
    console.log("user keluar");
    countUserOnline--;
    io.emit("countUserOnline", countUserOnline);
  });
});

server.listen(port, () => {
  console.log("listening on *:3000");
});
