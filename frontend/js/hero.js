export function initSlider() {
  const track = document.querySelector('.slider_track');
  const slides = document.querySelectorAll('.slider_track img');

  if (!track || slides.length === 0) {
    return;
  }

  let index = 0;

  function getSlideWidth() {
    return slides[0].clientWidth;
  }

  function moveSlide() {
    index++;
    const slideWidth = getSlideWidth();
    track.style.transition = 'transform 0.5s ease-in-out';
    track.style.transform = `translateX(-${slideWidth * index}px)`;

    if (index >= slides.length - 3) {
      setTimeout(() => {
        track.style.transition = 'none';
        index = 0;
        track.style.transform = `translateX(0px)`;
      }, 500);
    }
  }

  setInterval(moveSlide, 3000);
}