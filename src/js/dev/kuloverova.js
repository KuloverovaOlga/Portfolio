window.$ = window.jQuery = require('jquery');
import Swiper from 'swiper/bundle';
import { Fancybox, Toolbar } from '@fancyapps/ui';
import { gsap, ScrollTrigger, Draggable, MotionPathPlugin, ScrollToPlugin } from 'gsap/all';
import WOW from 'wow.js';
import VanillaTilt from 'vanilla-tilt';

import { rem } from '../utils/constants';
import { scroll } from '../utils/scroll';

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.addEventListener('load', () => {
  window.scrollTo(0, 0);
  preloader();
});

window.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);
  scroll();
  fancy();
  burger();
  about();
  works();
});



function preloader() {
  const preloader = document.querySelector('.loader'),
        wrapper = document.querySelector('.wrapper');

  preloader.style.opacity = 1;
  setTimeout(() => {
    preloader.classList.add('loader-remove');
    animBanner();
    animAbout();
    animExperience();
    animCertificate();
    animWorks();
    animContacts();
    wrapper.classList.add('isShow');
  }, 1000);
  setTimeout(() => {}, 1100);
}

function animBanner() {
  const section = document.querySelector('.banner'),
    programmer = document.querySelector('.banner__programmer-wrapper img'),
    cercleCenter = document.querySelector('.banner__programmer-circle--center'),
    cercleMiddle = document.querySelector('.banner__programmer-circle--middle'),
    cercleMoving = document.querySelector('.banner__programmer-circle--moving'),
    deskText = document.querySelectorAll('.banner__desk'),
    title = document.querySelectorAll('.banner__title-text'),
    svg = document.querySelectorAll('.banner__svg'),
    btn = document.querySelector('.banner__btn'),
    logo = document.querySelector('.header__mob-wrapper'),
    nav = document.querySelector('.header__nav-list'),
    skillBoxs = document.querySelectorAll('.banner__programmer-skill-box'),
    skills = document.querySelectorAll('.banner__programmer-skill');

  const tl = gsap.timeline();

  tl.set(section, { z: 0.1 })
    .from(deskText[0], {
      duration: 0.5,
      ease: 'easyInOut',
      y: '-=100%',
      opacity: 0
    })
    .from(
      deskText[1],
      {
        duration: 0.5,
        ease: 'easyInOut',
        y: '-=100%',
        opacity: 0
      },
      '-=0.2'
    )
    .from(
      programmer,
      {
        duration: 0.5,
        ease: 'easyInOut',
        opacity: 0
      },
      '-=0.5'
    )
    .from(
      title,
      {
        duration: 0.3,
        ease: 'easyInOut',
        x: '-=50%',
        opacity: 0
      },
      '-=0.1'
    )
    .from(svg[0], {
      duration: 0.5,
      ease: 'easyInOut',
      opacity: 0,
      x: '-=100%',
      y: '-=100%'
    })
    .from(
      svg[1],
      {
        duration: 0.5,
        ease: 'easyInOut',
        opacity: 0,
        x: '+=100%',
        y: '+=100%'
      },
      '-=0.5'
    )
    .from(
      [cercleCenter, cercleMiddle, cercleMoving],
      {
        duration: 0.5,
        ease: 'easyInOut',
        scale: 0,
        onComplete: () => {
          cercleMoving.classList.add('isBeging');

          setTimeout(() => {
            cercleMoving.classList.add('isRotate');
          }, 1200);
        }
      },
      '-=0.5'
    )
    .from(btn, {
      duration: 0.4,
      ease: 'easyInOut',
      opacity: 0,
      y: '+=100%',
      delay: 1.2
    })
    .from(
      [logo, nav],
      {
        duration: 0.4,
        ease: 'easyInOut',
        opacity: 0,
        y: '-=100%'
      },
      '-=0.4'
    );

  skillBoxs.forEach((skillBox) => {
    skillBox.addEventListener('mouseenter', () => {
      skillBox.style.transform = 'scale(1.15)';
      skills.forEach((skill) => {
        skill.style.animationPlayState = 'paused';
      });
      cercleMoving.style.animationPlayState = 'paused';
    });
    skillBox.addEventListener('mouseleave', () => {
      skillBox.style.transform = 'scale(1)';

      skills.forEach((skill) => {
        skill.style.animationPlayState = 'running';
      });
      cercleMoving.style.animationPlayState = 'running';
    });
  });
}

