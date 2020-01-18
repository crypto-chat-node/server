module.exports = function() {
  return function(request, response, next) {
    console.log(request);
    response.send("hello world");
    next();
  };
};
