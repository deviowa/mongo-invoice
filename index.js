var models = require('./models');





//get Customer with name "thomas"
models.Customer.findOne({"name": "Thomas"}, function(err, customer){
    //customer is the Customer instance we found
    console.log(customer);

    // create an invoice,
    // add it to the customers invoices,
    // save the customer
    // when saved, do: process.exit();

});



