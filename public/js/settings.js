//Contains all of the square data for the monopoly board

var Square = function(name) {
  this.name = name;
  this.start_prob = 1/40;
  this.prob = 1/40;
};
var House = function(name, rent) {
  Square.call(this, name);
  this.rent = rent;
  this.get_rent = function(num_houses){
    return this.rent[num_houses];
  }
};
var Utility = function(name){
  Square.call(this, name);
  this.distance_moved = 7;//Distance moved heading into this square, determines rent
  this.get_rent = function(num_utilities, distance_moved){
    if (num_utilities == 0){
      return 0;
    }
    if (num_utilities == 1){
      return this.distance_moved * 4;
    }
    if (num_utilities == 2){
      return this.distance_moved * 10;
    }
  }
}
var Railroad = function(name){
  Square.call(this, name);
  this.rent = [0, 25, 50, 100, 200];
  this.get_rent = function(num_railroads){
    return this.rent[num_railroads];
  }
}

var squares = [ new Square('Go')
, new House('Mediterranean Avenue', [2, 10, 30, 90, 160, 250])
, new Square('Community Chest(2)')
, new House('Baltic Avenue', [4, 20, 60, 180, 320, 450])
, new Square('Income Tax')
, new Railroad('Reading Railroad')
, new House('Oriental Avenue', [6, 30, 90, 270, 400, 550])
, new Square('Chance(7)')
, new House('Vermont Avenue', [6, 30, 90, 270, 400, 550])
, new House('Connecticut Avenue', [8, 40, 100, 300, 450])
, new Square('Jail'),
, new House('St. Charles Place', [10, 50, 150, 450, 625, 750])
, new Utility('Elecrict Company')
, new House('States Avenue', [10, 50, 150, 450, 625, 750])
, new House('Virginia Avenue', [12, 60, 180, 500, 700, 900])
, new Railroad('Pennsylvania Railroad')
, new House('St. James Place', [14, 70, 200, 550, 750, 950])
, new Square('Community Chest(17)')
, new House('Tennessee Avenue', [14, 70, 200, 550, 750, 950] )
, new House('New York Avenue', [16, 80, 220, 600, 800, 1000])
, new Square('Free Parking')
, new House('Kentucky Avenue', [18, 90, 250, 700, 875, 1050])
, new Square('Chance(2)')
, new House('Indiana Avenue', [18, 90, 250, 700, 875, 1050])
, new House('Illinois Avenue', [20, 100, 300, 750, 925, 1100])
, new Railroad('B. & O. Railroad')
, new House('Atlantic Avenue', [22, 110, 330, 800, 975, 1150])
, new House('Ventnor Avenue', [22, 110, 330, 800, 975, 1150])
, new Utility('Water Works')
, new House('Marvin Gardens', [24, 120, 360, 850, 1025, 1200])
, new Square('Go to Jail')
, new House('Pacific Avenue', [26, 130, 390, 900, 1100, 1275])
, new House('North Carolina Avenue', [26, 130, 390, 900, 1100, 1275])
, new Square('Community Chest(33)')
, new House('Pennsylvania Avenue', [28, 150, 450, 1000, 1200, 1400])
, new Railroad('Short Line')
, new Square('Chance(36)')
, new House('Park Place', [35, 175, 500, 1100, 1300, 1500])
, new Square('Luxury Tax')
, new House('Boardwalk', [50, 200, 600, 1400, 1700, 2000]) ];
