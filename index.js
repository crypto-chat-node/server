"use strict";
// Load Enviorment Config
require("dotenv").config({
  path: require("path").join(__dirname, ".env")
});
// Load required modules
const path = require("path");
const express = require("express");
const fs = require("fs");
const routes = require("./lib/routes/index.js");
const authHandler = require("./lib/auth-middleware");
const errorHandler = require("./lib/app-errorhandler.js");

// Set HTTPS Options
const httpsOptions = {
  key: fs.readFileSync(process.env.KEY_FILE, "utf-8"),
  cert: fs.readFileSync(process.env.CERT_FILE, "utf-8"),
  ca: fs.readFileSync(process.env.CA_FILE, "utf-8")
};

// Set authHandlerOptions
const authHandlerOptions = {};

// Get Auth Function
const authFunction = authHandler(authHandlerOptions);

// Initialize App
const app = express();

// Create Webservers
const httpServer = require("http").createServer(app);
const server = require("https").createServer(httpsOptions, app);

// Webserver Config
require("./lib/app-settings.js")(app);
require("./lib/app-middleware.js")(app);

// Static Resource Serving
app.use("/jquery", express.static(path.join(__dirname, "node_modules/jquery/dist")));
app.use("/bootstrap", express.static(path.join(__dirname, "node_modules/bootstrap/dist")));
app.use("/popper.js", express.static(path.join(__dirname, "node_modules/popper.js/dist")));

// Routing
app.get("/", routes.main.index);
app.get("/about", routes.main.about);
app.get("/signin", routes.user.signin);
app.post("/signin", routes.user.signin.post);
app.get("/signup", routes.user.signup);
app.post("/signup", routes.user.signup.post)

app.get("/profile", authFunction, routes.user.profile);
app.post("/profile", authFunction, routes.user.profile.post);
app.get("/settings", authFunction, routes.user.settings);
app.post("/settings", authFunction, routes.user.settings.post);
app.get("/chats", authFunction, routes.chat.chats);
app.post("/chats/new", authFunction, routes.chat.new);


// Error Handling Routes
app.use(errorHandler.notFound);
app.use(errorHandler.serverError);

// Socket.IO Config
require("./lib/socket.js")(server);

// Listen on port
const port = process.env.PORT || 443;
server.listen(port, function() {
  console.log(`Server listening on ${port}`);
});
const httpPort = process.env.HTTP_PORT || 80;
httpServer.listen(httpPort, function() {
  console.log(`Server listening on ${httpPort}`);
});
