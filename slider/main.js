// Ref: https://codepen.io/kylevilleneuve/pen/BYvWvR?page=2&

var sliderModule = function(slideDurationMs, slidesPerWindow) {

  slidesPerWindow = slidesPerWindow || 1;
  slideDurationMs = slideDurationMs || 5000;

  var slider = document.getElementById("slider"),
      sliderWidth = slider.offsetWidth,
      slideList = document.getElementById("sliderwrap"),
      slides = slideList.querySelectorAll("li"),
      count = 0,
      items = slides.length / slidesPerWindow,
      prev = document.getElementById("prev"),
      next = document.getElementById("next"),
      sliderButtons = document.getElementById('sliderButtons');
  
  slideList.style.transitionDuration = 0.5+'s';
  
  var setSlideWidth = function(){
    slides.forEach(function(slide){
      slide.style.width = sliderWidth / slidesPerWindow + 'px';
    });
  }

  var removeInterval = function(){
    if(interval){
      clearInterval(interval);
    }
  }
  
  var addClass = function(el, className){
    if (el.classList)
      el.classList.add(className);
    else
      el.className += ' ' + className;
  }

  var removeClass = function(el, className){
    if(el.classList)
      el.classList.remove(className);
    else
      el.className = el.className.replace(
        new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' '
      );
  }

  // add buttons
  for(var i = 0; i<items; i++){
    var button = document.createElement('li');
    button.dataset.slideTo = i;

    sliderButtons.appendChild(button);
  }

  var makeListItemActive = function(itemNumber){
    
    var items = sliderButtons.childNodes;
    
    for(var i = 0; i<items.length; i++){
      if(i === itemNumber){
        addClass(items[i], 'active');
      } else {
        removeClass(items[i], 'active');
      }
    }
  }

  var slideTo = function(int){
    slideList.style.left = "-" + int * sliderWidth + "px"

    makeListItemActive(int);
  }
 
  var prevSlide = function() {
    if(count > 0) {
      slideTo(--count);
    } else if(count >= 0) {
      count = items-1;
      slideTo(count);
    }
  };

  var nextSlide = function() {
    if(++count < items) {
      slideTo(count);
    } else if(count <= items) {
      count = 0;
      slideTo(count);
    }
  };

  var interval = setInterval(function() {
    nextSlide()
  }, slideDurationMs);

  window.addEventListener('resize', function() {
    sliderWidth = slider.offsetWidth;
    setSlideWidth();
    slideTo(count);
  });

  sliderButtons.addEventListener('click', function(e){
    removeInterval();

    count = e.target.dataset.slideTo;

    if(count)
      slideTo(+count);
  });
  
  next.addEventListener("click", function() {
    removeInterval();
    nextSlide();
  });

  prev.addEventListener("click", function() {
    removeInterval();
    prevSlide();
  });
  
  makeListItemActive(count);
  setSlideWidth();

};

window.onload = function() {
  sliderModule(4000);
}
