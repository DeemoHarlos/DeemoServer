const fs = require('fs')
const md2html = require('./markdown2html')
var data = require('./diary/data')
var app = require('express').Router()

app.get('/',(req,res)=>{
	res.json(data)
})

app.get('/:id',(req,res)=>{
	var target = data.find(e=>(e.id === req.params.id))
	if (!target) res.status(404).send('Diary #' + req.params.id + 'Not found.')
	var md = fs.readFileSync('diary/data/' + req.params.id + '.md','utf8')
	var converter = new md2html.Converter()	
    var html = converter.makeHtml(md)
	target.content = html
	res.json(target)
})

module.exports = app	