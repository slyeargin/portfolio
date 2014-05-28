(function() {
  'use strict';

  $(document).ready(init);

  var clock;
  var timer;
  var numbers;
  var flipCount = 0;

  function init() {
    $('#start').click(startGame);
  }

  function startGame() {
        generateArray();
        shuffleArray();
        loadArray();

        clearInterval(timer);
        clock = $('#clock').data('time')*1;
        timer = setInterval(updateClock,1000);
        $('#game td').click(reveal);
      }

  function generateArray(){
      numbers = [];

      for (var i = 0; i < 2; i++){
        for (var j = 0; j < 10; j++){
          numbers.push(j);
        }
      }
    }

  function shuffleArray() {
    for (var i = numbers.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = numbers[i];
      numbers[i] = numbers[j];
      numbers[j] = temp;
    }
  }

  function reveal(){
    $(this).find('.flipper').addClass('rotate');

    if ($('.rotate').length < 2){
      flipCount++;
    } else {
      flipCount++;
      checkMatch();
    }
  }

  function loadArray() {
      var $back = $('.back');
      var count = $back.length;

      for (var i = 0; i < count; i++){
        var image = '<img src="/media/img/memory/card_' + numbers[i] + '.png">';
        var whichBack = $back[i];
        $(whichBack).append(image);
      }

    }

  function updateClock(){
    clock--;

    if (clock > 0 && clock < 10){
      warning();
    } else if (!clock){
      clearInterval(timer);
      results();
    }

    $('#clock').text(clock);
  }

  function warning() {
    $('#clock').css('color', '#ff0000');
  }

  function results() {
    var matches = $('.match').length;
    if (matches === 20) {
      alert ('You win!');
    } else {
      alert ('You lose.');
    }
  }

  function checkMatch() {
    var $matches = $('.rotate > .back > img');
    var img1 = $matches.eq(0).attr('src');
    var img2 = $matches.eq(1).attr('src');

    console.log($matches);
    console.log(img1);
    console.log(img2);
    console.log(flipCount);

    if (flipCount === 2){
      if (img1 === img2){
        $('.rotate').addClass('match');
        $('.rotate').removeClass('rotate');
        $('.match').off('click');
      } else {
        setTimeout(function(){
          $('.rotate').removeClass('rotate');
        }, 400);
      }
    }

    flipCount = 0;
  }


}) ();
