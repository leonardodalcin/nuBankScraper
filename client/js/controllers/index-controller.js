app.controller('indexController', ['$scope', '$http', function ($scope, $http) {

  $http = $http;

  $scope.loginInfo = {
    user: '1223',
    password: 'afafa'
  }

  $scope.sub = function() {
    $http.get('http://localhost:3000/scrape',{"msg":"hi"}).success(function(data){
    console.log(data);
   });
 }

 $scope.sub();

}]);
