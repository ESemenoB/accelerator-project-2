export function toggleMenuState(navMain, menuOpen, menuClose, isOpen) {
  navMain.classList.toggle("menu-nav--opened", isOpen);
  navMain.classList.toggle("menu-nav--closed", !isOpen);

  menuOpen.classList.toggle("button__active", !isOpen);
  menuOpen.classList.toggle("button__hidden", isOpen);

  menuClose.classList.toggle("button__active", isOpen);
  menuClose.classList.toggle("button__hidden", !isOpen);
}

export function initializeMenu() {
  let navMain = document.querySelector(".menu-nav");
  let menuOpen = navMain.querySelector(".menu-nav__open");
  let menuClose = navMain.querySelector(".menu-nav__close");

  navMain.classList.remove("menu-nav--nojs");

  navMain.addEventListener("click", function (event) {
    if (event.target.closest(".menu-nav__open")) {
      toggleMenuState(navMain, menuOpen, menuClose, true);
    }
    if (event.target.closest(".menu-nav__close")) {
      toggleMenuState(navMain, menuOpen, menuClose, false);
    }
  });
}
