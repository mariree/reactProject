const express = require('express')
const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'))

// 设置跨域
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', '3.2.1')
  res.header('Content-type', 'application/json;charset=utf-8')
  next()
})

// exports.app
module.exports = app