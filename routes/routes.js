const request = require('request');
const appRouter = function (app) {

  app.get('/', function (req, res) {

 	// Location based upcoming cloud events within a 5 mile radius
    request.get('https://api.meetup.com/find/upcoming_events?photo-host=public&topic_category=cloud&page=10&sig_id=249656035&radius=5&sig=9fcba9f9ec0e223e4c754c29a498ff68fbca45b3', function(err, response, body) {

    	var str = '<h1><b>Cloud Events</b></h1><br><br>';        

        if (!err && response.statusCode == 200) {
            const data = JSON.parse(body);

            for (var i = 0; i < data.events.length; i++) {
            	str += `${'<h3>' + '<b>'}${  data.events[i].group.urlname  }</b>: ${
                     data.events[i].name  }</h3>`
                    + `<img src='https://blog.ipleaders.in/wp-content/uploads/2016/01/601px-Temporary_plate.svg_.png' alt='text' width='350px' height='190px'>`
                    + `<br><br><br>`;
            }

            // res.send(str);

            res.send(data);
        }

            //TODO: Add summary
    });
   });
  
};

module.exports = appRouter;
