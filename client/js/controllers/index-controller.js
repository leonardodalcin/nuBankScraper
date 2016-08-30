app.controller('indexController', ['$scope', '$http', '$resource', function ($scope, $http, $resource) {

  var UserData = $resource('/api/userData')
  $http = $http;

  $scope.loginInfo = {
    username: '',
    password: ''
  }

  $scope.submit = function() {
    console.log('Submited username: ', $scope.loginInfo.username + ' password: ', $scope.loginInfo.password )

    $http({
      url: '/scrape',
      method: 'GET',
      params: {loginInfo: $scope.loginInfo} //at server it will be req.query.email
    }).success(function(data) {
        parseData(data);
      },
      function(error) {
        console.log('Error: ', error)
      })
  }

  $scope.getData = function() {
    UserData.query(function (res) {
      console.log('alo', res)
      $scope.userData = res.name;
    })
  }


  $scope.createUserData = function() {
    var userData = new UserData();
    userData.name = "leonardo"
    console.log(userData);
    userData.$save(function (res) {
      console.log(res)
    })
  }

  function parseData(data) {
    //do data parsing here, redirect to showData sending the parsed object.
  }

}]);
