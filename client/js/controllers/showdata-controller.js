app.controller('showDataController', ['$scope', '$resource', function ( $scope, $resource ) {
  var BankData = $resource('/api/BankData')

  var saveBankData = function() {
    var bankData = new BankData();
    bankData.username = 'jones';
    bankData.$save();

  }

}]);
