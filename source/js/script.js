'use strict';

(function() {
  var navSandwich = document.querySelector('.page-nav__control');
  var navDropdown = document.querySelector('.page-nav__drop');

  navSandwich.addEventListener('click', function(e) {
    e.preventDefault();
    navDropdown.classList.toggle('page-nav__drop--active');
  });
})();

(function() {
  var imgToMoveList = document.querySelectorAll('.img-move');

  for (var i = 0, len = imgToMoveList.length; i < len; ++i) {
    imgToMoveList[i].addEventListener('click', function(e) {
      e.preventDefault();
      this.classList.toggle('img-move--show');
    });
  }
})();

(function() {
  var promoSliders = document.querySelectorAll('.slider');
  var fullSliders = document.querySelectorAll('.slider--full');

  for (var i = 0; i < promoSliders.length; i++) {
    initSlider(promoSliders[i], 'configPromo', true, false);
  }

  for (var j = 0; j < fullSliders.length; j++) {
    initSlider(fullSliders[j], 'configFull', false, true);
  }

  function initSlider(slider, config, isPromo, isFull) {
    if (slider !== null) {
      var sliderJquery = $(slider).find('.slider__content');
      var sliderPrev = slider.querySelector('.slider__prev');
      var sliderNext = slider.querySelector('.slider__next');

      var configPromo = {
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
      };

      var configFull = {
        prevArrow: sliderPrev,
        nextArrow: sliderNext,
        infinite: false,
        draggable: false,
        lazyLoad: 'ondemand',
        adaptiveHeight: true
      };

      if (config === 'configPromo') {
        sliderJquery.slick(configPromo);
      } else if (config === 'configFull') {
        sliderJquery.slick(configFull);
      }

      if (isPromo) {
        sliderJquery.on('init', function(event, slick) {
          slider.querySelector('.slider__counter').innerHTML = 1 + '&nbsp;/&nbsp;' + slider.querySelectorAll('.slider__item').length;
        });
      }

      if (isFull) {
        updateSliderClick(slider);
      }

      if (!sliderPrev.classList.contains('slider__prev--last')) {
        sliderPrev.classList.add('slider__prev--last');
      }

      sliderJquery.on('afterChange', function(event, slick, currentSlide, nextSlide) {
        var indexLength = slider.querySelectorAll('.slider__item').length;

        if (isPromo) {
          slider.querySelector('.slider__counter').innerHTML = currentSlide + 1 + '&nbsp;/&nbsp;' + indexLength;
        }

        if (currentSlide === 0) {
          btnChangeState(sliderPrev, 'slider__prev--last');
          btnClearState(sliderNext, 'slider__next--last');
        } else if (currentSlide + 1 === indexLength) {
          btnChangeState(sliderNext, 'slider__next--last');
          btnClearState(sliderPrev, 'slider__prev--last');
        } else {
          btnClearState(sliderNext, 'slider__next--last');
          btnClearState(sliderPrev, 'slider__prev--last');
        }
      });
    }
  }

  function updateSliderClick(slider) {
    if (slider !== null) {
      slider.addEventListener('click', function(e) {
        e.preventDefault();
        $(slider).find('.slider__content--full').slick('setPosition');
      });
    }
  }

  function btnChangeState(btnSlide, btnClassActivate) {
    if (!btnSlide.classList.contains(btnClassActivate)) {
      btnSlide.classList.add(btnClassActivate);
    }
  }

  function btnClearState(btnSlide, btnClassClear) {
    if (btnSlide.classList.contains(btnClassClear)) {
      btnSlide.classList.remove(btnClassClear);
    }
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
})();

(function() {
  function rebaseToSecond(el) {
    if (el.parentNode.firstChild.nextSibling !== el) {
      el.parentNode.insertBefore(el, el.parentNode.firstChild.nextSibling);
    }
  }

  if (window.matchMedia('(max-width: 930px)').matches) {
    var promo = document.querySelector('.promo');
    var row = promo.querySelectorAll('.promo__row');

    for (var i = 0; i < row.length; i++) {
      var text = row[i].querySelector('.promo__text');
      rebaseToSecond(text);
    }
  }
})();
