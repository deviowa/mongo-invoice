var models = require('./models');
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();
// configure middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('public'));

app.set('views', './views');
app.set('view engine', 'jade');


app.get('/api/customers', function(req, res){
    var q = models.Customer.find().limit(50);
    q.exec(function(err, results){
        res.json(results);
    })
});

app.get('/api/customers/:id', function(req, res){
    models.Customer.findOne({_id: req.params.id}, function(err, c){
        res.json(c);
    });

})

app.post('/api/customers', function(req, res){

    var newCustomer = new models.Customer({
        name:  req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: {
            street: req.body.address.street,
            city: req.body.address.city,
            zip: req.body.address.zip,
            state: req.body.address.state
        },
    });

    newCustomer.save(function(err, customer){
        res.json({
            error: err,
            data: customer
        });
    })

})





app.get('/', function(req, res){

var q = models.Customer.find().limit(50);
    q.exec(function(err, results){
        res.render('index', { customers: results});
    })
})


app.get('/customer/:id', function(req, res){

    models.Customer.findOne({_id: req.params.id}, function(err, customer){
        res.render('customer', {customer: customer});
    });

})





app.listen(3000);