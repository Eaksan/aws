var sliderLog1 = 0 ;

function sliderAnimation(slider, sliderDelay) {
  function removeAddClass(counter, prevCounter, position) {
    $(slider).find(".current-slide").removeClass("current-slide");
    $(dots).removeClass("active-slide").removeProp("disabled");
    $($(slides)[prevCounter]).addClass("slide-back");
    setTimeout(
      function(){
        $(slider).find(".slide-back").removeClass("slide-back");
        $($(slider).find(".slider-window")).css("margin-left",position+"px");
        $($(slides)[counter]).addClass("current-slide");
        sliderLog1 = 0;
      }
      , sliderDelay);
    $($(dots)[counter]).addClass("active-slide").prop("disabled");
    $($(slides)[counter]).addClass("current-slide");
    $(slider).find(".collapse.in").removeClass("in");
  };
  var step=slider.width(),
    slider_box_width=slider.width(),
    slides = slider.find(".easlide"),
    dots = slider.find(".dots li"),
    count = slides.length,
    prevSlide = count,
    col_main_left=0,
    dotsCount =0,
    max_col_main_left=count * step,
    prevSlideCount = 0,
    slide_counter=0,
    slider_mouse_x1 = 0,
    slider_mouse_x2 = 0;

  $(slider).on('mousedown', function() {return false});
  slides.each(function(){
    $(this).width(slider_box_width);
    $(this).css("display", "inline-block");
    $(this).css("float", "left");
  });
  $($(slides)[slide_counter]).addClass("current-slide");
  $($(dots)[slide_counter]).addClass("active-slide");
  slider.find(".slider-window").width(count*step);
  slider.find(".dots li").each(
    function(){
      $($(this).children("button")).attr("slide-index", dotsCount )
      dotsCount++;
    }
    );
  // Button next
  $(slider.find(".slider-next")).click(function(){

    if (sliderLog1 == 0) {
      sliderLog1 = 1;
      if(-col_main_left==max_col_main_left-step){
        col_main_left=0;
        prevSlideCount=slide_counter;
        slide_counter=0;
      } else{
          col_main_left=col_main_left-step;
          prevSlideCount=slide_counter;
          slide_counter=slide_counter+1;
      };

    removeAddClass(slide_counter,prevSlideCount, col_main_left);
    } else {
      console.log(sliderLog1);
    };

  });
  // Button prev
  $(slider.find(".slider-prev")).click(function(){
    if(sliderLog1 == 0){
      sliderLog1 = 1;
      if(col_main_left==0){
        col_main_left=-max_col_main_left+step;
        prevSlideCount=slide_counter;
        slide_counter=count-1;
      } else{
          col_main_left=col_main_left+step;
          prevSlideCount=slide_counter;
          slide_counter=slide_counter-1;
      };
      removeAddClass(slide_counter, prevSlideCount, col_main_left);
    } else {
      console.log(sliderLog1);
    };

  });

  $(dots).children("button").click(function(){
    if(sliderLog1 == 0){
      sliderLog1 = 1;
      slide_counter = $(this).attr("slide-index");
      prevSlide = 0;
      $(slides).each(
        function() {

          if($(this).attr("class") != "slide current-slide"){
            prevSlide++;
          } else {
            prevSlideCount = prevSlide;
          }

        }
      );
      col_main_left = -slide_counter * step;
      removeAddClass(slide_counter, prevSlideCount, col_main_left);
    } else {
      console.log(sliderLog1);
    };
  });

  slider.hammer().bind('swipeleft', function() {
    if(-col_main_left==max_col_main_left-step){
      col_main_left=0;
      prevSlideCount=slide_counter;
      slide_counter=0;
    } else {
      col_main_left=col_main_left-step;
      prevSlideCount=slide_counter;
      slide_counter=slide_counter+1;
    };
    removeAddClass(slide_counter,prevSlideCount, col_main_left);
  });

  slider.hammer().bind('swiperight', function() {
    if(col_main_left==0){
      col_main_left=-max_col_main_left+step;
      prevSlideCount=slide_counter;
      slide_counter=count-1;
    } else {
      col_main_left=col_main_left+step;
      prevSlideCount=slide_counter;
      slide_counter=slide_counter-1;
    };
    removeAddClass(slide_counter,prevSlideCount, col_main_left);
  });
};

function navbarPosition(){
  var frameWidth = $(window).width(),
    containerWidth = $(".container").width();
  $(".navbar-collapse").css("right", -(frameWidth-containerWidth)/2+14);
  $(".navbar-toggle").css("right", -(frameWidth-containerWidth)/2+14);

}

$(function() {
  // слайдеры
  sliderAnimation($(".slider-first"), 100);
  //модальные окна
  $("select").styler();
  // валидация
  $("form").validate();
  // плавный скрол
  $("a.scrollto").click(function() {
    var elementClick = $(this).attr("href")
    var destination = $(elementClick).offset().top;
    jQuery("html:not(:animated),body:not(:animated)").animate({
      scrollTop: destination
    }, 800);
    return false;
  });
  // позиция меню
  if ( $(window).width() < 1248 ) {
    navbarPosition();
  };

  if ( $(window).width() < 767 ) {
    $(".collapse.in").removeClass("in");
  };

  $(window).resize(function(){
    if ( $(window).width() < 768 ) {
      navbarPosition();
    };
  });

  $(window).scroll(function(){
    $(".navbar-collapse.in").removeClass("in");
    $(".navbar-toggle.opened").removeClass("opened").addClass("closed");
  });

  $(".navbar-toggle").click(function(){
    if($(this).hasClass("closed")){
      $(this).addClass("opened").removeClass("closed");
    } else if ($(this).hasClass("opened")){
      $(this).removeClass("opened").addClass("closed");
    };
  });

});


$(function() {
	// тултипы
	$('[data-toggle="tooltip"]').tooltip()
	// Fullpage активация
	$("#fullpage").fullpage({
		verticalCentered: false,
		menu: "header",
		navigation: true,//вертикальная пагинация
	  css: true, //перемещение по блокам с анимацией(по умолчанию true)
	  scrollingSpeed: 1000,//скорость прокрутки
	  anchors: ['sec-1', 'sec-2', 'sec-3', 'sec-4', 'sec-5','sec-6','sec-7'],//якоря секций для функционирования меню

	});

});
