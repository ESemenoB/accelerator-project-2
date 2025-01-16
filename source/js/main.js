import Swiper from "swiper";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";

import { initializeMenu } from "./menu.js";
initializeMenu();

const heroSwiper = new Swiper(".hero__swiper", {
  modules: [Pagination, Autoplay],
  slidesPerView: 1,
  spaceBetween: 10,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  loop: true,
});

const toursSwiper = new Swiper(".tours__swiper", {
  modules: [Navigation, Autoplay],
  slidesPerView: 1,
  spaceBetween: 10,

  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 18,
    },
    1440: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },
  navigation: {
    nextEl: ".tours__button-next",
    prevEl: ".tours__button-prev",
  },
  loop: false,
});

const trainingSwiper = new Swiper(".training__swiper", {
  modules: [Navigation],
  initialSlide: 3,

  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 10,
      initialSlide: 2,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 20,
      initialSlide: 0,
    },
    1440: {
      slidesPerView: 4,
      spaceBetween: 20,
      initialSlide: 0,
    },
  },
  navigation: {
    nextEl: ".training__button-next",
    prevEl: ".training__button-prev",
  },
  loop: false,
});

const reviewsSwiper = new Swiper(".reviews__swiper", {
  modules: [Navigation],
  slidesPerView: "auto",
  spaceBetween: 30,

  breakpoints: {
    1440: {
      spaceBetween: 120,
    },
  },
  navigation: {
    nextEl: ".reviews__button-next",
    prevEl: ".reviews__button-prev",
  },
});

let advSwiper;

function cloneSlidesIfNeeded() {
  const slides = document.querySelectorAll(".adv__swiper .swiper-slide");
  const slidesPerGroup = 2;
  const totalSlides = slides.length;

  if (totalSlides % slidesPerGroup !== 0) {
    const swiperWrapper = document.querySelector(
      ".adv__swiper .swiper-wrapper"
    );
    const missingSlides = slidesPerGroup - (totalSlides % slidesPerGroup);

    if (!swiperWrapper.querySelector(".swiper-slide.cloned")) {
      for (let i = 0; i < missingSlides; i++) {
        const clone = slides[i % totalSlides].cloneNode(true);
        clone.classList.add("cloned");
        swiperWrapper.appendChild(clone);
      }
    }
  }
}

function initSwiper() {
  if (window.innerWidth >= 1440) {
    cloneSlidesIfNeeded();

    if (!advSwiper) {
      advSwiper = new Swiper(".adv__swiper", {
        modules: [Navigation],
        slidesPerView: "auto",
        slidesPerGroup: 2,
        spaceBetween: 30,
        navigation: {
          nextEl: ".adv__button-next",
          prevEl: ".adv__button-prev",
        },
        loop: true,
        loopedSlides: document.querySelectorAll(".adv__swiper .swiper-slide")
          .length,
      });
    }
  } else if (advSwiper) {
    if (!advSwiper.destroyed) {
      advSwiper.destroy(true, true);
      advSwiper = null;
    }
  }
}

let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(initSwiper, 300);
});
document.addEventListener("DOMContentLoaded", initSwiper);

let gallerySwiper;

function initializeGallerySwiper() {
  if (window.innerWidth < 1440) {
    if (!gallerySwiper) {
      gallerySwiper = new Swiper(".gallery__swiper", {
        modules: [Navigation],
        loop: true,
        slidesPerView: 2,
        spaceBetween: 5,
        navigation: {
          nextEl: ".gallery__button-next",
          prevEl: ".gallery__button-prev",
        },
        breakpoints: {
          768: {
            slidesPerView: 3,
          },
          1440: {
            slidesPerView: 3,
          },
        },
      });
    }
  } else if (gallerySwiper) {
    gallerySwiper.destroy(true, true);
    gallerySwiper = null;
  }
}

window.addEventListener("resize", initializeGallerySwiper);
document.addEventListener("DOMContentLoaded", initializeGallerySwiper);

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();

  const phone = document.getElementById("phone");
  const email = document.getElementById("email");
  const buttonForm = document.querySelector(".form__button");

  const phonePattern = /^\+?\d{10,15}$/;
  const emailPattern =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Zа-яА-Я0-9.-]+(\.[a-zA-Z]{2,}|\.xn--[a-zA-Z0-9]+)$/;

  function validateField(field, pattern) {
    if (!field.value.match(pattern)) {
      field.classList.add("error");
      return false;
    } else {
      field.classList.remove("error");
      return true;
    }
  }

  const isPhoneValid = validateField(phone, phonePattern);
  const isEmailValid = validateField(email, emailPattern);

  const formIsValid = isPhoneValid && isEmailValid;

  buttonForm.disabled = !formIsValid;

  if (formIsValid) {
    event.target.submit();
  }
});
