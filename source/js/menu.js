'use strict';

(function() {
  var navControl = document.querySelector('.page-nav__control');
  var navDropdown = document.querySelector('.page-nav__drop');

  navControl.addEventListener('click', function(e) {
    e.preventDefault();
    navDropdown.classList.toggle('page-nav__drop--active');
    navControl.classList.toggle('page-nav__control--active');
  });
})();
