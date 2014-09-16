// 6170 Software Studio
// Sample code
// Author: Daniel Jackson
// September 12, 2013

// same as Object.create in ECMAScript 5
// return a fresh object whose prototype is o
var createObject = function (o) {
	var F = function () {}
	F.prototype = o;
	return new F();
}

// FIXME
// more general version should first check if x has an equals method,
// and if so, call that?
var equals = function (x, y) {
	if (x instanceof Set) return x.equals(y);
	return x === y;
}

// mutable set datatype
var Set = function () {
	// rep invariant: no duplicates
	var elts = [];

	// create an object with Set.prototype as its prototype
	// so that constructor and instanceof tests will work
	var that = createObject(Set.prototype);
	
	// insert an element into the set
	// return this set
	that.insert = function (e) {
		if (!that.contains(e)) elts.push(e);
		return that;
		}

	// remove an element from the set
	// return this set
	that.remove = function (e) {
		// for now, just copy; asymptotically no worse than bubbling
		// can't replace with top element anyway, since that breaks order
		var es = [];
		that.each(function (x) {if (!equals(e,x)) es.push(x);})
		elts = es;
		return that;
		}

	// an iteration abstraction
	// call the function body on each element of the set
	// return this set
	that.each = function (body) {
		elts.forEach(function (e) {body(e);});
		return that;
		}
		
	// return a copy of the set
	// containing the same elements
	that.copy = function () {
		var result = Set();
		that.each(function (e) {result.insert(e);});
		return result;
		}

	// remove all elements from this set
	// return this set
	that.clear = function () {
	  elts = [];
		return that;
		}

	// return the number of elements in the set
	that.size = function () {
		return elts.length;
		}

	// return true iff the set contains e
	that.contains = function (e) {
		var result = false;
		that.each(function (x) {
			if (equals(x,e)) result = true;
			});
		return result;
		}

	// return a randomly chosen element
	that.pick = function (set) {
		var i = Math.floor((Math.random()*elts.length)+1) - 1;
		return elts[i];
		}

	// return true iff this set and s are the same object
	that.equals = function (s) {return that == s;}

	// return true iff this set and s contain the same elements
	// note that same element is determined using equality,
	// so this is not a deep similarity test
	that.similar = function (s) {
		if (!(s instanceof Set)) return false;
		if (!(s.size() == that.size())) return false;
		var result = true;
		that.each (function (e) {
			if (!s.contains(e)) result = false;
			});
		return result;
		}

	// a string representation of this set
	that.toString = function () {
		var result = "{";
		var first = true;
		that.each(function (e) {
			if (!first) result += ", ";
			first = false;
			result += e;
			});
		return result + "}";
		}
		
	// prevent modification of object slots
	Object.freeze(that);
	return that;
	}
