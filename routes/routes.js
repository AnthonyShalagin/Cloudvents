const request = require('request');
const appRouter = function (app) {

  app.get('/', function (req, res) {

 	// Location based upcoming cloud events within a 5 mile radius
    request.get('https://api.meetup.com/find/upcoming_events?photo-host=public&topic_category=cloud&page=10&sig_id=249656035&radius=5&sig=9fcba9f9ec0e223e4c754c29a498ff68fbca45b3', function(err, response, body) {

    	var str = '<h1><b>Cloud Events</b></h1><br><br>';        

        if (!err && response.statusCode == 200) {
            const data = JSON.parse(body);

            var photoLink = "";

            for (var i = 0; i < data.events.length; i++) {

                getPhotoLink(data, function(photoLink) {
                    console.log("photo link: " + photoLink);
                });

                str += `<h3><b>${data.events[i].group.urlname}</b>: 
                    <a href=${data.events[i].link}>${data.events[i].name}</a></h3>`
                    + `<img src=${photoLink}' alt='text' width='350px' height='190px'>`
                    + `<br><br><br>`;
            }
            res.send(str);
        }
    });

    function getPhotoLink (data, callback) {
            request.get(`https://api.meetup.com/${data.events[0].group.urlname}/photos?photo-host=public&page=1&sig_id=249656035&sig=d45dfd97d66d7cb1a5418f042363258386e3df15`, function(err, response, body) {

                if (!err && response.statusCode == 200) {
                    const photoURL = JSON.parse(body);

                    callback(photoURL[0].highres_link);
                }
            });
    }
  }); 
};

module.exports = appRouter;
