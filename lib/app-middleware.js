const bodyParser = require('body-parser');
const session = require("express-session");
module.exports = function(app) {
  "use strict";
  app.use(require("helmet")());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  const mongoOptions = {
    url: process.env.DB_URL
  };
  app.use(session({
    cookie: {
      httpOnly: true,
      maxAge: 300000,
      path: '/',
      sameSite: true,
      secure: true
    },
    name: "sessionId",
    proxy: undefined,
    resave: false,
    rolling: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    store: require("./session-store.js")(session, mongoOptions),
    unset: "keep"
  }));
  if (process.env.NODE_ENV === "production") {
    app.use(require("compression")());
  };
  return app;
};
