const scroll_pos = document.getElementById('scroll-percentage');

document.addEventListener("DOMContentLoaded", function(event) {
  document.querySelectorAll('img').forEach(function(img){
    img.style.opacity = "0.0";
  });
  handleScroll();
});


function reveal_img_scroll(scroll_page){
  document.querySelectorAll('img').forEach(function(img){
    if(
        (img.offsetTop < scroll_page) &&
        (img.style.opacity < 1)
      ){
      img.style.opacity = "1.0";
    }
  });
}

function debounce(func, wait = 15, immediate=true) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

function scrollToTop(){
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
}

const handleScroll = () => {
  const position = window.pageYOffset;


  // update scroll progress bar
  var docHeight = (document.height !== undefined) ?
                    document.height - window.outerHeight :
                    document.body.offsetHeight - window.innerHeight;
  let page_offset = (window.pageYOffset);

  let scroll_value = Math.floor( (page_offset/docHeight) * 100);
  if (scroll_value > 100) scroll_value = 100;
  scroll_pos.innerText = scroll_value;

  // reveal image on scroll
  reveal_img_scroll(page_offset + window.innerHeight)
};

window.addEventListener('scroll', debounce(handleScroll), { passive: true });