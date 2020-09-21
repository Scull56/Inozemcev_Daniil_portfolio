$('document').ready(function () {

   // Slider
   let slider = tns({
      container: '.carusel-slider',
      items: 1,
      slideBy: 'page',
      controls: false,
      responsive: {
         576: {
            nav: true
         }
      }
   });

   document.querySelector('.carusel-slider__prev').addEventListener('click', function () {
      slider.goTo('prev');
   });

   document.querySelector('.carusel-slider__next').addEventListener('click', function () {
      slider.goTo('next');
   });


   // Tabs filter
   const cards = document.querySelectorAll('.product-card'),
      tabs = document.querySelectorAll('.tabs__item');

   tabs.forEach(tab => {
      tab.addEventListener('click', () => {
         tabs.forEach(item => {
            item.classList.remove('tabs__item_active');
         });

         tab.classList.add('tabs__item_active');
         cards.forEach(card => {
            card.querySelector('.product-card__main').classList.remove('product-card__main_active');
         });

         for (let i = 0; i < cards.length; i++) {
            if (cards[i].dataset.category != tab.dataset.category) {
               cards[i].style.display = 'none';
            } else {
               cards[i].style.display = 'flex';
            }
         };
      });
   });

   // Product-cards

   cards.forEach(card => {
      let btnMore = card.querySelector('.product-card__link-more'),
         btnBack = card.querySelector('.product-card__link-back'),
         wrapper = card.querySelector('.product-card__main');
      btnMore.addEventListener('click', (e) => {
         e.preventDefault();
         wrapper.classList.add('product-card__main_active');
      });
      btnBack.addEventListener('click', (e) => {
         e.preventDefault();
         wrapper.classList.remove('product-card__main_active');
      });
   });

   // Modal windows

   const modals = document.querySelectorAll('.modal'),
      openModals = document.querySelectorAll('[data-modal]'),
      closeModal = document.querySelectorAll('.modal__close'),
      body = document.querySelector('body');

   openModals.forEach(item => {
      item.addEventListener('click', (e) => {
         e.preventDefault();
         for (let i = 0; i < modals.length; i++) {
            if (item.dataset.modal == modals[i].dataset.modal && item.dataset.modal == 'order' && e.target == item) {
               modals[i].querySelector('.modal__subtitle').textContent = item.parentElement.parentElement.querySelector('.product-card__title').textContent;
               modals[i].classList.add('modal_active');
               body.classList.add('close');
            } else if (item.dataset.modal == modals[i].dataset.modal && item.dataset.modal == 'consult' && e.target == item) {
               modals[i].classList.add('modal_active');
               body.classList.add('close');
            }
         }
      });
   });

   closeModal.forEach(item => {
      item.addEventListener('click', () => {
         body.classList.remove('close');
         modals.forEach(i => i.classList.remove('modal_active'));
      });
   });

   // Form validate

   const formPage = $('#page-form'),
      formOrder = $('#order-form')
   formConsult = $('#consult-form');


   function validateForm(form) {
      form.validate({
         rules: {
            name: "required",
            tel: "required",
            email: {
               required: true,
               email: true
            }
         },
         messages: {
            name: "Пожалуйста, введите своё имя",
            tel: "Пожалуйста, введите свой номер телефона",
            email: {
               required: "Введите свой email, пожалуйста",
               email: "Введите корректный email - example@mail.com"
            }
         }
      });
   }

   validateForm(formPage);
   validateForm(formOrder);
   validateForm(formConsult);

   // Tel mask

   $("input[name='tel']").mask("+7 (999) 999-99-99");

   // Btn-up

   $(window).scroll(function () {
      if ($(this).scrollTop() > 1600) {
         $('.btn-up').fadeIn();
      } else {
         $('.btn-up').fadeOut();
      }
   })

   // Smooth a

   $("a[href='#mainscreen']").click(function () {
      var _href = $(this).attr("href");
      $("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
      return false;
   });

   // Php mailer

   $('form').submit(function (e) {
      e.preventDefault();
      $.ajax({
         type: "POST",
         url: "mailer/smart.php",
         data: $(this).serialize()
      }).done(function () {
         $(this).find("input").val("");

         $('form').trigger('reset');
      })

      return false;
   });
});

