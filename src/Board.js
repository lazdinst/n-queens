// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/
      // [0, 0, 0, 0],
      // [1, 1, 0, 0],
      // [0, 0, 0, 0],
      // [0, 0, 0, 0]

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var board = this.rows();
      var eachRows = board[rowIndex];
      var rowSum = eachRows.reduce(function(current, next) {
        return current + next;
      });
      
      //If rowSum is not 1, then there is a conflict return true
      if (rowSum > 1) {
        return true;
      } else {
        return false;
      }
      
      // return rowSum < 2 ? false : true;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var board = this.rows();
      var isConflict = false;
      for (var i = 0; i < board.length; i++) {
        isConflict = this.hasRowConflictAt(i);
        if (isConflict) {
          return isConflict;
        }
      }
      return isConflict;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var board = this.rows();
      var sum = 0;
      for (var i = 0; i < board.length; i++) {
        sum += board[i][colIndex];
        if (sum > 1) {
          return true;
        }
      }
      //look at the row
      //add the same index in each
      
      return false; 
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var board = this.rows();
      var isConflict = false;
      for (var i = 0; i < board.length; i++) {
        isConflict = this.hasColConflictAt(i);
        if (isConflict) {
          return isConflict;
        }
      }
      return isConflict; 
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    
//     Major Diagonals run diagonally, top-left to bottom-right
//     Minor Diagonals run diagonally, top-right to bottom-left
    
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var board = this.rows();
      var sum = 0;
      var row = 0, col = 0, testLength;
      
      var index = majorDiagonalColumnIndexAtFirstRow;
      //If the major index is a corner
      //No diag neighbors to test
      if (board.length === 0) {
        return false;
      }
      if (Math.abs(index) + 1 === board.length) {
        return false;
      }
      
      //Conditions for valid testing
      
      if (index === 0) { //If Major Index is zero
        //There is a 1:1 relationship betweens rows and cols
        row = index;
        col = index;
        //There is a 1:1 relationship between row and col, therefore it will be
        //a symetrical test through the whole board, starting at the origin
        testLength = board.length;
        
      } else if (index < 0) { //If Major index is negative
        //There is no starting index of a negative, outside the array range
        //therefore, the col is zero
        col = 0;
        //Start testing when row, Math.abs(index) = row
        row = Math.abs(index);
        //The board has been 'sliced' into a smaller piece
        //therefore the 'board' runs from board.length - |index|
        testLength = board.length - Math.abs(index);
        
      } else if (index > 0) { //If Major index is positive
        //The col will equal the majoy col index as a start
        col = index;
        //The row will always begin at zero for this condition
        row = 0;
        //The board has been 'sliced' into a smaller piece
        //therefore the 'board' runs from board.length - index
        testLength = board.length;
      }
      
      //Iterate through the test board with the specified conditionals above
      for (row; row < testLength; row++) {
        for (col; col < testLength; col++) {
          sum += board[row][col];
          if (sum > 1) {
            return true;
          } else {
            row++;
          }
        }
      }
      return false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var board = this.rows();
      var isConflict = false;
      
      //Generate number line, ignore the corner ('-3')
      var i = -(board.length - 2);
      
      //Generate end of number line, ignore the corner ('3')
      var iLength = board.length - 1;

      //Do all test by passing index
      for (i; i < iLength; i++) {
        isConflict = this.hasMajorDiagonalConflictAt(i);
        if (isConflict) {
          return isConflict;
        }
      }
      
      return false; 
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
