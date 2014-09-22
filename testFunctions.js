/*
	functions I use in the draw_gameOfLife to be tested.
	Those functions are put here because these helper functions cannot be accessed from outside the gameOfLife() function

*/

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
	function checkNeighbor(x,y, cells, MAX_X, MAX_Y){
		var neighbor = 0; //number of live neighbors
		for(var i= -1; i < 2; i++){
			for(var j= -1; j < 2; j++){
				if(i==0 && j==0){
					continue;
				}
				if(cellValid(x+i,y+j, MAX_X, MAX_Y)){
					if(cells[x+i][y+j]){ //this neighbor cell is live
						neighbor++;
					}
				}
			}
		}
		return neighbor;
	}

	//returns false if x or y < 0 or exceeds maximum height or width
	function cellValid(x,y, MAX_X, MAX_Y){
		if(x<0 || y<0 || x>= MAX_X || y >= MAX_Y){
			return false;
		}
		return true;
	}

	//return next step's true(live) or false(dead) for a given cell based on the Neighbors
	function checkLifeRule(x,y, cells, MAX_X, MAX_Y){
		var num = checkNeighbor(x,y,cells, MAX_X, MAX_Y);
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
	function update(MAX_X, MAX_Y, cells){
		var newAr = [];
		for(var i=0; i<MAX_X; i++){
			newAr[i] = new Array(MAX_Y);
			for(var j=0; j<MAX_Y; j++){
				newAr[i][j] = checkLifeRule(i,j, cells, MAX_X, MAX_Y);
			}
		}
		return newAr;
	}


	function initialize2(x, y){
		var ar = [];
		for(var i=0; i<x; i++){
			ar[i] = new Array(y);
			$('#table').append("<tr></tr>");

			for(var j=0; j<y; j++){
				var id = i*y+j;
				ar[i][j] = false;
				var td = "<td id='"+id+"'></td>";
				$('#table1 tr:nth-child('+(i+1)+')').append(td);
			}
		}

		return ar;
	}

	function makeBoard(lst){
		for(i in lst){
			var tup = lst[i];
			cells[tup[0]][tup[1]] = true;
			var id = tup[0]*MAX_Y+tup[1];
			$('#'+id).addClass(color);
		}
	}
