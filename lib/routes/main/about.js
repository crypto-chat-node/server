module.exports = function(request, response, next) {
  "use strict";
  response.render("about", function(error, html) {
    if (error) return next(error);
    response.send(html);
    next();
  });
};
