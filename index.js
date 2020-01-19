require("dotenv").config();
const express = require("express");
const app = express();
const fs = require("fs");
const httpsOptions = {
  key: fs.readFileSync(process.env.KEY_FILE, "utf-8"),
  cert: fs.readFileSync(process.env.CERT_FILE, "utf-8"),
  ca: fs.readFileSync(process.env.CA_FILE, "utf-8")
};
const httpServer = require("http").createServer(app);
const server = require("https").createServer(httpsOptions, app);

// Webserver Config
const routes = require("./lib/routes/index.js");
const errorHandler = require("./lib/app-errorhandler.js");
require("./lib/app-settings.js")(app);
require("./lib/app-middleware.js")(app);
// Routing
app.get("/", routes.main.index);

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
