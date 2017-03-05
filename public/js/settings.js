var Square = function(name) {
  this.name = name;
};
var House = function(name, rent) {
  Square.call(this, name);
  this.rent = rent;
};
House.prototype = Square.prototype;
var d = new House("this", 50);

var squares = [ { name: 'Go' },
{ name: 'Mediterranean Avenue', rent: [2, 10, 30, 90, 160, 250] },
{ name: 'Community Chest(2)' },
{ name: 'Baltic Avenue', rent: [4, 20, 60, 180, 320, 450] },
{ name: 'Income Tax' },
{ name: 'Reading Railroad', rent: [0, 25, 50, 100, 200] },
{ name: 'Oriental Avenue', rent: [6, 30, 90, 270, 400, 550] },
{ name: 'Chance(7)' },
{ name: 'Vermont Avenue', rent: [6, 30, 90, 270, 400, 550] },
{ name: 'Connecticut Avenue', rent: [8, 40, 100, 300, 450] },
{ name: 'Jail' },
{ name: 'St. Charles Place', rent: [10, 50, 150, 450, 625, 750] },
{ name: 'Electric Company' },
{ name: 'States Avenue', rent: [10, 50, 150, 450, 625, 750] },
{ name: 'Virginia Avenue', rent: [12, 60, 180, 500, 700, 900] },
{ name: 'Pennsylvania Railroad', rent: [0, 25, 50, 100, 200] },
{ name: 'St. James Place', rent: [14, 70, 200, 550, 750, 950] },
{ name: 'Community Chest(17)' },
{ name: 'Tennessee Avenue', rent: [14, 70, 200, 550, 750, 950] },
{ name: 'New York Avenue', rent: [16, 80, 220, 600, 800, 1000] },
{ name: 'Free Parking' },
{ name: 'Kentucky Avenue', rent: [18, 90, 250, 700, 875, 1050] },
{ name: 'Chance(22)' },
{ name: 'Indiana Avenue', rent: [18, 90, 250, 700, 875, 1050] },
{ name: 'Illinois Avenue', rent: [20, 100, 300, 750, 925, 1100] },
{ name: 'B. & O. Railroad', rent: [0, 25, 50, 100, 200] },
{ name: 'Atlantic Avenue', rent: [22, 110, 330, 800, 975, 1150] },
{ name: 'Ventnor Avenue', rent: [22, 110, 330, 800, 975, 1150] },
{ name: 'Water Works' },
{ name: 'Marvin Gardens', rent: [24, 120, 360, 850, 1025, 1200] },
{ name: 'Go to Jail' },
{ name: 'Pacific Avenue', rent: [26, 130, 390, 900, 1100, 1275] },
{ name: 'North Carolina Avenue', rent: [26, 130, 390, 900, 1100, 1275] },
{ name: 'Community Chest(33)' },
{ name: 'Pennsylvania Avenue', rent: [28, 150, 450, 1000, 1200, 1400] },
{ name: 'Short Line', rent: [0, 25, 50, 100, 200] },
{ name: 'Chance(36)' },
{ name: 'Park Place', rent: [35, 175, 500, 1100, 1300, 1500] },
{ name: 'Luxury Tax' },
{ name: 'Boardwalk', rent: [50, 200, 600, 1400, 1700, 2000] } ];

rent_multiplier=[(1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1),
(5,5,5,5,5,5,5,5,5,5,5,5,5,150/28,5,4),
(15,15,15,100/8,15,15,200/14,220/16,250/18,15,15,15,15,420/28,500/35,12),
(45,45,45,300/8,45,500/12,550/14,600/16,700/18,750/20,800/22,850/24,900/26,1000/28,1100/35,28),
(80,80,200/3,450/8,62.5,700/12,750/14,800/16,875/18,925/20,975/22,1025/24,1100/26,1200/28,1300/35,34),
(125,112.5,550/6,600/8,75,900/12,950/14,1000/16,1050/18,1100/20,1150/22,1200/24,1275/26,1400/28,1500/35,40)];

function get_rent(){
rent=[
,2^31,6*rent_multiplier[numhouses][2]
,8*rent_multiplier[numhouses][3]
,2^31,10*rent_multiplier[numhouses][4]
,utilityrent,10*rent_multiplier[numhouses][4]
,12*rent_multiplier[numhouses][5]
,railrent,14*rent_multiplier[numhouses][6]
,2^31,14*rent_multiplier[numhouses][6]
,16*rent_multiplier[numhouses][7]
,2^31,18*rent_multiplier[numhouses][8]
,2^31,18*rent_multiplier[numhouses][8]
,20*rent_multiplier[numhouses][9]
,railrent,22*rent_multiplier[numhouses][10]
,22*rent_multiplier[numhouses][10]
,utilityrent,24*rent_multiplier[numhouses][11]
,2^31,26*rent_multiplier[numhouses][12]
,26*rent_multiplier[numhouses][12]
,2^31,28*rent_multiplier[numhouses][13]
,railrent, 2^31,35*rent_multiplier[numhouses][14]
,2^31,50*rent_multiplier[numhouses][15]
]
}
