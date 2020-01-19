module.exports = function(request, response, next) {
  "use strict";
  response.render("signin", function(error, html) {
    if (error) return next(error);
    response.send(html);
  });
};

module.exports.post = function(request, response, next) {
  "use strict";
};
