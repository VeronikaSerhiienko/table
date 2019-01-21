;(function() {
  var slider = document.getElementById('slider');
  var imageList = slider.querySelector('ul'); 
  var imageArray = slider.querySelectorAll('li');
  var previous = slider.querySelector('.previous');
  var next = slider.querySelector('.next');
  var currentSlide = 0;
  var width = 130; //width of images
  var amountOfSlidesToSee = 3;

  if (slider && imageList && imageArray && next && previous) {
    previous.addEventListener("click", switchToPreviousSlide);
    next.addEventListener("click", switchToNextSlide);
  } else {
    console.log('Help, I can`t find elements');
  }
  
  function switchToNextSlide() {
    currentSlide = Math.max(currentSlide - width * amountOfSlidesToSee, -width * (imageArray.length - amountOfSlidesToSee));
    imageList.style.marginLeft = currentSlide + 'px';
  }

  function switchToPreviousSlide() {
    currentSlide = Math.min(currentSlide + width * amountOfSlidesToSee,0);
    imageList.style.marginLeft = currentSlide + 'px';
  }
}());