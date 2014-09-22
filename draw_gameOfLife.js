var black = Color(0,0,0);
var red = Color(255,0,0);
var green = Color(0,255,0);
var blue = Color(0,0,255);
var white = Color(255, 255, 255);


//the game is initialized into 2D-array to represent the grid of cells. 
//Each cell is either set as true(live) or false(dead)
var GameOfLife = function (MaxX, MaxY){
	// create the drawing pad object and associate with the canvas
	// pad = Pad(document.getElementById('canvas'));
	// pad.clear();

	// set constants to be able to scale to any canvas size
	var MAX_X = MaxX;
	var MAX_Y = MaxY;
	// var x_factor = pad.get_width() / MAX_X;
	// var y_factor = pad.get_height() / MAX_Y;
	// console.log("pad.get_width(): ",pad.get_width());
	// console.log("x_factor: ",x_factor);
	
	var initial = 0, spacing = 1;
	var RADIUS = 5, margin = 3;
	var LINE_WIDTH = 0;
	interval=0; //defining interval as global so that it is accessible in jQuery functions
	color = "green", prevColor = "black";
	var on = true;

	// draw a box
	// pad.draw_rectangle(Coord(0, 0), pad.get_width(), pad.get_height(), 1, black);

	var position1 = [[14,1],[15,1],[14,2],[15,2],[14,11],[15,11],[16,11],[13,12],[17,12],[12,13],[18,13],[12,14],[18,14],[15,15],[13,16],[17,16],[14,17],[15,17],[16,17],[15,18],[14,21],[13,21],[12,21],[14,22],[13,22],[12,22],[11,23],[15,23],[15,25],[16,25],[11,25],[10,25],[13,35],[12,35],[13,36],[12,36]];
	var position2 = [[4,2],[5,2],[6,2],[10,2],[11,2],[12,2],[2,4],[2,5],[2,6],[7,4],[7,5],[7,6],[9,4],[9,5],[9,6],[14,4],[14,5],[14,6],[4,7],[5,7],[6,7],[10,7],[11,7],[12,7],[4,9],[5,9],[6,9],[10,9],[11,9],[12,9],[2,10],[2,11],[2,12],[7,10],[7,11],[7,12],[9,10],[9,11],[9,12],[14,10],[14,11],[14,12],[4,14],[5,14],[6,14],[10,14],[11,14],[12,14]]
	

	// var interval = setInterval(function(){
	// 	cells = update(MAX_X, MAX_Y);
	// 	// console.log(cells);
	// 	drawUpate();

	// }, 500);

	// var position1 = [[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]]
	var cells = initialize(MAX_X, MAX_Y);
	// initialize2(MAX_X, MAX_Y);
	startInterval(interval);
	// makeBoard(position1);


	//initializes an array object with number of x and y elements. Higher level ar[i] --> x, inner level ar[i][j] --> y
	function initialize(x, y){
		$('#table').empty();
		var ar = [];
		for(var i=0; i<x; i++){
			ar[i] = new Array(y);
			$('#table').append("<tr></tr>");

			for(var j=0; j<y; j++){
				var life = randomize(.4);
				ar[i][j] = life, id = i*y+j;
				var td = "<td id='"+id+"'></td>";
				if(life){
					td = "<td class='"+color+"' id='"+id+"'></td>";
				}
				
				$('#table tr:nth-child('+(i+1)+')').append(td);
			}
		}

		return ar;
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
					// console.log(cellValid(x+i,y+i));
					// console.log(x+i,y+j);
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

	//phase1 drawUpdate using canvas HTML5
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

	function drawUpdate2(){
		for (var i = 0; i < MAX_X; i = i + spacing) {
			for (var j = 0; j < MAX_Y; j = j + spacing) {
				// select circle or square according some arbitrary criterion
				var id = i*MAX_Y+j;
				if(cells[i][j]){
					$("#"+id).removeClass(prevColor);
					$("#"+id).addClass(color);
				}else{
					$("#"+id).removeClass(prevColor);
					$("#"+id).removeClass(color);
				}
			}
		}
	}

	function removeClass(clas){
		for (var i = 0; i < MAX_X; i = i + spacing) {
			for (var j = 0; j < MAX_Y; j = j + spacing) {
				var id = i*MAX_Y+j;
				$("#"+id).removeClass(clas);
			}
		}
	}
	function startInterval(inter){
		console.log("starting interval");
		interval = setInterval(function(){
			cells = update(MAX_X, MAX_Y);
			drawUpdate2();

		}, 200);
		on = true;
	}

	function stopInterval(inter){
		console.log("stopping interval");
		clearInterval(interval);
		on = false;
	}

	$("#button_start").click(function(){
		if(on){
			return;
		}
		startInterval(interval);
	});

	$("#button_stop").click(function(){
		if(on){
			stopInterval(interval);	
		}
	});
	$("input[name='color']").change(function(){
		// removeClass(color);
		prevColor = color;
		color = $(this).val();
	});



	$("input[name='position']").change(changePos );

	function changePos(){
		console.log("enter position");
		console.log($(this).val());
		// removeClass(color);
		if($(this).val() == "randomized"){
			cells = initialize(35,50);
		}else if($(this).val() == "gun"){
			cells = initialize2(35,50);
			makeBoard(position1);
		}else if($(this).val() == "pulsar"){
			cells = initialize2(35,50);
			makeBoard(position2);

		}
	}

}

	




var game = GameOfLife(35,50);







