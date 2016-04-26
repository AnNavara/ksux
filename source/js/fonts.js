'use strict';

(function() {
  if (sessionStorage.getItem('fontsLoaded')) {
    document.querySelector('body').classList.add('fonts-loaded');
  } else {
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

    Promise.all([ptSerifBold.load(null, 12000), ptSerif.load(null, 12000)]).then(function () {
      document.querySelector('body').classList.add('fonts-loaded');
      sessionStorage.setItem('fontsLoaded', true);
    }, function() {
      console.log('Error loading font');
    });
  }

})();
