const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes.js');
const app = express();

var exphbs  = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/a', function (req, res) {
    res.render('home');
});

routes(app);

var server = app.listen(3000, function () {
    console.log('app running on port.', server.address().port);
});


