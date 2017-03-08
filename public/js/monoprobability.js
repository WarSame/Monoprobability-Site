var monoapp = angular.module('monoprobabilityApp', ['rzModule']);
var OptContr = monoapp.controller('OptimizationController', ['$scope', 'that', function($scope, that){
  $scope.RailroadSlider = {
    value: 0,
    options: {
      floor: 0,
      ceil: 4
    }
  };
  $scope.UtilitySlider = {
    value: 0,
    options: {
      floor: 0,
      ceil: 2
    }
  };
  $scope.HouseSlider = {
    value: 0,
    options: {
      floor: 0,
      ceil: 5
    }
  };
}]);

monoapp.service('that', function(){
  console.log("ello");
  this.x = 4;
  //Determine probability of ending up on each specific square

  //Print the sorted probability of the squares

  //Determine value for each square, based off of the number of houses, utilities and railroads owned

  //Print the sorted value of the squares

});
