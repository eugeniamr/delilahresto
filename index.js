const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const apiRouter = require('./routes/api');
const sequelize = require("./dbConfg");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true})
);


app.use('/api', apiRouter)

app.listen(3000, () => {
   console.log('Welcome to Delilah Resto');
});
