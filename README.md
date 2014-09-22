proj1
=====

Game of Life

Link to Game of Life: http://msuh.github.io/GameOfLife/

Phase2 -----------------------------------------------------------------------------------------

Grading directions
  [Highlights]
  1. https://github.com/6170-fa14/msuh_proj1/blob/4bafcbe72c2b78ad38f6a996fed095d75bf3020f/draw_gameOfLife.js#L251-L262
      Choices for randomized, space gun, and pulsar positions. 
  2. https://github.com/6170-fa14/msuh_proj1/blob/4bafcbe72c2b78ad38f6a996fed095d75bf3020f/draw_gameOfLife.js#L241-L245
      My Special Feature: Users are able to change the cell colors while the game is going on (without stopping and starting again). 


Programming
  see code

  [Testing]
  testing automatically generated with quit when 'test.html' opens

Design challenges
  1. [Concept]
      Now that Phase2 requires DOM elements for the cells rather than canvas, I was considering between different elements such as div, table, list, etc. for representation. Table is easiest to manage something with rows and columns, but usually tends to have an inconsistent sizing at times based on the elements inside the <td>s. However, I've decided to use the table because the cells do not contain text or other element but are simply filled with changing background color.
  2. [Implementation]
      When implementing the changing colors, I was split between using different classes with different "background-color" and embedded css properties in the html elements. Using class with an external css file is a lot easier to manage the properties, but trying to change the css property of a certain class ( $(".someClass").css("background-color","color") ) results in changing the inline css property of all elements that have ".someClass", becuase the actual css file cannot be changed through jQuery. I've decided to still use the classes by doing a bit more work for each step. 
  3. [Behavior]
      I've implemented the changing starting positions and color so that they change without restarting the positions or without starting or stopping the cell proporgation.

----


Phase1 -----------------------------------------------------------------------------------------

Grading directions
  [Highlights]
  1. https://github.com/6170-fa14/msuh_proj1/blob/4bafcbe72c2b78ad38f6a996fed095d75bf3020f/draw_gameOfLife.js#L52-L69
     Number of randomized living cells can be controlled by the probability entered into the function! When I make this more interactive with the user, I can have set initial positions OR randomized states that users can explore with based on different life probability.
  2. https://github.com/6170-fa14/msuh_proj1/blob/4bafcbe72c2b78ad38f6a996fed095d75bf3020f/index.css#L6-L14
     The game container is dynamically centered to the middle of the browser window! This natural positioning is more comfortable for the users.

  [Questionable parts]
  1. Test function: https://github.com/6170-fa14/msuh_proj1/blob/4bafcbe72c2b78ad38f6a996fed095d75bf3020f/testFunctions.js#L29-L45
     Original function:https://github.com/6170-fa14/msuh_proj1/blob/4bafcbe72c2b78ad38f6a996fed095d75bf3020f/draw_gameOfLife.js#L110-L127
    I have made test cases for each private methods I have used to create the game. Because the functions are private, I have take them out to a separate external js file to test them (which I know is the right thing to do from the explanations in Piazza). But something I was unsure about is: I use parameters already defined in the outer function, which are not present in these external js files.. so I added a few more parameters to I could manually insert to test the function while leaving the inner code EXACTLY the same. Is this valid? If not, what would I do?


Programming
  See code
  
  [Testing]
  testing automatically generated with quit when 'test.html' opens


Design challenges 
  1. [Concept] Data structure for representing the 2-dimensional space
    The first concern when creating this project was how to represent the cells. Because a 2-dimensional space is a common structure for a lot of visual representations, I chose a 2D Array to represent the rows and columns. This way it is easiest to access the element with given row# and col#. And each value is a boolean of either True or False to represent life and death. Among other types of data like String, number, and object, I believed boolean was the best way to represent a life or death situation for many reasons. 
  2. [Implementation] Storing and executing the 2D Array
    I had to consider different ways of storing and executing the game of life. I created a varable that is assigned to an anonymous function (GameOfLife) to start the game. GameOfLife() takes two arguments that specify the number of columns and rows that will be assigned to the given space. I made it so that the other parameters can be easily manipulated (for phase2). Because GameOfLife at this phase1 stage is self-generating, which doesn't take any user input. Thus, I made all the objects and functions private and inaccessible from outside.
  3. [Behaviors] Color of cells, time between each step
    I explored different time between each step. I ended up choosing 0.5sec which seemed fast enough to see multiple transitions but also slow enough to absorb the previous stages. And I chose green because it was easy to distinguish the life from death. 
  4. [Behaviors] Position and size of the Game of Life Box
    I made the game container always be centered in the browser window so that the position is most natural to the users. Though the game of life indicates that this is a infinite 2D space, I defined set boundaries since infinte space is impossible, and our purpose of the game is to see the propagation pattern rather than the physical size of the game.
