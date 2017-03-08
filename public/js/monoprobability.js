var monoapp = angular.module('monoprobabilityApp', ['rzModule']);
var OptContr = monoapp.controller('OptimizationController', ['$scope', 'ValuationService', function($scope, ValuationService){
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
  ValuationService.valuate(MonopolySquares, $scope.RailroadSlider, $scope.UtilitySlider, $scope.HouseSlider);
}]);

monoapp.service('ProbabilityService', function(){
  this.probability_travelling_distance = function(distance){
    //Represents the dice rolls determining the distance travelled
    if (distance == 2 || distance == 12){
      return 1/36;
    }
    else if (distance == 3 || distance == 11){
      return 2/36;
    }
    else if (distance == 4 || distance == 10){
      return 3/16;
    }
    else if (distance == 5 || distance == 9){
      return 4/16;
    }
    else if (distance == 6 || distance == 8){
      return 5/16;
    }
    else if (distance == 7){
      return 6/36;
    }
  }

  this.probability_incoming_square = function(incoming_square_index){
    //Determine the chance of actually coming from the stated square
    //Rather than teleporting to another location
    if (incoming_square_index < 0){
      incoming_square_index += 40;
    }
    if (incoming_square_index == 7 || incoming_square_index == 22 || incoming_square_index == 36){
      //Chance squares, 10/16 chance of moving elsewhere
      return 6/16;
    }
    if (incoming_square_index == 2 || incoming_square_index == 17 || incoming_square_index == 33){
      //Community chest, 1/16 chance of moving to Go
      return 15/16;
    }
    if (incoming_square_index == 30){
      //Jail, obviously you go to Jail(do NOT pass Go, do NOT collect $200)
      return 0;
    }
    return 1;
  }

  this.incoming_probability = function(index, squares){
    //Determine probability of landing on index square
    var prob = 0;
    for (var distance = 2; distance <= 12; distance++){
      //Determine probability of ending in index square based off of the
      //Probability of being on the feed-in squares
      var incoming_square_index = index - distance;
      console.log(incoming_square_index);
      prob += squares[incoming_square_index].prev_prob * this.probability_incoming_square(incoming_square_index) * this.probability_travelling_distance(distance);
    }
    return prob;
  }

  this.get_probabilities = function(squares){
    //Obtain the steady state probabilities of the squares
    //Loop through the squares 100 times in a DTMC
    for (var i = 0; i < 100; i++){
      //For each square, determine the probability of landing on it this cycle
      for (index in squares){
        squares[index].prob = this.incoming_probability(index, squares);
      }
      for (index in squares){
        squares[index].prev_prob = squares[index].prob;
      }
    }
  };
  this.print_probabilities = function(squares){
    console.log(squares);
  };
});

monoapp.service('ValuationService', function(ProbabilityService){
  this.valuate = function(squares, railroadcount, utilitycount, housecount){
    //Determine probability of ending up on each specific square
    ProbabilityService.get_probabilities(squares);

    //Print the sorted probability of the squares
    ProbabilityService.print_probabilities(squares);

    //Determine value for each square, based off of the number of houses, utilities and railroads owned

    //Print the sorted value of the squares
  }
});
