

var mongoose = require('mongoose');

mongoose.connect('mongodb://admin:iowa@ds039880.mongolab.com:39880/invoices');


var InvoiceSchema = mongoose.Schema({
    id: String,
    date: {type: Date, index: true, default: Date.now },
    dueDate: {type: Date, index: true, default: Date.now },
    items: [{
        title: String,
        detail: String,
        amount: Number
    }]
});

var CustomerSchema = mongoose.Schema({
    name:  {type: String, index: true },
    email: String,
    phone: String,
    address: {
        street: String,
        city: String,
        zip: String,
        state: String
    },
    invoices: [InvoiceSchema]
});

CustomerSchema.methods.sendInvoice = function(invoice, cb){
    this.invoices.push(invoice);
    this.save(cb);
}


var Invoice = mongoose.model('Invoice', InvoiceSchema);

var Customer = mongoose.model('Customer', CustomerSchema);


module.exports.Invoice = Invoice;
module.exports.Customer = Customer;

