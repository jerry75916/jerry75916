'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');
const btnList = document.querySelector('.nav__links');
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
//////////////////////////////////////////////////////

const learnMoreLabel = document
  .querySelector('.btn--scroll-to')
  .addEventListener('click', function (e) {
    e.preventDefault();
    document
      .querySelector('#section--1')
      .scrollIntoView({ behavior: 'smooth' });
  });

const randomInt = (max, min) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const generalRandomRGB = function (max, min) {
  return `RGB(${randomInt(max, min)},${randomInt(max, min)},${randomInt(
    max,
    min
  )})`;
};

btnList.addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const attribute = e.target.getAttribute('href');
    document.querySelector(attribute).scrollIntoView({ behavior: 'smooth' });
  }
});

const handlecover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', handlecover.bind(0.5));

nav.addEventListener('mouseout', handlecover.bind(1));

const operations = document.querySelectorAll('.operations__tab');
const operationsContainer = document.querySelector(
  '.operations__tab-container'
);
const operationContents = document.querySelectorAll('.operations__content');

operationsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;
  operations.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');
  operationContents.forEach(t =>
    t.classList.remove('operations__content--active')
  );
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});
const section1 = document.querySelector('#section--1');
const iditcords = section1.getBoundingClientRect();
const navheight = nav.getBoundingClientRect().height;
const obStickyCallback = entries => {
  const [entry] = entries; //entries[0]

  if (!entry.isIntersecting) {
    //只要拿第一筆看即可非交集時=看不到target時
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky'); //看得到target 時
  }
};
const obStickyOptions = {
  root: null, //all view
  threshold: 0,
  rootMargin: `-${navheight}px`,
};
const headerElement = document.querySelector('.header');
const observer = new IntersectionObserver(obStickyCallback, obStickyOptions);
observer.observe(headerElement);

const sections = document.querySelectorAll('.section');
const sectionOption = {
  root: null,
  threshold: 0.15,
};
const callbackSection = (entries, observer) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const observerSection = new IntersectionObserver(
  callbackSection,
  sectionOption
);
sections.forEach(s => {
  observerSection.observe(s);
  // s.classList.add('section--hidden');
});

const Imgs = document.querySelectorAll('[data-src]');

const ImgObserverOption = {
  root: null,
  threshold: 0.8,
};
const ImgObserverCallback = (entries, observer) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', () => {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};
const img_observer = new IntersectionObserver(
  ImgObserverCallback,
  ImgObserverOption
);

Imgs.forEach(i => img_observer.observe(i));
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
let currentSlider = 0;
const maxSlide = slides.length;
const dots = document.querySelector('.dots');
const createDots = function () {
  slides.forEach(function (_, i) {
    dots.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};
const activeDots = function (slide) {
  const Adots = document.querySelectorAll('.dots__dot');

  Adots.forEach(dot => {
    dot.classList.remove('dots__dot--active');
  });

  document
    .querySelector(`[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};
const goToSlider = function (slider) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slider)}%)`;
  });
};
dots.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const target = e.target.dataset.slide;
    currentSlider = Number(target);
    goToSlider(target);
    activeDots(target);
  }
});

const initSlide = function () {
  createDots();
  activeDots(0);
  goToSlider(0);
};
initSlide();
const goToNexSlider = function () {
  if (currentSlider === maxSlide - 1) {
    currentSlider = 0;
  } else {
    currentSlider++;
  }
  activeDots(currentSlider);
  goToSlider(currentSlider);
};
//-100 0 100 200  slide=1 點一下
//-200 -100 0 100 slide=2 點二下
//-300 -200 -100 0 Slide=3 點三下

const goToleftslider = function () {
  //與右滑相反
  if (currentSlider > 0) {
    currentSlider--;
  } else {
    currentSlider = maxSlide - 1;
  }
  activeDots(currentSlider);
  goToSlider(currentSlider);
};
btnRight.addEventListener('click', goToNexSlider);
btnLeft.addEventListener('click', goToleftslider);
document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') goToleftslider();
  e.key === 'ArrowRight' && goToNexSlider();
});