function animAbout() {
  const section = document.querySelector('.about'),
    title = document.querySelector('.about__title-text'),
    btn = document.querySelector('.about__btn'),
    imgBox = document.querySelector('.about__thumb-img-box'),
    img = document.querySelector('.about__thumb-img-box img'),
    thumbBox = document.querySelector('.about__thumb-box'),
    thumbs = document.querySelectorAll('.about__thumb'),
    swiper = document.querySelector('.about__swiper'),
    squares = document.querySelectorAll('.about__square');

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'middle 500px',
      end: 'bottom bottom'
    }
  });

  tl.set([section], { z: 0.1 })
    .from(title, {
      duration: 0.6,
      ease: 'easy',
      x: '-=50%',
      opacity: 0
    })
    .from(
      imgBox,
      {
        duration: 0.6,
        ease: 'easy',
        scale: 0,
        opacity: 0
      },
      '-=0.3'
    )
    .from(
      img,
      {
        duration: 0.6,
        ease: 'easy',
        y: '+=100%'
      },
      '-=0.3'
    )
    .from(
      thumbBox,
      {
        duration: 0.6,
        ease: 'easy',
        x: window.innerWidth > 768 ? '+=20%' : '0',
        y: window.innerWidth > 768 ? '0' : '-=100%',
        opacity: 0
      },
      window.innerWidth > 768 ? '-=0.3' : '-=0.2'
    )
    .from(
      thumbs[0],
      {
        duration: 0.6,
        ease: 'easy',
        y: '-=40%',
        opacity: 0
      },
      '-=0.3'
    )
    .from(
      thumbs[1],
      {
        duration: 0.6,
        ease: 'easy',
        y: '-=40%',
        opacity: 0
      },
      '-=0.3'
    )
    .from(
      thumbs[2],
      {
        duration: 0.6,
        ease: 'easy',
        y: '-=40%',
        opacity: 0,
        onComplete: () => {
          squares.forEach((square) => square.classList.add('isIncrease'));
        }
      },
      '-=0.3'
    )
    .from(
      swiper,
      {
        duration: 0.6,
        ease: 'easy',
        x: '-=40%',
        opacity: 0
      },
      '-=0.3'
    )
    .from(
      btn,
      {
        duration: 0.6,
        ease: 'easy',
        x: '+=40%',
        opacity: 0
      },
      '-=0.6'
    );
}

function animExperience() {
  const section = document.querySelector('.experience'),
    title = document.querySelector('.experience__title'),
    exps = document.querySelectorAll('.experience__item');

  gsap.set(section, { z: 0.1 });

  gsap.from(title, {
    duration: 0.3,
    ease: 'easyInOut',
    x: '+=50%',
    opacity: 0,
    scrollTrigger: {
      trigger: section,
      start: 'middle 500px',
      end: 'bottom bottom'
    }
  });

  exps.forEach((exp, index) => {
    const line = exp.querySelector('.experience__line'),
      arr = exp.querySelector('.experience__arrow'),
      company = exp.querySelector('.experience__company'),
      position = exp.querySelector('.experience__position'),
      listItem = exp.querySelectorAll('.experience__text-item'),
      point = exp.querySelector('.experience__point'),
      pointBorder = exp.querySelector('.experience__point-border'),
      date = exp.querySelector('.experience__date'),
      btn = exp.querySelector('.experience__btn'),
      img = exp.querySelector('.experience__img-box img');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: exp, // Триггер для каждого элемента
        start: 'top 60%', // Запуск при достижении 80% видимости
        once: true // Анимация запускается только один раз
      }
    });

    tl.from(point, {
      opacity: 0,
      duration: 0.5
    })
      .from(
        pointBorder,
        {
          opacity: 0,
          scale: 0.8,
          duration: 0.5
        },
        '-=0.3'
      )
      .from(
        date,
        {
          opacity: 0,
          duration: 0.5
        },
        '-=0.3'
      )
      .from(
        line,
        {
          x: index % 2 === 0 ? '-110%' : '110%', // Чередуем направление анимации
          duration: 0.3
        },
        '-=0.3'
      )
      .from(arr, {
        y: '-110%',
        duration: 0.3
      })
      .from(
        company,
        {
          y: '-=100%',
          opacity: 0,
          duration: 0.5
        },
        '-=0.3'
      )
      .from(
        position,
        {
          y: '-=100%',
          opacity: 0,
          duration: 0.5
        },
        '-=0.3'
      )
      .from(
        listItem,
        {
          x: index % 2 === 0 ? '-110%' : '110%',
          opacity: 0,
          duration: 0.3,
          stagger: 0.2
        },
        '-=0.3'
      )
      .from(
        img,
        {
          opacity: 0,
          duration: 0.5
        },
        '-=1'
      )
      .from(
        btn,
        {
          x: index % 2 === 0 ? '110%' : '-110%',
          opacity: 0,
          duration: 0.5
        },
        '-=0.3'
      );
  });
}

