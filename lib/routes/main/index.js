module.exports = function(request, response, next) {
  console.log(request);
  response.render("index", function(error, html) {
    if (error) return next(error);
    response.send(html);
    next();
  });
};
