var faker = require("faker");
var request = require('request');
var appRouter = function (app) {

  app.get("/", function (req, res) {
 
    request.get('https://api.meetup.com/find/upcoming_events?photo-host=public&topic_category=cloud&page=10&sig_id=249656035&radius=5&sig=9fcba9f9ec0e223e4c754c29a498ff68fbca45b3', function(err, response, body) {

        if (!err && response.statusCode == 200) {
            
            var locals = JSON.parse(body);
            res.send(locals);
        }
    });
   });

}

module.exports = appRouter;