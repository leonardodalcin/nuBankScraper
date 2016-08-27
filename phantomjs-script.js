var system = require('system');
var page = require('webpage').create();
page.open('https://conta.nubank.com.br/#/login', function() {

  var userData = page.evaluate(function() {
    $("md-input-container").addClass('md-input-focused')
    $("input[id='username']").val('');
    $("input[id='input_001']").val('');
    $("md-input-container").addClass('input-has-value')
    $("button[type='submit']")[0].prop("disabled", false);
    $("button[type='submit']").click();


    return $("a[class='menu-item profile-title ng-binding']").text();
  }, 'userData');

  console.log(userData);
  phantom.exit()
});
