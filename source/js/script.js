(function() {
  var navSandwich = document.querySelector('.page-nav__control');
  var navDropdown = document.querySelector('.page-nav__drop');

  navSandwich.addEventListener('click', function(e) {
    e.preventDefault();
    navDropdown.classList.toggle('page-nav__drop--active');
  });
})();

(function() {
  var imgMoveList = document.querySelectorAll('.img-move');

  for (var i = 0, len = imgMoveList.length; i < len; ++i) {
    imgMoveList[i].addEventListener('click', function(e) {
      e.preventDefault();
      this.classList.toggle('img-move--show');
    });
  }
})();

(function() {

  function btnActivate(btnSlide, btnClassActivate) {
    if (!btnSlide.classList.contains(btnClassActivate)) {
      btnSlide.classList.add(btnClassActivate);
    }
  }

  function btnClear(btnSlide, btnClassClear) {
    if (btnSlide.classList.contains(btnClassClear)) {
      btnSlide.classList.remove(btnClassClear);
    }
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function promoSlider(promoSlide) {
    if (document.querySelector(promoSlide) !== null) {
      var slider = document.querySelector(promoSlide);
      var sliderJquery = $(promoSlide + ' .slider__content');
      var sliderPrev = slider.querySelector('.slider__prev');
      var sliderNext = slider.querySelector('.slider__next');

      sliderJquery.on('init', function(event, slick) {
        slider.querySelector('.slider__counter').innerHTML = 1 + '&nbsp;/&nbsp;' + slider.querySelectorAll('.slider__item').length;
        if (!sliderPrev.classList.contains('slider__prev--last')) {
          sliderPrev.classList.add('slider__prev--last');
        }
      });

      sliderJquery.slick({
        prevArrow: sliderPrev,
        nextArrow: sliderNext,
        infinite: false,
        draggable: false,
        lazyLoad: 'ondemand',
        fade: true,
        cssEase: 'linear',
        speed: 200,
        autoplay: true,
        autoplaySpeed: 1500 + getRandomInt(500, 1500)
      });

      sliderJquery.on('afterChange', function(event, slick, currentSlide, nextSlide) {
        var indexLength = slider.querySelectorAll('.slider__item').length;
        slider.querySelector('.slider__counter').innerHTML = currentSlide + 1 + '&nbsp;/&nbsp;' + indexLength;
        if (currentSlide === 0) {
          btnActivate(sliderPrev, 'slider__prev--last');
          btnClear(sliderNext, 'slider__next--last');
        } else if (currentSlide + 1 === indexLength) {
          btnActivate(sliderNext, 'slider__next--last');
          btnClear(sliderPrev, 'slider__prev--last');
        } else {
          btnClear(sliderNext, 'slider__next--last');
          btnClear(sliderPrev, 'slider__prev--last');
        }
      });
    }
  }

  promoSlider('.js-promo-slider__2');
  promoSlider('.js-promo-slider__1');
})();

(function() {

  function sliderFull(fullSlide) {
    if (document.querySelector(fullSlide) !== null) {
      var slideEl = document.querySelector(fullSlide);
      var sliderFullJquery = $(fullSlide + ' .slider__content--full');
      var sliderPrev = slideEl.querySelector('.slider__prev');
      var sliderNext = slideEl.querySelector('.slider__next');

      sliderFullJquery.slick({
        prevArrow: sliderPrev,
        nextArrow: sliderNext,
        infinite: false,
        draggable: false,
        lazyLoad: 'ondemand'
      });
    }
  }

  sliderFull('.js-full-slider__1');
  sliderFull('.js-full-slider__2');
})();
