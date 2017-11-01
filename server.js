var express = require('express');
var app     = express();
var maxAge  = 31557600000;

//app.use(express.compress());
//app.use(express.bodyParser());
//app.use(express.methodOverride());
app.use(express.static(__dirname + '/tmp' ));

app.get('/*', function(req,res)
{
    res.sendFile(__dirname + '/tmp/index.html');
});

console.log('Listening on port 3000');
app.listen(3000);