(function(){
  'use strict';

  $(document).ready(initialize);

  function initialize() {
    $('#title').click(title);
    $('.number').click(display);
    $('.operator').click(operator);
    $('.clear').click(clear);
    $('.decimal').click(decimal);
    $('.toggle').click(toggle);
    $('#push').click(push);
  }

  function title(){
    var display = $('#calculator').css('display');
    if (display === 'none') {
      $('#calculator').fadeIn();
    } else {
      $('#calculator').fadeOut();
    }
  }

  function display(){
    var num = this.textContent;
    var output = $('#display').text();
    if (output === '0') {
      output = num;  // remove leading zeroes
    } else {
      output += num; // concatenate two strings
    }
    $('#display').text(output); // display new string
  }

  function clear(){
    if (this.textContent === 'C'){
      $('#display').text('0'); // replaces #display string
    } else {
      $('#queue').empty();
    }
  }

  function toggle(){
    var display = $('#display').text();
    $('#display').text(display * -1);
  }

  function operator(){
    var op = $(this).data('op');
    var x = $('#queue > div:nth-child(1)').text() * 1;
    var y = $('#queue > div:nth-child(2)').text() * 1;
    var result;
    switch(op) {
      case 'add':
        result = x + y;
        break;
      case 'sub':
        result = x - y;
        break;
      case 'mul':
        result = x * y;
        break;
      case 'div':
        result = x / y;
        break;
      case 'sub':
        result = x - y;
        break;
      case 'exp':
        result = Math.pow(x,y);
        break;
      case 'root':
        result = Math.sqrt(x);
        break;
      case 'fact':
        result = factorial(x);
        break;
      case 'sum':
        result = sum();
        break;
    }
    $('#display').text(result);
  }

  function factorial(x) {
    var fact = 1;
    for (var i = 1; i <= x; i++){
      fact *= i;
    }
  }

  function sum(){
    var total = 0;
    $('#queue > div').each(function (index, div) {
      var x = div.textContent * 1;
      total += x;
    });
    return total;
  }

  function decimal() {
    var display = $('#display').text();
    var noDecimal = display.indexOf('.') === -1;
    if (noDecimal) {
      $('#display').text(display + '.');
    }
  }

  function push(){
    var display = $('#display').text();
    $('#display').text(0);
    var $div = $('<div>');
    $div.text(display);
    $('#queue').prepend($div);
  }

})();
