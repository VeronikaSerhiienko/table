;(function() {
  var hamburger = document.querySelector('.js-hamburger');
  var menu = document.querySelector('.js-menu');
  hamburger.addEventListener('click', function(event) {
      event.target.classList.toggle('aside-menu__button-active');
      if (parseInt(menu.style.left) !== 0) {
        menu.style.left = '0%';
      } else {
        menu.style.left = '-100%';
      }
  });
})();

(function() {
  function scrollTo(element) {
    window.scroll({
      behavior: 'smooth',
      left: 0,
      top: element.offsetTop
    });
  }

  var linksArray = document.querySelectorAll('.js-menu-link');    
  for (var i = 0; i < linksArray.length; i++) {
    linksArray[i].addEventListener('click', smoothClick);
  }
  function smoothClick(event) {
    event.preventDefault();
    //take id for block with attr href 
    var id  = event.target.getAttribute('href');
    scrollTo(document.querySelector(id));
  }
})();