const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const dbConfig = require('./config/db.config');
const mongoose = require('mongoose');

mongoose.connect(dbConfig.url, { useNewUrlParser: true })
  .then(() => { console.log('Connection to database ok') })
  .catch(err => { 
    console.error(`Error connecting to database: ${err}`);
    process.exit();
  });

app.get('/', (req, res) => {
  res.json({
    'message': 'Bem vindo ao server'
  });
});

require('./app/routes/Transactions')(app);
app.listen(port, () => console.log(`Server is running on port: ${port}`));