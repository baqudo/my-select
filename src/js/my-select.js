$(document).ready(function() {

	// СЕЛЕКТ
	$('.my-select').each(function () {
	
		var select = $(this),
			opt_len = select.children('option').length,
			className = select.attr('class').replace('my-select', ''),
			timer = 500;

		// оборачиваем селект в див
		select.wrap('<div class="select '+ className +'"></div>');
	
		// добавляем блок-вывода для отображения 
		select.after('<div class="select__bar"></div>');
	
		// сохраняем блок-вывода в переменную
		var select__bar = select.next('div.select__bar');
	
		// переносим значение первого option в блок-вывода
		select__bar.html(select.children('option').eq(0).html());
	
		// создаем список для псевдо-опшинов после блока-вывода, и сохраняем в переменную
		var list = $('<ul />', {
			'class': 'select__dropdown'
		}).insertAfter(select__bar);
	
		// создаем li по каждому option нашего селекта
		for (var i = 0; i < opt_len; i++) {
			var span;
			if (select.children('option').eq(i).data('info')){
				span = '<span> ' + select.children('option').eq(i).data('info') + '</span>';
			}
			else {
				span = '';
			}
			$('<li />', {
				class: 'option',
				html: select.children('option').eq(i).text() + span,
				data: select.children('option').eq(i).val()
			}).appendTo(list);
		}
	
		// сохраняем в переменную li из списка
		var listItems = list.children('li');
	
		// переключение при клике на див
		select__bar.on('click', function (e) {
			var block = $(this);
				// parent = block.parents('.select');
			if (!block.hasClass('is-active')) {
				$('.select__bar').removeClass('is-active');
				$('ul.select__dropdown').slideUp(timer);
				block.addClass('is-active').next(list).slideDown(timer).addClass('is-active');
			}
			else {
				block.removeClass('is-active').next(list).slideUp(timer).removeClass('is-active');
			}
			e.stopPropagation();
		});
	
		// скрываем список при клике на li, и снимаем клас с дива
		// а также добавляем активный класс выбранной li
		listItems.on('click', function (e) {
			select__bar.html($(this).html()).removeClass('is-active').addClass('selected');
			select.val($(this).attr('data-index'));
			listItems.removeClass('is-active');
			$(this).addClass('is-active');
			list.slideUp(timer);
			e.stopPropagation();
		});
	
		// закрываем список при клике не на него
		$(document).on('click', function () {
			select__bar.removeClass('is-active');
			list.slideUp(timer);
		});
	
	});
});