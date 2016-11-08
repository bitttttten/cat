var express = require('express')
var logfmt = require('logfmt')
var compression = require('compression')

var app = express()

app.use(logfmt.requestLogger())
app.use(compression())
app.use(express.static(__dirname + '/public'))

var port = Number(process.env.PORT || 6201)
app.listen(port, () => console.log("Listening on port " + port))