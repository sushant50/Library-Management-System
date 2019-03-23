module.exports = (sequelize, Sequelize) => {
	const Book = sequelize.define('book', {
	  isbn: {
			type: Sequelize.STRING
	  },
	  title: {
			type: Sequelize.STRING
      }

	});
	
	return Book;
}