var models = require('./models');

models.Customer.find(function(err, customers){

    console.log(customers);

})