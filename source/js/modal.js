'use strict';

(function() {
  var modal = document.querySelector('.modal');
  var modalHeader = modal.querySelector('.modal__header');
  var modalClose = modal.querySelector('.modal__close');
  var modalImg = modal.querySelector('img');

  function modalShow() {
    if (!modal.classList.contains('modal--active')) {
      modal.classList.add('modal--active');
    }
  }

  function modalHide() {
    if (modal.classList.contains('modal--active')) {
      modal.classList.remove('modal--active');
    }
  }

  function zoom() {
    if (modalImg.classList.contains('zoomed') && modalHeader.classList.contains('zoomed')) {
      modalImg.classList.remove('zoomed');
      modalHeader.classList.remove('zoomed');
    } else {
      modalImg.classList.add('zoomed');
      modalHeader.classList.add('zoomed');
    }
  }

  modalClose.addEventListener('click', function(e) {
    e.preventDefault();
    modalHide();
  });

  window.addEventListener('keydown', function(event) {
    if (event.keyCode === 27 && modal.classList.contains('modal--active')) {
      modalHide();
    }
  });

  modalImg.addEventListener('click', function(e) {
    e.preventDefault();
    zoom();
  });

  var imgToEnlarge = document.querySelectorAll('.img-link');
  for (var i = 0; i < imgToEnlarge.length; i++) {
    imgToEnlarge[i].addEventListener('click', function(e) {
      e.preventDefault();
      renderModal(this);
    });
  }

  function renderModal(link) {
    modalShow();
    console.log(link.dataset.heading);
    console.log(link.dataset.text);
    if (link.dataset.heading === undefined) {
      modalHeader.querySelector('h3').innerHTML = null;
    } else {
      modalHeader.querySelector('h3').innerHTML = link.dataset.heading;
    }
    if (link.dataset.text === undefined) {
      modalHeader.querySelector('p').innerHTML = null;
    } else {
      modalHeader.querySelector('p').innerHTML = link.dataset.text;
    }
    modalImg.src = link.href;
  }
})();
