var express            = require( 'express' ),
    app                = express();
    bodyParser         = require('body-parser'),
    assert             = require('assert'),
    mongoose           = require('mongoose'),
    userDataController = require('./server/controllers/userData-controller.js');

mongoose.connect('mongodb://localhost:27017/userData')

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

  var loginInfo = JSON.parse(req.query.loginInfo);
  var url = 'https://conta.nubank.com.br/#/login'

  Browser.visit(url, function(error, browser) {
    console.log('Visited url: ' + url)
    browser.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_3) AppleWebKit/535.20 (KHTML, like Gecko) Chrome/19.0.1036.7 Safari/535.20';
    setTimeout(function () {
      console.log('Asserting visit')
      browser.assert.text('title', 'Login - Nubank');
      browser
        .fill('input[id=username]', loginInfo.username)
        console.log(browser.window.document.querySelector('input[id=username]').value)
      browser
        .fill('input[id=input_001]', loginInfo.password)
        console.log(browser.window.document.querySelector('input[id=input_001]').value)
      browser
        .pressButton('button[type=submit]')
      console.log('Form sent, waiting for page to load')
      setTimeout(function () {
        console.log('Asserting visit')
        browser.dump(process.stderr);
        browser.assert.text('title', 'Transações - Nubank');
      }, 30000)
    }, 30000)
  })
})

app.post('/api/userData', userDataController.create)
app.get('/api/userData', userDataController.list)

app.listen( 3000, function() {
  console.log( 'I\'m listening...' );
})
