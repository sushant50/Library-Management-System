const env = require('./env.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,

  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.customers = require('../model/customer.model.js')(sequelize, Sequelize);
db.book = require('../model/book.model.js')(sequelize, Sequelize);
db.author = require('../model/author.model.js')(sequelize, Sequelize);
db.book_author = require('../model/book_author.model.js')(sequelize, Sequelize);

module.exports = db;