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
  const Browser = require('zombie');

  var url = 'https://conta.nubank.com.br/#/login'
  Browser.visit(url, function(error, browser) {
    console.log(1)
    setTimeout(function(){
      browser.assert.text('title', 'Login - Nubank');
      browser
        .fill('input[id=username]',  '')
        .fill('input[id=input_001]', '')
        .pressButton('entrar');
        browser.dump();
        setTimeout(function(){
          console.log('gonnaRoll')
          browser.assert.text('title', 'Transações - Nubank');
        }, 60*1000);
    }, 20*1000);

  });


})

app.listen( 3000, function() {
  console.log( 'I\'m listening...' );
})
