

test("testing initialize() to have more than one true and false ", function() {
	var ar = initialize(3,3);
	var t = 0, f = 0;
	for(var i=0; i<3; i++){
		for(var j=0; j<3; j++){
			if(ar[i][j]){
				t++;
			}else{
				f++;
			}
		}
	}

	ok(t>0, "at least one live cell");
	ok(f>0, "at least one dead cell");

});

test("testing the correct size of the 2D Array", function(){
	var ar = initialize(3,3);
	equal(ar.length, 3, "checking the size of 2D array after initializing of equal size");
	equal(ar[0].length, 3, "checking the size of 2D array after initializing of equal size");

	var ar = initialize(9,10);
	equal(ar.length, 9, "checking the size of 2D array after initializing of smaller width");
	equal(ar[0].length, 10, "checking the size of 2D array after initializing of smaller width");

	var ar = initialize(20,15);
	equal(ar.length, 20, "checking the size of 2D array after initializing of smaller height");
	equal(ar[0].length, 15, "checking the size of 2D array after initializing of smaller height");
});


test("testing the number of live cells with checkNeighbor()", function(){
	var MAX_X = 3, MAX_Y = 3;


	var cells = [[true, true, false],[false, true, true],[false, false, false]];
	var num = checkNeighbor(1,1, cells, MAX_X, MAX_Y);
	equal(num, 3, "when itself is true");

	var cells = [[true, true, true],[true, false, true],[true, true, true]];
	var num = checkNeighbor(1,1, cells, MAX_X, MAX_Y);
	equal(num, 8, "all surrounding is true");

	var cells = [[false, false, false],[false, true, false],[false, false, false]];
	var num = checkNeighbor(1,1, cells, MAX_X, MAX_Y);
	equal(num, 0, "all but itself is false");

	var cells = [[false, true, false],[false, true, false],[false, false, false]];
	var num = checkNeighbor(0,0, cells, MAX_X, MAX_Y);
	equal(num, 2, "testing edge case");
});


test("testing the checkLifeRule() function", function(){
	var MAX_X = 3, MAX_Y = 3;
	var cells = [[true, true, false],[false, true, true],[false, false, false]];
	var life = checkLifeRule(1,1, cells, MAX_X, MAX_Y);
	equal(life, true, "checking the case cell is alive");

	var cells = [[true, true, false],[false, false, false],[false, true, false]];
	var life = checkLifeRule(1,1, cells, MAX_X, MAX_Y);
	equal(life, true, "checking the case cell is dead but comes alive");

	var cells = [[true, true, false],[false, true, true],[false, true, false]];
	var life = checkLifeRule(1,1, cells, MAX_X, MAX_Y);
	equal(life, false, "an alive cell becomes dead");

	var cells = [[true, true, false],[false, false, true],[false, true, false]];
	var life = checkLifeRule(1,1, cells, MAX_X, MAX_Y);
	equal(life, false, "an alive cell stays dead");
});


test("testing update function", function(){
	var MAX_X = 3, MAX_Y = 3;
	var old_cell = [[true, true, false],[false, true, true],[false, false, false]];
	var sol = [[true, true, true],[true, true, true],[false, false, false]];

	var new_cell = update(MAX_X, MAX_Y, old_cell);
	
	for(var i=0; i<3; i++){
		for(var j=0; j<3; j++){
			equal(new_cell[i][j], sol[i][j], "checking the updated cells");
		}
	}

});









