module.exports = (sequelize, Sequelize) => {
	const Author = sequelize.define('author', {
	  author_id: {
			type: Sequelize.STRING
	  },
	  name: {
			type: Sequelize.STRING
      }

	});
	
	return Author;
}