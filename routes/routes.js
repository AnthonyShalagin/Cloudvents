var faker = require("faker");
var request = require('request');
var appRouter = function (app) {

  app.get("/", function (req, res) {
    // res.status(200).send({ message: 'Welcome to our restful API' });
    request.get('http://api.meetup.com/2/cities', function(err, response, body) {
        if (!err && response.statusCode == 200) {
            var locals = JSON.parse(body);
            res.send(locals);
        }
    });
  });
}

module.exports = appRouter;