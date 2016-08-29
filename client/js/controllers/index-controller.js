app.controller('indexController', ['$scope', '$http', function ($scope, $http) {

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

  function parseData(data) {
    //do data parsing here, redirect to showData sending the parsed object.
  }

}]);
