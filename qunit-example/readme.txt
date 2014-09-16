This is a simple example showing how to use QUnit to test a JavaScript program. 

The files are:
-- set.js: the program under test; an implementation of a simple mutable set datatype.
-- test.html: a basic test page; this is the page that is opened in the browser to run the tests; to modify for your own use, just change the script elements to include your program under test and your test script;
-- tests.js: this is the test script, written using the QUnit utility methods. The two checks used are: ok, which tests whether an expression evaluates to true, and equal, which tests whether two expressions evaluate to equal values. The checks are grouped into tests by wrapping them with the test function.
-- resources/: this directory contains the QUnit test framework and its CSS file.

To make your own QUnit tests:
-- write your own test script (to replace tests.js)
-- modify test.html so that the file paths in the script elements refer to your test script, your program under test, and any other JavaScript files your program uses
-- remember to put the resources directory in the right location to that the files are imported properly into test.html.