function animCertificate() {
  const section = document.querySelector('.certificate'),
    title = document.querySelector('.certificate__title'),
    itemSkillList = document.querySelectorAll('.certificate__skill-list'),
    itemSkills = document.querySelectorAll('.certificate__skill-item'),
    itemCert = document.querySelectorAll('.certificate__cert-item'),
    btn = document.querySelector('.certificate__btn'),
    btnSvg = document.querySelector('.certificate__btn-svg'),
    duration = 0.3;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'middle 500px',
      end: 'bottom bottom'
    }
  });

  if (window.innerWidth > 768) {
    animDesk();
  } else {
    animMob();
  }

  function animDesk() {
    tl.set(section, { z: 0.1 })
      .from(title, {
        opacity: 0,
        x: '-100%',
        duration: duration
      })
      .from(
        itemSkillList,
        {
          scale: 0,
          duration: duration
        },
        `-=${duration}`
      )
      .fromTo(
        itemSkills[11],
        {
          opacity: 0,
          y: '-500%',
          rotate: '0deg'
        },
        { opacity: 1, duration: duration, y: '0', rotate: '-11deg' }
      )
      .fromTo(
        itemSkills[10],
        {
          opacity: 0,
          y: '-500%',
          rotate: '0deg'
        },
        { opacity: 1, duration: duration, y: '0', rotate: '8deg' },
        `-=${duration}`
      )
      .fromTo(
        itemSkills[9],
        {
          opacity: 0,
          y: '-600%',
          rotate: '0deg'
        },
        { opacity: 1, duration: duration, y: '0', rotate: '-10deg' },
        `-=${duration}`
      )
      .fromTo(
        itemSkills[8],
        {
          opacity: 0,
          y: '-600%',
          rotate: '0deg'
        },
        { opacity: 1, duration: duration, y: '65%', rotate: '13deg' }
      )
      .fromTo(
        itemSkills[7],
        {
          opacity: 0,
          y: '-600%',
          rotate: '0deg'
        },
        { opacity: 1, duration: duration, y: '50%', rotate: '-15deg' },
        `-=${duration}`
      )
      .fromTo(
        itemSkills[6],
        {
          opacity: 0,
          y: '-600%',
          rotate: '0deg'
        },
        { opacity: 1, duration: duration, y: '65%', rotate: '5deg' },
        `-=${duration}`
      )
      .fromTo(
        itemSkills[5],
        {
          opacity: 0,
          y: '-600%',
          rotate: '0deg'
        },
        { opacity: 1, duration: duration, y: '70%', x: '-30%', rotate: '-12deg' }
      )
      .fromTo(
        itemSkills[4],
        {
          opacity: 0,
          y: '-600%',
          rotate: '0deg'
        },
        { opacity: 1, duration: duration, y: '115%', x: '-20%', rotate: '8deg' },
        `-=${duration}`
      )
      .fromTo(
        itemSkills[3],
        {
          opacity: 0,
          y: '-600%',
          rotate: '0deg'
        },
        { opacity: 1, duration: duration, y: '90%', x: '20%', rotate: '18deg' },
        `-=${duration}`
      )
      .fromTo(
        itemSkills[2],
        {
          opacity: 0,
          y: '-600%',
          rotate: '0deg'
        },
        { opacity: 1, duration: duration, x: '-15%', y: '165%', rotate: '12deg' }
      )
      .fromTo(
        itemSkills[1],
        {
          opacity: 0,
          y: '-600%',
          rotate: '0deg'
        },
        { opacity: 1, duration: duration, y: '160%', x: '-15%', rotate: '-11deg' },
        `-=${duration}`
      )
      .fromTo(
        itemSkills[0],
        {
          opacity: 0,
          y: '-600%',
          rotate: '0deg'
        },
        { opacity: 1, duration: duration, y: '150%', rotate: '-5deg' },
        `-=${duration}`
      )
      .to(itemSkills, {
        y: '0',
        rotate: '0deg',
        x: '0',
        duration: duration
      })
      .from(
        btn,
        {
          opacity: 0,
          x: '-110%',
          duration: duration
        },
        `-=${duration}`
      )
      .from(
        btnSvg,
        {
          opacity: 0,
          duration: duration
        },
        `-=${duration}`
      )
      .from(
        itemCert,
        {
          y: '-110%',
          opacity: 0,
          duration: 0.3,
          stagger: 0.3
        },
        `-=${duration * 3}`
      );
  }

  function animMob() {
    const tlSkillList = gsap.timeline({
      scrollTrigger: {
        trigger: itemSkillList,
        start: 'middle 500px',
        end: 'bottom bottom'
      }
    });

    const tlBtn = gsap.timeline({
      scrollTrigger: {
        trigger: btn,
        start: 'middle 500px',
        end: 'bottom bottom'
      }
    });

    const tlTitle = gsap.timeline({
      scrollTrigger: {
        trigger: title,
        start: 'middle 500px',
        end: 'bottom bottom'
      }
    });

    gsap.set(section, { z: 0.1 });

    tlTitle.from(title, {
      opacity: 0,
      x: '-100%',
      duration: duration
    });

    itemCert.forEach((item) => {
      gsap.from(item, {
        opacity: 0,
        x: '-100%',
        duration: duration,
        scrollTrigger: {
          trigger: item,
          start: 'middle 500px',
          end: 'bottom bottom'
        }
      });
    });

    tlSkillList
      .from(itemSkillList, {
        scale: 0,
        duration: 0.3
      })
      .fromTo(
        itemSkills[11],
        {
          opacity: 0,
          y: '-500%',
          rotate: '0deg'
        },
        { opacity: 1, duration: 0.3, y: '0', rotate: '-11deg' }
      )
      .fromTo(
        itemSkills[10],
        {
          opacity: 0,
          y: '-500%',
          rotate: '0deg'
        },
        { opacity: 1, duration: 0.3, y: '0', rotate: '8deg' },
        `-=0.3`
      )
      .fromTo(
        itemSkills[9],
        {
          opacity: 0,
          y: '-600%',
          rotate: '0deg'
        },
        { opacity: 1, duration: 0.3, y: '0', rotate: '-10deg' },
        `-=0.3}`
      )
      .fromTo(
        itemSkills[8],
        {
          opacity: 0,
          y: '-600%',
          rotate: '0deg'
        },
        { opacity: 1, duration: 0.3, y: '65%', rotate: '13deg' }
      )
      .fromTo(
        itemSkills[7],
        {
          opacity: 0,
          y: '-600%',
          rotate: '0deg'
        },
        { opacity: 1, duration: 0.3, y: '50%', rotate: '-15deg' },
        `-=0.3`
      )
      .fromTo(
        itemSkills[6],
        {
          opacity: 0,
          y: '-600%',
          rotate: '0deg'
        },
        { opacity: 1, duration: 0.5, y: '65%', rotate: '5deg' }
      )
      .fromTo(
        itemSkills[5],
        {
          opacity: 0,
          y: '-600%',
          rotate: '0deg'
        },
        { opacity: 1, duration: 0.3, y: '70%', x: '-30%', rotate: '-12deg' },
        `-=0.3`
      )
      .fromTo(
        itemSkills[4],
        {
          opacity: 0,
          y: '-600%',
          rotate: '0deg'
        },
        { opacity: 1, duration: 0.5, y: '115%', x: '-20%', rotate: '8deg' }
      )
      .fromTo(
        itemSkills[3],
        {
          opacity: 0,
          y: '-600%',
          rotate: '0deg'
        },
        { opacity: 1, duration: 0.3, y: '90%', x: '20%', rotate: '18deg' },
        `-=0.3`
      )
      .fromTo(
        itemSkills[2],
        {
          opacity: 0,
          y: '-600%',
          rotate: '0deg'
        },
        { opacity: 1, duration: 0.5, x: '-15%', y: '165%', rotate: '12deg' }
      )
      .fromTo(
        itemSkills[1],
        {
          opacity: 0,
          y: '-600%',
          rotate: '0deg'
        },
        { opacity: 1, duration: 0.3, y: '160%', x: '-15%', rotate: '-11deg' },
        `-=0.3`
      )
      .fromTo(
        itemSkills[0],
        {
          opacity: 0,
          y: '-600%',
          rotate: '0deg'
        },
        { opacity: 1, duration: 0.3, y: '150%', rotate: '-5deg' },
        `-=0.3`
      )
      .to(itemSkills, {
        y: '0',
        rotate: '0deg',
        x: '0',
        duration: 0.3
      });

    tlBtn
      .from(btn, {
        opacity: 0,
        x: '-110%',
        duration: duration
      })
      .from(
        btnSvg,
        {
          opacity: 0,
          duration: duration
        },
        `-=${duration}`
      );
  }
}

