module.exports = function(server) {
  "use strict";
  const io = require("socket.io")({
    path: '/chat',
    serveClient: false,
    cookie: "chat",
    cookieHttpOnly: true
  });
  io.on("connection", function(socket) {
    socket.on("message", function(message) {
      socket.broadcast.emit("message", message);
    });
    socket.on("disconnect", function() {});
  });
  io.attach(server);
  return server;
}
