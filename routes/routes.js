const request = require('request');
const appRouter = function (app) {
    
    app.get('/', function (req, res) {
        // Location based upcoming cloud events within a 5 mile radius
        request.get('https://api.meetup.com/find/upcoming_events?photo-host=public&topic_category=cloud&page=10&sig_id=249656035&radius=5&sig=9fcba9f9ec0e223e4c754c29a498ff68fbca45b3', function(err, response, body) {

            if(err) {
                throw err;
            }
            if (response.statusCode !== 200) {
                console.error('request not OK');
                return;
            }
            const data = JSON.parse(body);

            var str = '<h1><b>Cloud Events</b></h1><br><br>';

            data.events.forEach(function (element) {
                str += `<h3><b>${element.group.urlname}</b>: 
                <a href=${element.link}>${element.name}</a></h3>`
                // + `<img src='${photoLink}' alt='text' width='350' height='190'>`
                + `<br><br><br>`;  
            });
            res.send(str);      
        });
    }); 
}

module.exports = appRouter;
