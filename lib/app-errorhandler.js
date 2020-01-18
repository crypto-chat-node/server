module.exports.notFound = function(request, response, next) {
  response.render("404", {
    request: request
  }, function(err, html) {
    if (err) next(err);
    else response.send(html);
  });
};

module.exports.serverError = function(error, request, response, next) {
  response.render("error", {
    error: error
  }, function(err, html) {
    if (err) throw err;
    else response.send(html);
  });
};
