document.addEventListener('DOMContentLoaded', (event) => {

  const getElement = (context, selector) => {
    if (!context && !selector) {
      return null;
    }

    return context.querySelector(selector);
  };

  document.body.classList.add('loading');

  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 500)

  // "modernizr" func"
  function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints;
  }
  // lazy-load
  const el = document.querySelectorAll('.lazy');
  window.observer = lozad(el);
  window.observer.observe();

  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      document.querySelector('.js-header').classList.add('scroll');
    } else {
      document.querySelector('.js-header').classList.remove('scroll');
    }
  });

  if (window.scrollY > 50) {
    document.querySelector('.js-header').classList.add('scroll');
  } else {
    document.querySelector('.js-header').classList.remove('scroll');
  }

  // proccess slider
  const processSlider = document.querySelectorAll('[data-slider="top-slider"]');
  if(processSlider !== null) {

    processSlider.forEach((el) => {
      const processSwiper = new Swiper(el.querySelector('.swiper-container'), {
        freeMode: false,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        simulateTouch: true,
        centeredSlides: true,
        loop: false,
        speed: 200,
        slidesPerView: 1,
        slidesPerGroup: 1,
        followFinger: true,
        spaceBetween: 20,
        effect: 'fade',
        fadeEffect: {
          crossFade: true,
        },
        autoplay: {
          delay: 2000,
          disableOnInteraction: false,
        },
        on: {
          afterInit: (event) => {

          },

        },
      });
    })
  }

  // testimonials slider
  const servSlider = document.querySelectorAll('[data-slider="serv-slider"]');
  if(servSlider !== null) {

    servSlider.forEach((el) => {
      const servSwiper = new Swiper(el.querySelector('.swiper-container'), {
        freeMode: false,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        simulateTouch: false,
        centeredSlides: true,
        lazy: {
          loadOnTransitionStart: true,
          loadPrevNextAmount: 2,
          loadPrevNext: true
        },
        loop: true,
        speed: 200,
        slidesPerView: 1,
        slidesPerGroup: 1,
        followFinger: true,
        spaceBetween: 8,
        on: {
          afterInit: (event) => {

          },
          slideChange: (event) => {

          },
          slideChangeTransitionEnd: (event) => {

          },
        },
        navigation: {
          nextEl: getElement(el.closest('[data-slider="serv-slider"]'), '.js-next'),
          prevEl: getElement(el.closest('[data-slider="serv-slider"]'), '.js-prev'),
          disabledClass: 'swiper-lock'
        },
        pagination: {
          // el: el.querySelector('.swiper-pagination'),
          // clickable: true,
          // type: 'progressbar'
        },
        breakpoints: {
          0: {
            slidesPerView: 1,
            spaceBetween: 8
          },
          640: {
            slidesPerView: 1,
            spaceBetween: 16,
          },
          1340: {
            slidesPerView: 3,
            spaceBetween: 16,
            speed: 0,
          }
        },
      });
    })
  }

  // inview
  const observerOptions = {
    root: null,
    // rootMargin: '0px 0px -50px 0px',
    threshold: 0.2
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target); // Останавливаем наблюдение за этим элементом

        if(entry.target.classList.contains('js-numb-count')) {
          animateNumber(entry.target); // Анимация числа
        }
      }
    });
  }, observerOptions);

  document.querySelectorAll('.js-inview').forEach(el => observer.observe(el));


  const counters = document.querySelectorAll('.js-numb-count');

  function animateNumber(element) {
    const target = parseInt(element.getAttribute('data-target'));
    let current = 0;
    const increment = target / 100;

    function updateCounter() {
      if (current < target) {
        current += increment;
        element.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    }

    updateCounter();
  }

  const accs = document.querySelectorAll('.js-acc-wrap');

  if(accs !== null) {
    accs.forEach((parent) => {
      const buttons = parent.querySelectorAll('.js-open-acc');
      const contents = parent.querySelectorAll('.js-acc-block');
      const parentIrem = parent.querySelectorAll('.js-acc');

      parentIrem.forEach((patItem) => {
        if(patItem.classList.contains('active')) {
          patItem.querySelector('.js-acc-block').style.maxHeight = patItem.querySelector('.js-acc-block').scrollHeight + "px";
        }
      })

      buttons.forEach((button, index) => {
        button.addEventListener('click', () => {

          if(button.closest('.js-acc').classList.contains('active')) {
            contents[index].style.maxHeight = '0';
            button.closest('.js-acc').classList.remove('active');
          } else {
            contents.forEach((blocks) => {
              blocks.style.maxHeight = '0'
            })
            parentIrem.forEach((parentIrem) => {
              parentIrem.classList.remove('active');
            })
            contents[index].style.maxHeight = contents[index].scrollHeight + "px";
            button.closest('.js-acc').classList.add('active');
          }
        });
      });
    })
  }

  const phoneNumber = document.querySelectorAll('.js-phone-number');

  if(phoneNumber !== null) {
    phoneNumber.forEach((phoneIinput) => {
      phoneIinput.addEventListener('input', function() {
        phoneIinput.value = this.value.replace(/[^0-9]/g, ''); // Allow only numbers
      });
    })
  }

  if(document.getElementById('videomain') !== null) {
    document.getElementById('videomain').play();
  }
})
