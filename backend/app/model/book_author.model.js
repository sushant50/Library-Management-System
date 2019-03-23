module.exports = (sequelize, Sequelize) => {
	const Book_Author = sequelize.define('book_author', {
	  author_id: {
			type: Sequelize.STRING
	  },
	  isbn: {
			type: Sequelize.STRING
      }

	});
	
	return Book_Author;
}