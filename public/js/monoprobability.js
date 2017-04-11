var monoapp = angular.module('monoprobabilityApp', ['rzModule']);
var OptContr = monoapp.controller('OptimizationController', ['$scope', 'ValuationService', function($scope, ValuationService){
  $scope.squares = MonopolySquares;
  $scope.RailroadSlider = {
    value: 0,
    options: {
      floor: 0,
      ceil: 4,
      showSelectionBar: true
    }
  };
  $scope.UtilitySlider = {
    value: 0,
    options: {
      floor: 0,
      ceil: 2,
      showSelectionBar: true
    }
  };
  $scope.HouseSlider = {
    value: 0,
    options: {
      floor: 0,
      ceil: 5,
      showSelectionBar: true
    }
  };

  ValuationService.get_probabilities($scope.squares);

  $scope.$watchGroup(["RailroadSlider.value", "UtilitySlider.value", "HouseSlider.value"], function(){
    ValuationService.get_values($scope.squares, $scope.RailroadSlider.value, $scope.UtilitySlider.value, $scope.HouseSlider.value);
  });
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
      return 3/36;
    }
    else if (distance == 5 || distance == 9){
      return 4/36;
    }
    else if (distance == 6 || distance == 8){
      return 5/36;
    }
    else if (distance == 7){
      return 6/36;
    }
  }

  this.probability_travelling_square = function(prev_index){
    //Determine the chance of actually coming from the previous square
    //Rather than teleporting to another location
    const NUM_CARDS_IN_PILE = 16;
    const NUM_STATIONARY_CHANCE_CARDS = 6;
    const NUM_STATIONARY_COMMUNITY_CHEST_CARDS = 15;
    if (prev_index == 7 || prev_index == 22 || prev_index == 36){
      //Chance squares, 10/16 chance of moving elsewhere
      return NUM_STATIONARY_CHANCE_CARDS/NUM_CARDS_IN_PILE;
    }
    if (prev_index == 2 || prev_index == 17 || prev_index == 33){
      //Community chest, 1/16 chance of moving to Go
      return NUM_STATIONARY_COMMUNITY_CHEST_CARDS/NUM_CARDS_IN_PILE;
    }
    if (prev_index == 30){
      //Jail, obviously you go to Jail(do NOT pass Go, do NOT collect $200)
      return 0;
    }
    return 1;
  }

  this.incoming_teleport_probability = function(index, squares){
    //Chance the current square gets teleported to by other squares
    var probability_at_chance_square = squares[7].prev_prob + squares[22].prev_prob + squares[36].prev_prob;
    var probability_at_cc_square = squares[2].prev_prob + squares[17].prev_prob + squares[33].prev_prob;
    var curr_prob = 0;
    switch (index){
      case 0://Advance to Go
        curr_prob += probability_at_chance_square/16 + probability_at_cc_square/16;
        break;
      case 4://Go back 3 spaces
        curr_prob += squares[7].prev_prob/16;
        break;
      case 5://Advance to nearest railroad(2 cards) and go to ReadingRailroad
        curr_prob += probability_at_chance_square/16 + squares[36].prev_prob * 2/16;
        break;
      case 10://Go to Jail
        curr_prob += probability_at_chance_square/16 + squares[30].prev_prob;
        break;
      case 11://Go to St. Charles
        curr_prob += probability_at_chance_square/16;
        break;
      case 12://Go to nearest utility
        curr_prob += squares[7].prev_prob/16 + squares[36].prev_prob/16;
        break;
      case 15://Go to nearest railroad
        curr_prob += squares[7].prev_prob * 2/16;
        break;
      case 19://Go back 3 spaces
        curr_prob += squares[22].prev_prob/16;
        break;
      case 24://Go to Illinois
        curr_prob += probability_at_chance_square/16;
        break;
      case 25://Go to nearest railroad
        curr_prob += squares[22].prev_prob * 2/16;
        break;
      case 28://Go to nearest utility
        curr_prob += squares[22].prev_prob/16;
        break;
      case 33://Go back 3 spaces
        curr_prob += squares[36].prev_prob/16;
        break;
      case 39://Go to boardwalk
        curr_prob += probability_at_chance_square/16;
        break;
      default:
        return 0;
    }
    return curr_prob;
  }

  this.incoming_probability = function(index, squares){
    //Determine probability of landing on current square
    var curr_prob = 0;

    const MIN_ROLL = 2;
    const MAX_ROLL = 12;
    for (var distance = MIN_ROLL; distance <= MAX_ROLL; distance++){
      //Determine probability of ending in index square based off of the
      //Probability of being on the feed-in squares
      var prev_index = index - distance;
      if (prev_index < 0){
        prev_index += NUM_SQUARES;
      }
      //Probability of being at the previous square
      var probability_at_square = squares[prev_index].prev_prob;
      //Probability the previous square transitions by dice roll instead of teleporting somewhere else
      var probability_incoming_square = this.probability_travelling_square(prev_index);
      //Probability of rolling the proper distance to reach the current square from the previous
      var probability_travelling_distance = this.probability_travelling_distance(distance);
      curr_prob += probability_at_square * probability_incoming_square * probability_travelling_distance;
    }
    curr_prob += this.incoming_teleport_probability(index, squares);
    return curr_prob;
  }

  this.get_probabilities = function(squares){
    //Obtain the steady state probabilities of the squares
    //Loop through the squares in a DTMC
    const DTMC_LOOPS = 1000;
    for (var i = 0; i < DTMC_LOOPS; i++){
      //For each square, determine the probability of landing on it this cycle
      for (var j = 0; j < squares.length; j++){
        squares[j].curr_prob = this.incoming_probability(j, squares);
      }
      for (var j = 0; j < squares.length; j++){
        //Shift to the previous cycle and clear the current cycle
        squares[j].prev_prob = squares[j].curr_prob;
        squares[j].curr_prob = 0;
      }
    }
    for (var i = 0; i < squares.length; i++){
      //Shift probabilitiies back to current
      squares[i].curr_prob = squares[i].prev_prob;
    }
  };
  this.print_probabilities = function(squares){
    console.log(squares);
    var sum = 0;
    for (var i = 0; i < squares.length ; i++){
      sum += squares[i].curr_prob;
    }
    console.log("Probability sum is " + sum);
    console.log("Probability average is " + sum/NUM_SQUARES);
  };
});


