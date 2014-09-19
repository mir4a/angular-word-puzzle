angular.module('app', []);

angular.module('app').controller('MainController', ['$scope', function () {
  this.hideWelcome = false;
  this.showGame = false;

  this.startGame = function (value) {
    this.hideWelcome = value;
    this.showGame = value;
  };

}]);

angular.module('app').controller('GameController', ['$scope', function ($scope, MainController) {

  // 26 Weird words https://voxy.com/blog/index.php/2011/03/weird-english-words-from-a-to-z/
  // TODO: Check for few words
  var words = ['angular', 'kakorrhaphiophobia', 'jentacular', 'impignorate', 'halfpace', 'firman', 'gabelle', 'erinaceous', 'doodle sack', 'cabotage', 'agastopia', 'lamprophony', 'macrosmatic', 'nudiustertian', 'pauciloquent'];
  var self = this;

  self.giveUp = false;

  self.currentWord = '';
  var asciiLetters = {
    "65" : "A",
    "66" : "B", "67": "C", "68": "D", "69": "E", "70": "F",
    "71" : "G", "72": "H", "73": "I", "74": "J", "75": "K",
    "76" : "L", "77": "M", "78": "N", "79": "O", "80": "P",
    "81" : "Q", "82": "R", "83": "S", "84": "T", "85": "U",
    "86" : "V", "87": "W", "88": "X", "89": "Y", "90": "Z",
    "97" : "a", "98": "b", "99": "c", "100": "d",
    "101": "e", "102": "f", "103": "g", "104": "h", "105": "i",
    "106": "j", "107": "k", "108": "l", "109": "m", "110": "n",
    "111": "o", "112": "p", "113": "q", "114": "r", "115": "s",
    "116": "t", "117": "u", "118": "v", "119": "w", "120": "x",
    "121": "y", "122": "z"
  };

  var selectedWord = words[0];

  self.guessWord = '';
  self.guessLetter = '';
  self.enteredLetters = [];
  self.enteredKeyCodes = [];
  self.gameOver = false;
  self.win = false;
  self.attempts = 1;

  self.setGuessLetter = function (event) {
    var keyCode = event.keyCode;
    console.log(keyCode);

    if (asciiLetters[keyCode] !== undefined) {
      console.log(asciiLetters[keyCode]);
      self.enteredLetters.push(self.guessLetter);
      self.enteredKeyCodes.push(keyCode);
      self.checkLetter(self.guessLetter);
    }

    event.target.blur();
  };

  self.resetGuessInput = function () {
    self.guessLetter = '';
  };

  self.startTheGame = function () {
    self.attempts = selectedWord.length;
    for (var i = 0; i < selectedWord.length; i++) {
      self.currentWord += '*';
    }
    return self.currentWord;
  };

  self.spliceSlice = function(str, index, count, add) {
    return str.slice(0, index) + add + str.slice(index + count);
  };

  self.checkLetter = function (letter) {
    var patt = new RegExp(letter, 'g');

    self.attempts--;

    while ((match = patt.exec(selectedWord)) != null) {
      console.log('match.index = ' + match.index);
      self.currentWord = self.spliceSlice(self.currentWord, match.index, 1, letter);
    }

    if (self.checkWord(self.currentWord)) {
      self.endGame();
    }

  };

  self.checkWord = function(word) {
    return word === selectedWord;
  };

  self.endGame = function () {
    if (self.checkWord(self.currentWord)) {
      self.finalMessage = 'You Won!';
      self.win = true;
    } else {
      self.finalMessage = 'You Lose!';
    }
    self.guessWord = selectedWord;
    self.gameOver = true;
  };

  self.looseGame = function () {
    self.finalMessage = 'You Lose!';
  };


  $scope.$watch('main.showGame', function (newValue, oldValue) {
    if (newValue !== oldValue) {
      self.startTheGame();
    }
  }, true);

  $scope.$watch('game.attempts', function (newValue, oldValue) {
    if (newValue <= 0) {
      self.endGame();
    }
  });

}]);