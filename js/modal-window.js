;(function() {
  var modalWrapper = document.querySelector('.js-modal-window-wrapper');
  var modalWindow = document.querySelector('.js-modal-window');
  document.querySelector('.js-modal-window-button-open').addEventListener('click', function(event) {    
    setTimeout(function() {
      modalWindow.classList.add('visible');
      modalWrapper.classList.add('visible');
    },500);
  });

  document.querySelector('.js-button-close').addEventListener('click', function(event) {
    modalWindow.classList.remove('visible');
    modalWrapper.classList.remove('visible');
  });

  modalWrapper.addEventListener('click', function(event) {
    modalWindow.classList.remove('visible');
    modalWrapper.classList.remove('visible');    
  });

  modalWindow.addEventListener('click', function(event) {
    event.stopPropagation();    
  });
})();