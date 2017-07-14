/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) { //One viable solution for a n sized board
  var solution = 0;
  var board = new Board({n: n});
  var rowStart = 0;
  var pieceCount = 0;

  var traverseBoard = function(board, rowStart, colStart, rowLength) {
    for (var colIndex = colStart; colIndex < rowLength; colIndex++) {
      //Place a piece for testing
      board.togglePiece(rowStart, colIndex);
      console.log(JSON.stringify(board.rows()));
      //Test if the piece has conflicts
      if (!board.hasAnyRooksConflicts()) {
        // //If there is not conflict, we want to call the traverse board again
        pieceCount++;
        if (pieceCount !== n) {
          return traverseBoard(board, rowStart + 1, colStart, rowLength);
        } else {
          console.log('Solution Found');
          return true;
        }
      }
      board.togglePiece(rowStart, colIndex);
      console.log(JSON.stringify(board.rows()));
    }
  };

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  solution = +traverseBoard(board, rowStart, 0, n);
  return board.rows();

};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  //If piece is placed reset the col index  
  var solutionCount = 0; //fixme
  
  var solution = 0;
  var board = new Board({n: n});
  var rowStart = 0;
  var pieceCount = 0;
  var firstPieceIsPlaced = false;
  
  var traverseBoard = function(board, rowStart, colStart, rowLength) {
    for (var colIndex = colStart; colIndex < rowLength; colIndex++) {
      //Place a piece for testing
      if (!firstPieceIsPlaced) {
        board.togglePiece(rowStart, colIndex);
        firstPieceIsPlaced = true;
        colStart = 0;
      } else {
        board.togglePiece(rowStart, colIndex);
      }
      
      console.log('Piece Added   ' + JSON.stringify(board.rows()));
      //Test if the piece has conflicts
      if (!board.hasAnyRooksConflicts()) {
        // //If there is not conflict, we want to call the traverse board again
        pieceCount++;
        if (pieceCount !== n) {
          return traverseBoard(board, rowStart + 1, colStart, rowLength);
        } else {
          console.log('Solution Found');
          return true;
        }
      }
      board.togglePiece(rowStart, colIndex);
      console.log('Piece Removed ' + JSON.stringify(board.rows()));
    }
  };
  
  for (var i = 0; i < n; i++) {
    var colStart = i;
    var result = false;
    result = traverseBoard(board, rowStart, colStart, n);
    if (result) {
      firstPieceIsPlaced = false;
      solutionCount++;
      var board = new Board({n: n});
      pieceCount = 0;
    }
  }
  
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount.length;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};