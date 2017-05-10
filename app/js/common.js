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