function animWorks() {
  const section = document.querySelector('.works'),
    title = document.querySelector('.works__title'),
    slideWorks = document.querySelectorAll('.works__works-swiper-slide'),
    swiperWorks = document.querySelector('.works__works-swiper'),
    swiperBtnBox = document.querySelector('.works__swiper-btn-box'),
    swiperDemo = document.querySelector('.works__demo-swiper-box'),
    swiperGit = document.querySelector('.works__git-swiper-box'),
    swiperWww = document.querySelector('.works__www-swiper-box'),
    swiperTitle = document.querySelector('.works__title-swiper-box'),
    swiperDesc = document.querySelector('.works__desc-swiper-box'),
    bg = document.querySelector('.works__bg-box'),
    svg = document.querySelector('.works__svg'),
    btnBox = document.querySelector('.works__btn-box');

  slideWorks.forEach((slide, i) => {
    if (window.innerWidth > 768) {
      if (i > 2) {
        slide.style.opacity = '0';
      }
    } else {
      if (i > 1) {
        slide.style.opacity = '0';
      }
    }
  });

  swiperWorks.style.overflow = 'visible';

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'middle 500px',
      end: 'bottom bottom'
    }
  });

  tl.set(section, { z: 0.1 })
    .from(slideWorks[0], {
      y: '-80rem',
      duration: 0.8
    })
    .from(
      slideWorks[1],
      {
        y: '-80rem',
        duration: 0.8
      },
      '-=0.4'
    )
    .from(
      slideWorks[2],
      {
        y: '-80rem',
        duration: 0.8
      },
      '-=0.4'
    )
    .from(
      title,
      {
        x: '80rem',
        duration: 0.8
      },
      '-=1.6'
    )
    .from(
      swiperTitle,
      {
        opacity: 0,
        x: '-20rem',
        duration: 0.8
      },
      '-=1'
    )
    .from(
      swiperDesc,
      {
        opacity: 0,
        x: '-20rem',
        duration: 0.8
      },
      '-=0.6'
    )

    .from(
      swiperBtnBox,
      {
        opacity: 0,
        duration: 0.8
      },
      '-=0.8'
    )
    .from(
      swiperDemo,
      {
        scale: 0,
        duration: 0.8
      },
      '-=0.8'
    )
    .from(
      swiperGit,
      {
        scale: 0,
        duration: 0.8
      },
      '-=0.8'
    )
    .from(
      swiperWww,
      {
        scale: 0,
        duration: 0.8
      },
      '-=0.8'
    )
    .from(
      btnBox,
      {
        x: '100rem',
        duration: 0.8
      },
      '-=0.8'
    )
    .from(
      bg,
      {
        opacity: 0,
        y: '20rem',
        x: '-20rem',
        duration: 0.8
      },
      '-=0.5'
    )
    .from(
      svg,
      {
        opacity: 0,
        y: '20rem',
        x: '20rem',
        duration: 0.8,
        onComplete: () => {
          swiperWorks.style.overflow = 'hidden';
          slideWorks.forEach((slide, i) => {
            slide.style.opacity = '1';
          });
        }
      },
      '-=0.8'
    );
}

