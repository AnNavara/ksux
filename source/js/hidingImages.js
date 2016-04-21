'use strict';

(function() {
  var imgToMoveList = document.querySelectorAll('.img-move');

  for (var i = 0, len = imgToMoveList.length; i < len; ++i) {
    imgToMoveList[i].addEventListener('click', function(e) {
      e.preventDefault();
      this.classList.toggle('img-move--show');
    });
  }
})();
