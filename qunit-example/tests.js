test("testing toString", function() {
	var empty = Set();
	equal(empty.toString(), "{}", "empty set");
	var s1 = Set().insert(1);
	equal(s1.toString(), "{1}", "singleton");
	var s12 = Set().insert(1).insert(2);
	equal(s12.toString(), "{1, 2}", "two element");
	var s123 = Set().insert(1).insert(2).insert(3);
	equal(s123.toString(), "{1, 2, 3}", "three element");
	var ss = Set().insert(s1);
	equal(ss.toString(), "{{1}}", "set of set");
});

test("testing insert/contains", function() {
	var empty = Set();
	equal(empty.contains(1), false, "empty set");
	var s1 = Set().insert(1);
	equal(s1.contains(1), true, "singleton");
	equal(s1.contains(2), false, "singleton");
	var s12 = Set().insert(1).insert(2);
	equal(s12.contains(1), true, "two elements");
	equal(s12.contains(2), true, "two elements");
});

test("testing insert/size", function() {
	var empty = Set();
	equal(empty.size(), 0, "empty set");
	var s1 = Set().insert(1);
	equal(s1.size(), 1, "singleton");
	var s12 = Set().insert(1).insert(2);
	equal(s12.size(), 2, "two elements");
	var s122 = Set().insert(1).insert(2).insert(2);
	equal(s122.size(), 2, "duplicate");
});

test("testing remove/contains", function() {
	var empty = Set().remove(1);
	equal(empty.contains(1), false, "empty set");
	var s1 = Set().insert(1).remove(1);
	equal(s1.contains(1), false, "singleton");	
	var s12r1 = Set().insert(1).insert(2).remove(1);
	equal(s12r1.contains(1), false, "two elements, remove one");
	equal(s12r1.contains(2), true, "two elements, remove one");
	var s12r12 = Set().insert(1).insert(2).remove(1).remove(2);
	equal(s12r12.contains(1), false, "two elements, remove both");
	equal(s12r12.contains(2), false, "two elements, remove both");
});

test("testing clear", function() {
	var empty = Set().clear();
	equal(empty.size(), 0, "empty");
	var s1c = Set().insert(1).clear();
	equal(s1c.size(), 0, "singleton");
	var s12c = Set().insert(1).insert(2).clear();
	equal(s12c.size(), 0, "two element");
});

test("testing equals", function() {
	var empty = Set().clear();
	// note that equals is our comparison method being tested
	// whereas equal is the Qunit testing function
	equal(empty.equals(empty), true, "empty set");
	equal(empty.equals(Set()), false, "empty set");
});

test("testing similar", function() {
	var empty = Set().clear();
	// note that equals is our comparison function being tested
	// whereas equal is the Qunit testing function
	equal(empty.similar(empty), true, "empty set");
	equal(empty.similar(Set()), true, "empty set");
	var s12 = Set().insert(1).insert(2);
	var s21 = Set().insert(2).insert(1);
	equal(s12.similar(empty), false, "different size");
	equal(s12.similar(s21), true, "different order");
	var s1 = Set().insert(1);
	var ss1 = Set().insert(s1);
	var scs1 = Set().copy().insert(s1);
	equal(ss1.similar(scs1), true, "set of sets");
	var s1c = s1.copy();
	var scs1c = Set().copy().insert(s1c);
	equal(ss1.similar(scs1c), false, "set of sets, not deep");
});

test("testing copy", function() {
	var empty = Set();
	var ec = empty.copy();
	equal(ec.similar(empty), true, "empty set");
	equal(ec.equals(empty), false, "empty set");
	var s12 = Set().insert(1).insert(2);
	var s12c = s12.copy();
	equal(s12.similar(s12c), true, "two element");
	equal(s12.equals(s12c), false, "two element");
});

test("testing pick", function() {
	var s1 = Set().insert(1);
	ok(s1.contains(s1.pick()), "singleton");
	var s12 = Set().insert(1).insert(2);
	ok(s12.contains(s12.pick()), "two elements");
});

test("testing each", function() {
	var empty = Set();
	var called = 0;
	var f = function () {called++;};
	empty.each(f);
	equal(called, 0, "empty");
	var s1 = Set().insert(1);
	called = 0;
	s1.each(f);
	equal(called, 1, "singleton");
	var s12 = Set().insert(1).insert(2);
	called = 0;
	s12.each(f);
	equal(called, 2, "two element");
	var total = 0;
	var g = function (e) {total += e;};
	var s123 = Set().insert(1).insert(3).insert(5);
	s123.each(g);
	equal(total, 9, "three element");	
});

test("testing that client cannot modify methods", function() {
	var empty = Set();
	var clear = empty.clear;
	empty.clear = undefined;
	equal(empty.clear, clear, "attempted modification of clear");
});


