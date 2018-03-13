const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const argv = require('minimist')(process.argv.slice(2));
const log = require('./logger')

var app = express()
var port = argv.p || 11517
var test = true

log.printLog('info','Starting server ...')

/*
// mongoose.Promise = global.Promise
mongoose.connect(config.database, function (err, res) {
  if (err) {
    log.printLog('error','ERROR connecting to: ' + config.database + '. ',err)
  } else {
    log.printLog('info','Succeeded connected to: ' + config.database)
  }
})
*/

if (test) {
  app.use((req,res,next)=>{
    log.listenResEnd(req,res)
    next()
  })
}
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.get('/',(req,res)=>{log.statRes(res,200)})

app.use('/diary',require('./diary'))

app.listen(port,()=>{
  if (test) log.printLog('info','Listening on port ' + (port+'').cyan)
})

if (test) module.exports = app
