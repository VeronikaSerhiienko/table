;(function() {
  var buttons = document.querySelectorAll('.js-tab-links');
  var text = document.querySelectorAll('.js-tab-content');
  buttons.indexOf = [].indexOf;


  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function() {
      for (var j = 0; j < buttons.length; j++) {
        buttons[j].classList.remove('tabs-module__list-button--active');
        text[j].classList.remove('tabs-module__text-block--active');
      }
      this.classList.add('tabs-module__list-button--active');
      var position = buttons.indexOf(this);
      text[position].classList.add('tabs-module__text-block--active');
    });
  }
})();