var express    = require( 'express' ),
    app        = express();
    bodyParser = require('body-parser'),
    mongoose   = require('mongoose'),
    path = require('path'),
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

  console.log('Started scrape')
  const Browser = require('zombie');

  const browser = new Browser({
      waitDuration: 29*1000
  });

  var loginInfo = JSON.parse(req.query.loginInfo);
  var url = 'https://github.com/login'

  browser.visit(url, function(error) {
    console.log('Visited url:' + url)
    browser.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_3) AppleWebKit/535.20 (KHTML, like Gecko) Chrome/19.0.1036.7 Safari/535.20';
    setTimeout(function () {
      console.log('Asserting visit')
      browser.assert.text('title', 'Sign in to GitHub · GitHub');
      browser
        .fill('input[id=login_field]', loginInfo.username)
        console.log(browser.window.document.querySelector('input[id=login_field]').value)
      browser
        .fill('input[id=password]', loginInfo.password)
        console.log(browser.window.document.querySelector('input[id=password]').value)
      browser
        .pressButton('input[value="Sign in"]')
      console.log('Data Sent')
      browser.dump(process.stderr);
      setTimeout(function () {
        console.log('Asserting Login')
        browser.dump(process.stderr);
        browser.assert.text('title', 'GitHub');
      }, 30000)
    }, 30000)
  })
})

app.listen( 3000, function() {
  console.log( 'I\'m listening...' );
})
