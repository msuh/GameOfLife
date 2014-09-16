var black = Color(0,0,0);
var red = Color(255,0,0);
var green = Color(0,255,0);
var blue = Color(0,0,255);
var white = Color(255, 255, 255);


//the game is initialized into 2D-array to represent the grid of cells. 
//Each cell is either set as true(live) or false(dead)
var GameOfLife = function (MaxX, MaxY){
	// create the drawing pad object and associate with the canvas
	pad = Pad(document.getElementById('canvas'));
	pad.clear();

	// set constants to be able to scale to any canvas size
	var MAX_X = MaxX;
	var MAX_Y = MaxY;
	var x_factor = pad.get_width() / MAX_X;
	var y_factor = pad.get_height() / MAX_Y;
	console.log("pad.get_width(): ",pad.get_width());
	console.log("x_factor: ",x_factor);
	
	var initial = 0, spacing = 1;
	var RADIUS = 5, margin = 3;
	var LINE_WIDTH = 0;

	// draw a box
	pad.draw_rectangle(Coord(0, 0), pad.get_width(), pad.get_height(), 1, black);

	//the 2D array that represents the grid cells
	var cells = initialize(MAX_X, MAX_Y);

	var interval = setInterval(function(){
		cells = update(MAX_X, MAX_Y);
		// console.log(cells);
		drawUpate();

	}, 500);

	//initializes an array object with number of x and y elements. Higher level ar[i] --> x, inner level ar[i][j] --> y
	function initialize(x, y){
		var ar = [];
		for(var i=0; i<x; i++){
			ar[i] = new Array(y);
			for(var j=0; j<y; j++){
				ar[i][j] = randomize(.4);
			}
		}
		return ar;
	}

	//randomly returns true or false based on the probability provided for life
	function randomize(Problife){
		var ran = Math.random();
		if(ran < Problife){
			return true;
		}else{
			return false;
		}
	}

	//count the number of live cells around the given x,y coordinate
	function checkNeighbor(x,y){
		var neighbor = 0; //number of live neighbors
		for(var i= -1; i < 2; i++){
			for(var j= -1; j < 2; j++){
				if(i==0 && j==0){
					continue;
				}
				if(cellValid(x+i,y+j)){
					if(cells[x+i][y+j]){ //this neighbor cell is live
						neighbor++;
					}
				}
			}
		}
		return neighbor;
	}

	//returns false if x or y < 0 or exceeds maximum height or width
	function cellValid(x,y){
		if(x<0 || y<0 || x>= MAX_X || y >= MAX_Y){
			return false;
		}
		return true;
	}

	//return next step's true(live) or false(dead) for a given cell based on the Neighbors
	function checkLifeRule(x,y){
		var num = checkNeighbor(x,y,cells);
		if(cells[x][y] == true){
			if(num <2){
				return false;
			}else if(num ==2 || num==3){
				return true;
			}
			return false;
		}else if(cells[x][y] == false){
			if(num ==3){
				return true;
			}
			return false;
		}
	}

	//return a new 2Darray of the grid based on the current cell structure
	function update(){
		var newAr = [];
		for(var i=0; i<MAX_X; i++){
			newAr[i] = new Array(MAX_Y);
			for(var j=0; j<MAX_Y; j++){
				newAr[i][j] = checkLifeRule(i,j);
			}
		}
		return newAr;
	}

	function drawUpate(){
		pad.clear();
		pad.draw_rectangle(Coord(0, 0), pad.get_width(), pad.get_height(), 1, black);

		for (var i = initial; i < MAX_X; i = i + spacing) {
			for (var j = initial; j < MAX_Y; j = j + spacing) {
				// select circle or square according some arbitrary criterion

				if(cells[i][j]){
					// console.log("cells[i,j] is TRUE:",cells[i][j]);
					pad.draw_rectangle(Coord(i*x_factor+ margin, j*y_factor + margin),
						RADIUS*2, RADIUS*2, LINE_WIDTH, green ,green);
				}else{
					// console.log("cells[i,j] is FALSE:",cells[i][j]);
					pad.draw_rectangle(Coord(i*x_factor + margin, j*y_factor + margin),
						RADIUS*2, RADIUS*2, LINE_WIDTH, white, white);
				}
			}
		}
	}


}





var game = GameOfLife(49,30);



///testing
/*
	1. testing initializing 
	2. test randomize()
	3. nextStep()
	4. cellValid()

*/








