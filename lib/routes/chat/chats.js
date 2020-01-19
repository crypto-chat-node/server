module.exports = function(request, response, next) {
  "use strict";
  response.render("index", function(error, html) {
    if (error) return next(error);
    response.send(html);
  });
};
