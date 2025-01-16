export function toggleMenuState(navMain, menuOpen, menuClose, isOpen) {
  navMain.classList.toggle("menu-nav--opened", isOpen);

  document.body.classList.toggle("no-scroll", isOpen);

  menuOpen.classList.toggle("button__hidden", isOpen);
  menuClose.classList.toggle("button__hidden", !isOpen);
}

export function initializeMenu() {
  const navMain = document.querySelector(".menu-nav");

  if (!navMain) {
    console.error("Основной контейнер меню не найден.");
    return;
  }

  const menuOpen = navMain.querySelector(".menu-nav__open");
  const menuClose = navMain.querySelector(".menu-nav__close");
  const menuItems = navMain.querySelectorAll(".menu-nav__item a");

  if (!menuOpen || !menuClose) {
    console.error("Кнопки открытия или закрытия меню не найдены.");
    return;
  }

  navMain.classList.remove("menu-nav--nojs");

  navMain.addEventListener("click", (event) => {
    const target = event.target.closest(".menu-nav__open, .menu-nav__close");

    if (!target) return;

    const isOpening = target.classList.contains("menu-nav__open");
    toggleMenuState(navMain, menuOpen, menuClose, isOpening);
  });

  menuItems.forEach((item) => {
    item.addEventListener("click", () => {
      toggleMenuState(navMain, menuOpen, menuClose, false);
    });
  });
}

initializeMenu();
