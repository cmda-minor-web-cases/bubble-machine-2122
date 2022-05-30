const express = require('express');
const app = express();
const port = 4100;
require('dotenv').config();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('index')
  })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })