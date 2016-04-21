'use strict';

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