monoapp.service('ValueService', function(){
  this.get_values = function(squares, railroadcount, utilitycount, housecount){
    for (var i = 0; i < squares.length; i++){
      if (squares[i] instanceof Railroad){
        squares[i].value = squares[i].get_rent(railroadcount);
      }
      else if (squares[i] instanceof Utility) {
        squares[i].value = squares[i].get_rent(utilitycount);
      }
      else if (squares[i] instanceof House){
        squares[i].value = squares[i].get_rent(housecount);
      }
    }
  };

  this.normalize_values = function(squares){
    var sum = 0;
    for (var i = 0; i<squares.length; i++){
      sum += squares[i].value;
    }
    const VALUE_NORMALIZATION_MODIFIER = 100;
    for (var i = 0; i < squares.length; i++){
      squares[i].norm_value = VALUE_NORMALIZATION_MODIFIER * squares[i].value / sum;
    }
  };

  this.print_values = function(squares){
    console.log(squares);
    var sum = 0;
    var value_square_count = 0;
    var curr_square_value = 0;
    for (var i = 0; i < squares.length; i++){
      sum += squares[i].value;
    }
    console.log("Value sum is " + sum);
    console.log("Value average is " + sum/NUM_SQUARES);
  };

});

monoapp.service('ValuationService', function(ProbabilityService, ValueService){
  this.get_probabilities = function(squares){
    //Determine probability of ending up on each specific square
    ProbabilityService.get_probabilities(squares);

    //Print the sum and average of the probabilities
    ProbabilityService.print_probabilities(squares);
  }

  this.get_values = function(squares, railroadcount, utilitycount, housecount){
    //Determine value for each square, based off of the number of houses, utilities and railroads owned
    ValueService.get_values(squares, railroadcount, utilitycount, housecount);

    //Normalize values for easier comparison between squares
    ValueService.normalize_values(squares);

    //Print values out neatly
    ValueService.print_values(squares);
    console.log("---Cycle end---");
  }
});
