//IMPORTAR MODULOS
//const express = require ('express');
import express from 'express';
import {dirname, join} from 'path';
import { fileURLToPath } from 'url';
import indexRoutes from './routes/index.js';   //tiene que llevar extension siempre
// import ejs from 'ejs';


//INICIAMOS EXPRESS
const port = 3000
const app =express();
const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(join(__dirname,'views'));



//configurar motor de plantillas
app.set('view engine','ejs');
app.set('views',join(__dirname,'views'));

app.use(express.urlencoded({extended: true}));


//Configurar enrutador
app.use(indexRoutes);
//configuramos public como static
app.use(express.static(join(__dirname,'public')));


//CREAMOS EL SERVIDOR
app.listen(process.env.PORT || port)
// console.log("holaaa!")
console.log('Escuchando por el puerto '+port+'...')


