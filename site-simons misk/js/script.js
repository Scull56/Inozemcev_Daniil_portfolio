$(document).ready(function () {

   // Подстановка изображения как фонового изображения
   function ibg() {
      $.each($('.ibg'), function (index, val) {
         if ($(this).find('img').length > 0) {
            $(this).css('background-image', 'url("' + $(this).find('img').attr('src') + '")');
         }
      });
   }

   ibg();


   // Открывающееся и закрывающееся бургер меню
   $(".burger").on("click", (function (e) {
      $(this).toggleClass("active");
      $('.navigaite').toggleClass('vertical-nav');
      $(".navigaite__under").on("click", (function (e) {
         $(".burger").removeClass("active");
         $('.navigaite').removeClass('vertical-nav');
         if ($(window).width() <= 540) {
            $('body').removeClass('lock');
         }
      }))

      if ($(window).width() <= 540) {
         $('body').toggleClass('lock');
      }

      $.each($('.navigaite__link').on("click", (function (e) {
         $(".burger").removeClass("active");
         $('.navigaite').removeClass('vertical-nav');
         if ($(window).width() <= 540) {
            $('body').removeClass('lock');
         }
      })))
   }))


   // Скрытие модального окна при нажатии на крестик и область вокуг окна
   $('.hidden-massage__close').on('click', function (event) {
      $(".hidden-massage").removeClass('visible-massage');
   })

   $('.hidden-massage').on('click', function (event) {
      $(this).removeClass('visible-massage');
   })


   // Плавная прокрутка к якорной ссылке
   $('a[href^="#"]').on("click", (function (e) {
      let s = $(this).attr("href");
      $("html, body").animate({
         scrollTop: $(s).offset().top - 150
      }, 500)
   }))


   // Маска ввода телефона
   let e = document.getElementById("tel");
   new Inputmask("+7(999)999-99-99").mask(e);
   $(".contact-form__button");


   // Скрытие и появление бургер меню при прокрутке
   $(window).scroll(function () {
      if (pageYOffset > 300 && $(window).width() >= 768) {
         $(".burger").css('opacity', '1');
         $(".burger").css('visibility', 'visible');
      }
      if (pageYOffset <= 300 && $(window).width() >= 768) {
         $(".burger").css('opacity', '0');
         $(".burger").css('visibility', 'hidden');
         $('.navigaite').removeClass('vertical-nav');
         $('.burger').removeClass('active');
      }
   });


   // Слайдер наборов
   function slider() {
      $.each($('.packs__radio'), function (index, val) {
         $(this).on('click', function (event) {
            if ($(this).find('img').length > 0) {
               $(".packs__img").css('background-image', 'url("' + $(this).find('img').attr('src') + '")');
            }
            $('.packs__radio').removeClass('current')
            $(this).addClass('current');

            $('.packs__name').text(`${$(this).data('slide')}`);
         })
      });
   }

   slider();


   // Отправка формы
   $("form").submit((function () {
      var e = $(this);
      return $.ajax({
         type: "POST",
         url: "mail.php",
         data: e.serialize()
      }
      ).done((function () {
         $(".hidden-massage").addClass('visible-massage'),
            setTimeout((function () {
               e.trigger("reset")
            }), 1e3)
      })), !1
   }))
});