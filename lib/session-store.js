module.exports = function(session, options) {
  "use strict";
  const MongoStore = require("connect-mongo")(session);
  return new MongoStore(options);
};
