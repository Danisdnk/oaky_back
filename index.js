const express = require('express');
const dotenv = require('dotenv');
const { dbConnection } = require('./database/config');
var createError = require('http-errors');
var logger = require('morgan');
//Express
var path = require('path');
var cookieParser = require('cookie-parser');
dotenv.config();

//crear servidor de Express
const app = express();
//incorporo cors
var cors = require('cors');

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});



//base de datos
dbConnection();
//directorio publico
app.use(express.static('public'));
//lectura y parseo de body
app.use(express.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
//aplico cors
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//rutas
app.use('/api/auth/', require('./routes/auth'));
app.use('/api/child/', require('./routes/childRoutes'));
app.use('/api/medicalstudy/', require('./routes/medicalStudyRoutes'));
app.use('/api/control/', require('./routes/controlRoutes'));
app.use('/api/vaccines/', require('./routes/vaccinesRoutes'));
//escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`servidor en puerto ${process.env.PORT}`);
});