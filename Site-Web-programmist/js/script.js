document.addEventListener("DOMContentLoaded", function () {
   const menu = document.querySelector('.menu'),
      burger = document.querySelector('.burger'),
      closeMenu = menu.querySelector('.menu__close'),
      menuLinks = menu.querySelectorAll('a[href^="#"]'),
      progressPercent = document.querySelectorAll('.progress__percent'),
      progressLine = document.querySelectorAll('.progress__current');

   // Menu
   function moveMenu(move) {
      if (move == 'open') {
         menu.classList.add('menu_active');
         menu.classList.remove('menu_disabled');
      } else if (move == 'close') {
         menu.classList.add('menu_disabled');
         menu.classList.remove('menu_active');
      }
   }

   burger.addEventListener('click', () => {
      moveMenu('open');
   });

   closeMenu.addEventListener('click', () => {
      moveMenu('close');
   })

   menu.addEventListener('click', e => {
      if (e.target == menu) {
         moveMenu('close');
      }
   })

   menuLinks.forEach(item => {
      item.addEventListener('click', () => {
         moveMenu('close');
      });
   });

   window.addEventListener('keyup', e => {
      if (e.key == 'Escape') {
         moveMenu('close');
      }
   });

   // Progress bars
   progressLine.forEach((item, index) => {
      let percent = progressPercent[index].textContent;
      item.style.width = percent;
   });
});