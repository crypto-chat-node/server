module.exports = function(session, options) {
  const MongoStore = require("connect-mongo")(session);
  return new MongoStore(options);
};
