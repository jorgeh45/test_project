var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    cors = require('cors');

var config = require('./config/config'); 


var db = mongoose.connect(config.database);

/*MODELS */
var contact = require('./models/contact');

var app = express();
app.use(morgan('dev'));
app.use(cors())


var port = process.env.port || 3000;

app.use(bodyParser.urlencoded({ extended: true}));
// app.use(bodyParser.json());


app.use(bodyParser.json());




var baseController = require('./controllers/baseController');

app.use('/api/contacts', baseController(contact));


app.use('/', function(req, res) {

    res.send('Welcome to the Contacts APP API');
});



app.listen(port, function() {
    console.log('Listening on port ' + port);
});