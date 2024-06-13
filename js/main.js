const burger = document.querySelector('.burger');
const links = document.querySelectorAll('a[href*="#"]');
const body = document.body;
const nav = document.querySelector('.header__nav');

// Sticky header
window.addEventListener('scroll', function () {
  var header = document.querySelector('.header');
  header.classList.toggle('sticky', window.scrollY > 0)
})

// Burger
burger.addEventListener('click', function () {
  this.classList.toggle('active');
  nav.classList.toggle('open');
  body.classList.toggle('lock');
});

// smooth scrolling
links.forEach(function (link) {
  link.addEventListener('click', event => {
    event.preventDefault();

    const blockId = link.getAttribute('href').substring(1);
    if (blockId) {

      document.getElementById(blockId).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      nav.classList.remove('open');
      body.classList.remove('lock');
      burger.classList.remove('active');
    }
  });

});

function getAverageColor(imageElement) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const width = canvas.width = imageElement.width;
  const height = canvas.height = imageElement.height;
  context.drawImage(imageElement, 0, 0, width, height);

  let data = context.getImageData(0, 0, width, height).data;
  let r = 0, g = 0, b = 0, count = 0;

  for (let i = 0; i < data.length; i += 4) {
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
    count++;
  }

  r = Math.floor(r / count);
  g = Math.floor(g / count);
  b = Math.floor(b / count);

  return `rgb(${r}, ${g}, ${b})`;
}

document.addEventListener("DOMContentLoaded", function () {
  const imageElements = document.querySelectorAll('.rail__img');

  imageElements.forEach(element => {

    element.onload = function () {
      const averageColor = getAverageColor(element);
      element.style.filter = `drop-shadow(0 0 20px ${averageColor})`;
    };

    if (element.complete) {
      element.onload();
    }
  });
  function addAndRemoveFlipClass() {
    const indices = [];
    while (indices.length < 12) {
      const randomIndex = Math.floor(Math.random() * imageElements.length);
      if (!indices.includes(randomIndex)) {
        indices.push(randomIndex);
      }
    }

    const selectedElements = indices.map(index => imageElements[index]);
    selectedElements.forEach(element => element.classList.add('flip'));

    setTimeout(() => {
      selectedElements.forEach(element => element.classList.remove('flip'));
    }, 1000);
  }

  setInterval(addAndRemoveFlipClass, 4000); // Меняем изображение каждые 4 секунды
});