function animContacts() {
  const section = document.querySelector('.contacts'),
    title = document.querySelector('.contacts__title'),
    items = document.querySelectorAll('.contacts__item'),
    btn = document.querySelectorAll('.contacts__btn'),
    svg = document.querySelectorAll('.contacts__btn-svg'),
    footer = document.querySelector('footer');

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'middle 500px',
      end: 'bottom bottom'
    }
  });

  tl.set(section, { z: 0.1 })
    .from(title, {
      opacity: 0,
      y: '-80rem',
      duration: 0.5
    })
    .from(items, {
      opacity: 0,
      x: '-80rem',
      duration: 0.5,
      stagger: 0.2
    })
    .from(
      btn,
      {
        opacity: 0,
        x: '100%',
        duration: 0.5
      },
      '-=0.5'
    )
    .from(
      svg,
      {
        opacity: 0,
        x: '-50%',
        y: '-50%',
        duration: 0.5
      },
      '-=0.5'
    )
    .from(
      footer,
      {
        opacity: 0,
        y: '50%',
        duration: 0.5
      },
      '-=0.5'
    );
}

function burger() {
  const body = document.body;
  const burger = document.querySelector('.burger');
  const links = document.querySelectorAll('.header__nav-link');
  const logo = document.querySelector('.header__portfolio');
  const nav = document.querySelector('.header__nav');

  function toggleMenu() {
    burger.classList.toggle('isActive');
    nav.classList.toggle('isActive');
    body.classList.toggle('isLock');
  }

  function closeMenu() {
    burger.classList.remove('isActive');
    nav.classList.remove('isActive');
    body.classList.remove('isLock');
  }

  burger.addEventListener('click', toggleMenu);
  logo.addEventListener('click', closeMenu);
  links.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });
}

