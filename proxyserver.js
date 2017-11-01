var express = require('express');
var proxyMiddleware = require('http-proxy-middleware');
var vhost = require('vhost');

var app = express();
var Config = {lport:3000};

// your domain name
var domainname = 'localhost';
var lport = Config.lport;
// proxy base rules
app.use(vhost('localhost', express.static(__dirname +  "/tmp/" )));
app.use(vhost('127.0.0.1', express.static(__dirname +  "/tmp/" )));

//proxy config
var proxyOptions = {
	target: 'http://localhost:8000',
	changeOrigin: true,
	pathRewrite: {
		'^/api' : '/api'
	}
};
app.use(proxyMiddleware('/api', proxyOptions));	
app.get('*', function (req, res) {
    res.sendFile(__dirname + '/tmp/index.html');
});
	
app.listen(lport);