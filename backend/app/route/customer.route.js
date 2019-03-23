module.exports = function(app) {
 
    const customers = require('../controller/customer.controller.js');
 
    // Create a new Customer
    app.post('/api/customers', customers.search);
 
    // Retrieve all Customer
    app.get('/api/customers', customers.findAll);
    app.post('/api/customers/addBorrower', customers.addBorrower);
    app.post('/api/customers/addCustomer', customers.addCustomer);
    app.post('/api/customers/checkinBook', customers.checkinBook);
    app.get('/api/customers/refreshFines', customers.refreshFines);
    app.post('/api/customers/getFineList', customers.getFineList);
    app.post('/api/customers/payFine', customers.payFine);

    
    
    // Retrieve a single Customer by Id
    app.get('/api/customers/:customerId', customers.findById);
 
    // Update a Customer with Id
    app.put('/api/customers', customers.update);
 
    // Delete a Customer with Id
    app.delete('/api/customers/:customerId', customers.delete);
}