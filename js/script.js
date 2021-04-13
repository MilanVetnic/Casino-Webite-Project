console.clear();

// HEADER --
(function($) { 
  $(function() { 
    $('nav ul li a:not(:only-child)').click(function(e) {
      $(this).siblings('.nav-dropdown').toggle();
      $('.nav-dropdown').not($(this).siblings()).hide();
      e.stopPropagation();
    });
    $('html').click(function() {
      $('.nav-dropdown').hide();
    });
    $('#nav-toggle').click(function() {
      $('nav ul').slideToggle();
    });
    $('#nav-toggle').on('click', function() {
      this.classList.toggle('active');
    });
  }); 
})(jQuery);



// Image buttons --
const PrevButton = document.querySelector('#prev');
const NextButton = document.querySelector('#next');
const flipping = new Flipping();

const elImages = Array.from(document.querySelectorAll('.ui-big-image'));

let state = {
  photo: 0
};

function send(event) {
  flipping.read();
  
  const Actives = document.querySelectorAll('[data-active]');
  
  Array.from(Actives)
    .forEach(el => el.removeAttribute('data-active'));

  switch (event) {
    case 'PREV':
      state.photo--;
      break;
    case 'NEXT':
      state.photo++;
      break;
    default:
      state.photo = +event;
      break;
  }
  
  var len = elImages.length;

  state.photo = Math.max(0, Math.min( state.photo, len - 1) );

  Array.from(document.querySelectorAll(`[data-key="${state.photo}"]`))
    .forEach( el => {
    el.setAttribute('data-active', true);
  });
  
  flipping.flip();
}

PrevButton.addEventListener('click', () => {
  send('PREV');
});
NextButton.addEventListener('click', () => {
  send('NEXT');
});

send(0);


// Automatic slider
var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByTagName("img1, img2, im3");
  var dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 1); // Change image every 2 seconds
}