function about() {
  const thumbSlides = document.querySelectorAll('.about__thumb');

  const swiperMmainBanner = new Swiper('.about__swiper', {
    slidesPerView: 1,
    effect: 'fade',
    allowTouchMove: false,
    autoplay: {
      delay: 120000,
      disableOnInteraction: false
    },
    loop: true,
    fadeEffect: {
      crossFade: true
    },
    speed: 500,
    // autoHeight: true,
    breakpoints: {
      768: {
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        }
      }
    },
    initialSlide: 1,
    on: {
      slideChangeTransitionStart: function () {
        const activeSlide = this.slides[this.activeIndex].dataset.index;
        thumbSlides.forEach((item) => item.classList.remove('isActive'));
        thumbSlides[activeSlide].classList.add('isActive');
      }
    }
  });

  thumbSlides.forEach((slide, index) => {
    slide.addEventListener('click', () => {
      swiperMmainBanner.slideTo(index);
      thumbSlides.forEach((item) => item.classList.remove('isActive'));
      slide.classList.add('isActive');
    });
  });
}

function works() {
  let speed = 1200;

  const imgSwiper = new Swiper('.works__works-swiper', {
    slidesPerView: 1,
    slidesPerGroup: 1,
    effect: 'creative',
    speed: speed,
    allowTouchMove: false,
    creativeEffect: {
      limitProgress: 1,
      perspective: true,
      progressMultiplier: 1,

      next: {
        translate: [0, '-8rem', 0],
        scale: 0.9,
        shadow: false
      },

      prev: {
        translate: [0, '100%', 0],
        shadow: false
      }
    },

    breakpoints: {
      768: {
        allowTouchMove: false,
        creativeEffect: {
          limitProgress: 2,
          progressMultiplier: 1,
          next: {
            translate: [0, '-6.5rem', 0],
            scale: 0.9
          },
          prev: {}
        }
      }
    },

    navigation: {
      prevEl: '.works__swiper-btn--prev',
      nextEl: '.works__swiper-btn--next'
    }
  });

  const titleSwiper = new Swiper('.works__title-swiper', {
    slidesPerView: 1,
    allowTouchMove: false,
    direction: 'vertical',
    reverseDirection: true,
    breakpoints: {
      768: {}
    }
  });

  const descSwiper = new Swiper('.works__desc-swiper', {
    slidesPerView: 1,
    speed: speed,
    effect: 'creative',
    creativeEffect: {
      prev: {
        translate: [0, 0, -400]
      },
      next: {
        translate: ['100%', 0, 0]
      }
    }
  });

  const demoSwiper = new Swiper('.works__demo-swiper', {
    slidesPerView: 1,
    allowTouchMove: false,
    effect: 'creative',
    creativeEffect: {
      prev: {
        scale: 0,
        translate: [0, 0, -200]
      },
      next: {
        scale: 0,
        translate: [0, 0, -200]
      }
    }
  });

  const wwwSwiper = new Swiper('.works__www-swiper', {
    slidesPerView: 1,
    allowTouchMove: false,
    effect: 'creative',
    creativeEffect: {
      prev: {
        scale: 0,
        translate: [0, 0, -200]
      },
      next: {
        scale: 0,
        translate: [0, 0, -200]
      }
    }
  });

  const gitSwiper = new Swiper('.works__git-swiper', {
    slidesPerView: 1,
    allowTouchMove: false,
    effect: 'creative',
    creativeEffect: {
      prev: {
        scale: 0,
        translate: [0, 0, -200]
      },
      next: {
        scale: 0,
        translate: [0, 0, -200]
      }
    }
  });

  imgSwiper.controller.control = [titleSwiper, descSwiper, demoSwiper, wwwSwiper, gitSwiper];
  descSwiper.controller.control = [titleSwiper, imgSwiper, demoSwiper, wwwSwiper, gitSwiper];
}

