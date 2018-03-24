document.addEventListener('DOMContentLoaded', function() {
  var slideModule = function(slideDuration) {
    var viewer = document.getElementsByClassName('viewer')[0];
    var slideWraper = document.getElementsByClassName('slide-wraper')[0];
    var pages = document.querySelectorAll('li');

    var currentIndex = 0;
    var pageWidth = viewer.clientWidth;

    let timer = null;

    var setPageWidth = function() {
      pages.forEach(function(pageEle) {
        pageEle.style.width = `${pageWidth}px`;
      })
    };

    var jumpPage = function(targetPageNumber) {
      slideWraper.style.left = `-${targetPageNumber * pageWidth}px`;
      if (!timer) {
        startInterval();
      }
    }

    var startInterval = function() {
      timer = setInterval(function() {
        ++currentIndex;
        if (currentIndex < pages.length) {
          jumpPage(currentIndex);
        } else {
          currentIndex = 0;
          jumpPage(currentIndex);
        }
      }, slideDuration);
    };

    var removeTimer = function() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    var prevBtn = document.getElementById('prev-btn');
    var nextBtn = document.getElementById('next-btn');

    prevBtn.addEventListener('click', function() {
      if (currentIndex > 0) {
        removeTimer();
        --currentIndex;
        jumpPage(currentIndex);
      } else {
        return;
      }
    })

    nextBtn.addEventListener('click', function() {
      if (currentIndex === pages.length - 1) {
        return;
      } else {
        removeTimer();
        ++currentIndex;
        jumpPage(currentIndex);
      }
    })
    // init setting
    setPageWidth();
    startInterval();
  }

  slideModule(1000);
});