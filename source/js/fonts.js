'use strict';

(function() {
  var ptSerif = new FontFaceObserver('PT Serif',
    {
      weight: 'normal'
    }
  );

  var ptSerifBold = new FontFaceObserver('PT Serif',
    {
      weight: 700
    }
  );

  Promise.all([ptSerifBold.load(null, 6000), ptSerif.load(null, 6000)]).then(function () {
    document.querySelector('body').classList.add('fonts-loaded');
  }, function() {
      console.log('Error loading font');
  });

})();
