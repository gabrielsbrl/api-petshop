const express = require('express');
const app = express();
const config = require('config');

// routes import 
const router = require('./routes/fornecedores');

app.use(express.json()); // body parser not used any more

app.use('/api/fornecedores', router);

const dbInstance = require('./banco-de-dados/index');

app.listen(config.get('api.port'), () => {
    console.log('A api está funcionando');
});