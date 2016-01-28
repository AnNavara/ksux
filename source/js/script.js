(function() {
  var nav_sandwich  = document.querySelector('.page-nav__control');
  var nav_dropdown  = document.querySelector('.page-nav__drop');

  nav_sandwich.addEventListener("click", function(e) {
    e.preventDefault;
    nav_dropdown.classList.toggle("page-nav__drop--active");
  });
})();
