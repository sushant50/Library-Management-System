const db = require('../config/db.config.js');
const Customer = db.customers;
const Book = db.book;
const Author = db.author;
const Book_Author = db.book_author;

// Post a Customer
exports.search = (req, res) => {	
	let book = req.body;
	db.sequelize.query(`select * from (select b.isbn "Isbn", b.title "Title", a.name "Name"
	from books b, book_authors ba, authors a
	where b.isbn = ba.isbn  and ba.author_id = a.author_id and b.isbn like '%${book.isbn}%' 
	 and b.title like '%${book.title }%' and
	a.name like '%${book.author}%') as temp left join  book_loans on temp.isbn = book_loans.isbn and book_loans.date_in is null  `, 
	{ 
		type: db.sequelize.QueryTypes.SELECT 
	})
	.then(function(rows){
		let data = rows;
		res.json(rows)
	});
};

exports.refreshFines = (req, res) => {	
	var date = new Date()	
	date = getSqlDate(date.toLocaleDateString().split('/'));


	db.sequelize.query(`select loan_id, isbn, card_id, date_out, due_date, date_in from  book_loans
	where (date_in is null and  DATEDIFF('${date}', due_date)>=1) or DATEDIFF(date_in, due_date)>=1`, 
	{ 
		type: db.sequelize.QueryTypes.SELECT 
	})
	.then(function(rows){
		let data = rows;
		console.log(data, data.length)
		for(let i in data) {
			console.log(i)
			db.sequelize.query(
			`UPDATE fines SET fine_amt = DATEDIFF('${date}', '${data[i].due_date}')*0.25 where fines.loan_id = '${data[i].loan_id}'`, 
			{ 
				type: db.sequelize.QueryTypes.INSERT 
			})
		}
		res.status(200).json({msg:"sucesss"});

	});
};

exports.getFineList = (req, res) => {	
	let borrower = req.body;
	db.sequelize.query(
	`select f.loan_id "Id", f.fine_amt "amount", bl.isbn "isbn" from fines f, book_loans bl
	where f.loan_id = bl.loan_id  and bl.card_id = '${borrower.borrower}' and f.paid=0 and f.fine_amt>'0' and bl.date_in is not null`, 
	{ 
		type: db.sequelize.QueryTypes.SELECT 
	})
	.then(function(rows){
		let data = rows;
		res.json(rows)
	});
};

exports.payFine = (req, res) => {	
	let borrower = req.body;
	console.log(borrower)
	db.sequelize.query(
	`UPDATE fines SET paid = 1 where fines.loan_id = '${borrower.Id}'`, 
	{ 
		type: db.sequelize.QueryTypes.INSERT 
	})
	.then(function(rows){
		let data = rows;
		res.json(rows)
	});
};







exports.checkinBook = (req, res) => {
	let book = req.body;
	var date = new Date()	
	console.log(book);
	date = getSqlDate(date.toLocaleDateString().split('/'));
	db.sequelize.query(`UPDATE book_loans SET date_in = '${date}' where book_loans.isbn = '${book.isbn}' and book_loans.date_in is null;`,
	{ 
		type: db.sequelize.QueryTypes.INSERT 
	})
	.then((row) => {
		res.status(200).json({msg:"sucesss"});
	});
}

exports.addBorrower = (req, res) => {	
	let book = req.body;
	var date = new Date()	
	var due_date = new Date();
	due_date.setDate(due_date.getDate() + 14);
	due_date = getSqlDate(due_date.toLocaleDateString().split('/'));
	date = getSqlDate(date.toLocaleDateString().split('/'));
	let isbn = book.isbn.toString()
	let id = new Date().getTime().toString().slice(0,10)
	db.sequelize.query(`SELECT COUNT(*) as count from book_loans where book_loans.card_id = ${book.card_id} and book_loans.date_in is null `,
	{ 
		type: db.sequelize.QueryTypes.SELECT 
	})
	.then((row) => {
		if(row[0].count<3) {
			db.sequelize.query(`INSERT INTO book_loans (loan_id,isbn, card_id, date_out, due_date)
			VALUES (${id} ,'${isbn}', ${book.card_id }, '${date}', '${due_date}');`,
			{ 
				type: db.sequelize.QueryTypes.INSERT 
			})
			.then((row) => {
				db.sequelize.query(`INSERT INTO fines (loan_id,fine_amt, paid)
				VALUES (${id} ,'0', '0');`,
				{ 
					type: db.sequelize.QueryTypes.INSERT 
				})
				.then((row) => {
					res.status(200).json({msg:"sucesss"});
				});
			});
		}
		else {
			res.status(200).json({msg:"error"});
		}
	});
};

exports.addCustomer = (req, res) => {	
	// Save to MySQL database
	let book = req.body;
	var date = new Date()
	db.sequelize.query(`INSERT INTO borrower (Ssn,Bname, Address, Phone)
	VALUES ('${book.ssn}' ,'${book.firstname}', '${book.address }', '${book.phone}');`,
	{ 
		type: db.sequelize.QueryTypes.INSERT
	})
	.then((row) => {
		res.status(200).json({msg:"sucesss"});
	});
}


getSqlDate = (arr)=>{
	if (arr[0].length < 2) arr[0] = '0' + arr[0];
	if (arr[1].length < 2) arr[1] = '0' + arr[1];
	let temp2 = arr.pop();
	arr.unshift(temp2)
	return arr.join('-')
}
 
 
// Fetch all Customers
exports.findAll = (req, res) => {
	Customer.findAll().then(customers => {
	  // Send all customers to Client
	  res.json(customers);
	});
};

// Find a Customer by Id
exports.findById = (req, res) => {	
	Customer.findById(req.params.customerId).then(customer => {
		res.json(customer);
	})
};
 
// Update a Customer
exports.update = (req, res) => {
	let customer = req.body;
	let id = req.body.id;
	Customer.update(customer, 
					 { where: {id: id} }
				   ).then(() => {
						 res.status(200).json({msg:"updated successfully a customer with id = " + id});
				   });	
};
 
// Delete a Customer by Id
exports.delete = (req, res) => {
	const id = req.params.customerId;
	Customer.destroy({
	  where: { id: id }
	}).then(() => {
	  res.status(200).json({msg:'deleted successfully a customer with id = ' + id});
	});
};