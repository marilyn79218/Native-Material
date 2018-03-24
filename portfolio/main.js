document.addEventListener('DOMContentLoaded', function() {
  var close = true;
  var checkbox = document.getElementById('slider-checkbox');
  var label = document.getElementById('slider-label');
  var portfolio = document.getElementsByClassName('portfolio-div')[0];

  checkbox.setAttribute('checked', close);

  checkbox.addEventListener('change', function() {
    close = !close;
    checkbox.setAttribute('checked', close);

    if (!close) {
      portfolio.style.left = '150px';
    } else {
      portfolio.style.left = '0';
    }
  })
  
})