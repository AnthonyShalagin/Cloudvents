var faker = require("faker");
var request = require('request');
var appRouter = function (app) {

  app.get("/", function (req, res) {

 	// Location based upcoming cloud events within a 5 mile radius
    request.get('https://api.meetup.com/find/upcoming_events?photo-host=public&topic_category=cloud&page=10&sig_id=249656035&radius=5&sig=9fcba9f9ec0e223e4c754c29a498ff68fbca45b3', function(err, response, body) {

    	var str = "";
        
        if (!err && response.statusCode == 200) {
            var data = JSON.parse(body);

            for (var i = 0; i < data.events.length; i++) {
            	str += data.events[i].group.urlname + ": " + data.events[i].name;
            	str += " Summary: " + data.events[i].description.replace(/<[^>]+>/g, '');
            }
            res.send(str);
        }
    });
   });

}

module.exports = appRouter;