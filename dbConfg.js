const Sequelize = require('sequelize');
const ProductModel = require('./models/products');
const UserModel = require('./models/users');
const OrderModel = require('./models/orders');

const sequelize = new Sequelize('delilahresto', 'root', null, {
  host: 'localhost',
  dialect: 'mysql'
});

// GENERATE TABLES
const Product = ProductModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);
const Order = OrderModel(sequelize, Sequelize);

// ASSOCIATIONS BETWEEN TABLES
User.hasMany(Order);
Order.belongsTo(User);
Product.belongsToMany(Order, { through: 'ordersProducts' });
Order.belongsToMany(Product, { through: 'ordersProducts' });

sequelize.sync({ force: false}) 
.then(() => {
    console.log('Tablas inicializadas.');
});

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });



module.exports = {
  sequelize,
  Product,
  User,
  Order
}
