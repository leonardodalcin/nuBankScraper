var express    = require( 'express' ),
    app        = express();
    bodyParser = require('body-parser'),
    mongoose   = require('mongoose'),
    path = require('path'),
    spawn = require('child_process').spawn,
    phantomjs = require('phantomjs'),
    assert = require('assert');

app.get('/', function( req, res ) {
  res.sendFile( __dirname + '/client/views/index.html' );
});

app.get('/showData', function (req, res) {
    res.sendFile( __dirname + '/client/views/showData.html');
});

app.use( '/js', express.static( __dirname + '/client/js' ));
app.use( '/css', express.static( __dirname + '/client/css' ));
app.use( '/img', express.static( __dirname + '/client/img' ));
app.use( '/bower_components', express.static( __dirname + '/bower_components' ));


app.get('/scrape', function(req, res){
  var Browser = require('zombie');
  // var user_agent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_3) AppleWebKit/535.20 (KHTML, like Gecko) Chrome/19.0.1036.7 Safari/535.20';
  // var browser = new Browser({userAgent: user_agent, debug: true, waitFor: 10000});
  var url = 'https://conta.nubank.com.br/#/login'

  var login = '';
  var password = '';

  var browser = new Browser();
  browser.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_3) AppleWebKit/535.20 (KHTML, like Gecko) Chrome/19.0.1036.7 Safari/535.20';

  browser.visit(url, function(error) {
    setTimeout(function () {
      console.log(error)
      console.log('were in')
      browser.assert.text('title', 'Login - Nubank');
      browser
        .fill('input[id=username]',  login)
        .fill('input[id=input_001]', password)
        .pressButton('entrar')
      browser.wait().then(function() {
        console.log('gonnaRoll')
        browser.assert.text('title', 'Transações - Nubank');
      })
    }, 30000)
  })
})

app.listen( 3000, function() {
  console.log( 'I\'m listening...' );
})
