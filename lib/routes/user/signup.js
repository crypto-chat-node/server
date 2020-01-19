module.exports = function(request, response, next) {
  "use strict";
  response.render("signup", function(error, html) {
    if (error) return next(error);
    response.send(html);
    next();
  });
};

module.exports.post = function(request, response, next) {
  "use strict";
};
