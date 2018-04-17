var faker = require("faker");
var request = require('request');
var appRouter = function (app) {

  app.get("/", function (req, res) {
    // res.status(200).send({ message: 'Welcome to our restful API' });

    // TODO Need to validate credentials
    // {"errors":[{"code":"auth_fail","message":"Invalid csrf credentials"}]}

    request.get('https://api.meetup.com/find/upcoming_events?&sign=true&photo-host=public&topic_category=cloud&page=20&radius=5', function(err, response, body) {
        if (!err && response.statusCode == 200) {
            
            var locals = JSON.parse(body);

            res.send(locals.results);
        }
    });
  });



}

module.exports = appRouter;



// {"results":[
//   {"zip":"10001","country":"us","localized_country_name":"USA",
//     "distance":2.1302233453677863,"city":"New York","lon":-73.98999786376953,
//       "ranking":0,"id":10001,"state":"NY","member_count":229371,"lat":40.75},
//   {"zip":"11201","country":"us","localized_country_name":"USA",
//     "distance":1.6799160455778919,"city":"Brooklyn","lon":-73.98999786376953,"ranking":1,"id":11201,"state":"NY","member_count":40247,"lat":40.70000076293945},{"zip":"10451","country":"us","localized_country_name":"USA","distance":8.140614969846794,"city":"Bronx","lon":-73.91999816894531,"ranking":2,"id":10451,"state":"NY","member_count":8067,"lat":40.81999969482422},