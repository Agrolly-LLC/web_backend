var express = require('express')
var bodyParser  = require('body-parser');

require('dotenv').config
const { sequelize } = require('./models')
var cors = require('cors')

var app = express()
var port = process.env.PORT || 5000

app.use(express.json())
app.use(cors()) 
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

var News = require('./route/News')

app.use('/news', News)


app.listen(port, async () => {
    console.log('Server is running on port: ' + port)
    await sequelize.authenticate()
    console.log('Database Connected!')
})