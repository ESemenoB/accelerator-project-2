// https://swiperjs.com/get-started#installation
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
  loop: true, // Зацикленное переключение слайдов
});
// heroSwiper();

const toursSwiper = new Swiper(".tours__swiper", {
  modules: [Navigation, Autoplay],
  // Опции Swiper
  slidesPerView: 1,
  spaceBetween: 10,

  breakpoints: {
    768: {
      // На экранах 768px и больше
      slidesPerView: 2, // Показывать 2 слайда
      spaceBetween: 18, // Расстояние между слайдами
    },
    1440: {
      // На экранах 768px и больше
      slidesPerView: 3, // Показывать 2 слайда
      spaceBetween: 30, // Расстояние между слайдами
    },
  },
  // pagination: {
  //   el: ".swiper-pagination",
  //   clickable: true,
  // },
  navigation: {
    nextEl: ".tours__button-next",
    prevEl: ".tours__button-prev",
  },
  loop: false, // Зацикленное переключение слайдов
  // autoplay: {
  //   delay: 3000, // Задержка в миллисекундах (3 секунды)
  //   disableOnInteraction: false, // Не останавливать прокрутку при взаимодействии
  // },
});
// toursSwiper();

const trainingSwiper = new Swiper(".training__swiper", {
  modules: [Navigation],
  // Опции Swiper
  // slidesPerView: 1,
  // spaceBetween: 10,
  initialSlide: 3, // Индекс третьего слайда (начинается с 0)

  breakpoints: {
    0: {
      slidesPerView: 1, // Показывать 1 слайд
      spaceBetween: 10, // Расстояние между слайдами
      initialSlide: 2, // Начинать с третьего слайда (индексация начинается с 0)
    },
    768: {
      slidesPerView: 3, // Показывать 3 слайда
      spaceBetween: 20, // Расстояние между слайдами
      initialSlide: 0, // Начинать с первого слайда
    },
    1440: {
      slidesPerView: 4, // Показывать 4 слайда
      spaceBetween: 20, // Расстояние между слайдами
      initialSlide: 0, // Если не указано, используется глобальная настройка
    },
  },
  navigation: {
    nextEl: ".training__button-next",
    prevEl: ".training__button-prev",
  },
  loop: false, // Зацикленное переключение слайдов
});

// trainingSwiper();

const reviewsSwiper = new Swiper(".reviews__swiper", {
  modules: [Navigation],
  slidesPerView: "auto",
  spaceBetween: 30,

  breakpoints: {
    1440: {
      //   slidesPerView: 4, // Показывать 4 слайда
      spaceBetween: 120, // Расстояние между слайдами
      //   initialSlide: 0, // Если не указано, используется глобальная настройка
    },
  },
  navigation: {
    nextEl: ".reviews__button-next",
    prevEl: ".reviews__button-prev",
  },
  // loop: true, // Зацикленное переключение слайдов
});
// reviewsSwiper();

let advSwiper;

function cloneSlidesIfNeeded() {
  const slides = document.querySelectorAll(".adv__swiper .swiper-slide");
  const slidesPerGroup = 2;
  const totalSlides = slides.length;

  // Проверяем, кратно ли количество слайдов slidesPerGroup
  if (totalSlides % slidesPerGroup !== 0) {
    const swiperWrapper = document.querySelector(
      ".adv__swiper .swiper-wrapper"
    );
    const missingSlides = slidesPerGroup - (totalSlides % slidesPerGroup); // Количество недостающих слайдов

    for (let i = 0; i < missingSlides; i++) {
      const clone = slides[i % totalSlides].cloneNode(true); // Клонируем слайды по порядку
      swiperWrapper.appendChild(clone); // Добавляем их в wrapper
    }
  }
}

function initSwiper() {
  cloneSlidesIfNeeded(); // Клонируем недостающие слайды

  if (window.innerWidth >= 1440) {
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
          .length, // Обновляем количество
      });
    }
  } else if (advSwiper) {
    advSwiper.destroy(true, true); // Удаляем Swiper на мобильных
    advSwiper = null;
  }
}

window.addEventListener("resize", initSwiper);
document.addEventListener("DOMContentLoaded", initSwiper);

let gallerySwiper;

// Функция для инициализации Swiper
function initializeGallerySwiper() {
  if (window.innerWidth < 1440) {
    // Работает на экранах меньше 1440px
    if (!gallerySwiper) {
      gallerySwiper = new Swiper(".gallery__swiper", {
        modules: [Navigation],
        loop: true, // Зацикливаем слайды
        slidesPerView: 2, // Один слайд на экране по умолчанию
        spaceBetween: 5.5, // Расстояние между слайдами
        navigation: {
          nextEl: ".gallery__button-next", // Кнопка для следующего слайда
          prevEl: ".gallery__button-prev", // Кнопка для предыдущего слайда
        },
        breakpoints: {
          768: {
            slidesPerView: 3, // На экранах от 768px показываем два слайда
          },
          1440: {
            slidesPerView: 3, // На экранах от 1440px показываем три слайда
          },
        },
      });
    }
  } else if (gallerySwiper) {
    // Отключаем Swiper на десктопах
    gallerySwiper.destroy(true, true);
    gallerySwiper = null;
  }
}

// Добавляем обработчики для resize и DOMContentLoaded
window.addEventListener("resize", initializeGallerySwiper);
document.addEventListener("DOMContentLoaded", initializeGallerySwiper);

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();

  // Получаем элементы формы
  const phone = document.getElementById("phone");
  const email = document.getElementById("email");
  const buttonForm = document.querySelector(".form__button");

  // Шаблоны для проверки
  const phonePattern = /^\+?\d{10,15}$/;
  const emailPattern =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Zа-яА-Я0-9.-]+(\.[a-zA-Z]{2,}|\.xn--[a-zA-Z0-9]+)$/;

  // Универсальная функция для проверки поля
  function validateField(field, pattern) {
    if (!field.value.match(pattern)) {
      field.classList.add("error");
      return false;
    } else {
      field.classList.remove("error");
      return true;
    }
  }

  // Валидация каждого поля
  const isPhoneValid = validateField(phone, phonePattern);
  const isEmailValid = validateField(email, emailPattern);

  // Проверяем общую валидность формы
  const formIsValid = isPhoneValid && isEmailValid;

  // Блокируем кнопку отправки, если форма невалидна
  buttonForm.disabled = !formIsValid;

  if (formIsValid) {
    // Если всё валидно, отправляем форму
    event.target.submit();
  }
});
