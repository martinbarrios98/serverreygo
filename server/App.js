const express = require('express');
const validar = require('express-validator');
const path = require('path');
const rutas = require('./rutas/rutas');
const sesion = require('express-session');
const cookieParser = require('cookie-parser');
const db = require('./config/db');
const cors = require('cors');

db.sync()
    .then(() => console.log('Conectando al servidor'))
    .catch(error => console.log(error))

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', rutas() );


app.listen(3000);