function fancy() {
  const options = {
    animated: true,
    autoStart: false,
    Toolbar: {
      display: {
        left: [],
        middle: [],
        right: ['close']
      }
    },
    Thumbs: false
  };

  Fancybox.bind('[data-fancybox]', {
    ...options,
    on: {
      done: (fancybox) => {
        const fancyboxEl = fancybox.container,
          prevBtn = fancyboxEl.querySelector('.f-button.is-prev'),
          nextBtn = fancyboxEl.querySelector('.f-button.is-next');

        prevBtn &&
          (prevBtn.innerHTML = `
          <svg width="41" height="8" viewBox="0 0 41 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.646446 3.64645C0.451183 3.84171 0.451183 4.15829 0.646446 4.35355L3.82843 7.53553C4.02369 7.7308 4.34027 7.7308 4.53553 7.53553C4.7308 7.34027 4.7308 7.02369 4.53553 6.82843L1.70711 4L4.53553 1.17157C4.7308 0.976311 4.7308 0.659728 4.53553 0.464466C4.34027 0.269204 4.02369 0.269204 3.82843 0.464466L0.646446 3.64645ZM41 3.5L1 3.5V4.5L41 4.5V3.5Z" fill="#191817"/>
          </svg>
        `);

        nextBtn &&
          (nextBtn.innerHTML = `
          <svg width="41" height="8" viewBox="0 0 41 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M40.3536 4.35355C40.5488 4.15829 40.5488 3.84171 40.3536 3.64645L37.1716 0.464466C36.9763 0.269204 36.6597 0.269204 36.4645 0.464466C36.2692 0.659728 36.2692 0.976311 36.4645 1.17157L39.2929 4L36.4645 6.82843C36.2692 7.02369 36.2692 7.34027 36.4645 7.53553C36.6597 7.7308 36.9763 7.7308 37.1716 7.53553L40.3536 4.35355ZM0 4.5H40V3.5H0V4.5Z" fill="#191817"/>
          </svg>
        `);
      }
    }
  });
}
