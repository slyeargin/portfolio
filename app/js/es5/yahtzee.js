(function() {
  'use strict';

  $(document).ready(init);

  var currentUser = 0;
  var currentRoll = 3;
  var frozen;
  var numDice;

  function init(){
    $('#addPlayer').click(addPlayer);
    $('.arrow').click(arrow);
    $('#addScore').click(addScore);
    $('body').keydown(move);
    $('#roll').click(roll);
    $('.dice').click(freeze);

    numDice = $('.dice').length;
    frozen = $('.frozen').length;
  }

  function freeze() {
    $(this).toggleClass('frozen');
  }

  function roll() {
    var $dice = $('.dice:not(.frozen)');
    var count = $dice.length;

    for (var i = 0; i < count; i++){
      var num = Math.floor(Math.random() * 6) + 1;
      var dice = $dice[i];
      $(dice).attr('src', './media/dice_' + num + '.png');

    }

  }

  function addScore(event) {
    var score = $('#score').val();
    var $current = $('#game > tbody > tr.horizontal > td.vertical');

    $current.text(score);
    $('#score').val('');
    event.preventDefault();
  }

  function move(event){
    if(event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 40) {
      event.preventDefault();
    }
    switch(event.keyCode){
      case 38:
        currentUser--;
        break;
      case 40:
        currentUser++;
        break;
      case 37:
        currentRoll--;
        break;
      case 39:
        currentRoll++;
        break;
    }

    paintScreen();
  }

  function arrow(){
    switch(this.id){
      case 'up':
        currentUser--;
        break;
      case 'down':
        currentUser++;
        break;
      case 'left':
        currentRoll--;
        break;
      case 'right':
        currentRoll++;
        break;
    }

    paintScreen();
  }

  function paintScreen() {
    $('.horizontal').removeClass();
    var $trs = $('#game > tbody > tr');
    var tr = $trs[currentUser];
    $(tr).addClass('horizontal');
    $('.vertical').removeClass();
    $trs.children('td:nth-child(' + currentRoll + ')').addClass('vertical');
  }

  function addPlayer(event){
    var username = $('#username').val();
    var avatar = $('#avatar').val();

    createRow(username, avatar);
    $('#username').val('');
    $('#avatar').val('');
    event.preventDefault();
  }

  function createRow(username, avatar) {
    var $tr = $('<tr>');
    var tds = [];

    for (var i = 0; i < 16; i++){
      tds.push('<td></td>');
    }

    $tr.append(tds);
    $('#game > tbody').append($tr);

    var count = $('#game > tbody > tr').length;
    if (count === 1){
      $tr.addClass('horizontal');
    }

    var $img = $('<img>');
    $img.addClass('avatar');
    $img.attr('src', avatar);

    $tr.children('td:nth-child(1)').append($img);
    $tr.children('td:nth-child(2)').text(username);
    $tr.children('td:nth-child(3)').addClass('vertical');
  }

}) ();
