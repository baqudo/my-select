$(document).ready(function() {

	// СЕЛЕКТ
	$('.my-select').each(function () {
	
		var select = $(this),
			opt_len = select.children('option').length,
			className = select.attr('class').replace('my-select', ''),
			timer = 200;

		// оборачиваем селект в див
		select.wrap('<div class="select '+ className +'"></div>');
	
		// добавляем див-бар для отображения 
		select.after('<div class="select__bar"></div>');
	
		// сохраняем див-бар в переменную
		var select__bar = select.next('div.select__bar');
	
		// переносим значение первого option в див-бар
		select__bar.html(select.children('option').eq(0).html());
	
		// Insert an unordered list after the styled div and also cache the list
		var list = $('<ul />', {
			'class': 'select__dropdown'
		}).insertAfter(select__bar);
	
		// Insert a list item into the unordered list for each select option
		for (var i = 0; i < opt_len; i++) {
			var span;
			if (select.children('option').eq(i).data('inf')){
				span = '<span> ' + select.children('option').eq(i).data('inf') + '</span>';
			}
			else {
				span = '';
			}
			$('<li />', {
				html: select.children('option').eq(i).text() + span,
				data: select.children('option').eq(i).val()
			}).appendTo(list);
		}
	
		// Cache the list items
		var listItems = list.children('li');
	
		// Show the unordered list when the styled div is clicked (also hides it if the div is clicked again)
		select__bar.on('click', function (e) {
			var block = $(this),
				parent = block.parents('.select');
			if (!block.hasClass('is-active')) {
				$('.select__bar').removeClass('is-active');
				$('ul.select__dropdown').fadeOut(timer);
				block.addClass('is-active').next('ul.select__dropdown').fadeIn(timer);
			}
			else {
				block.removeClass('is-active').next('ul.select__dropdown').fadeOut(timer);
			}
			e.stopPropagation();
		});
	
		// Hides the unordered list when a list item is clicked and updates the styled div to show the selected list item
		// Updates the select element to have the value of the equivalent option
		listItems.on('click', function (e) {
			select__bar.html($(this).html()).removeClass('is-active');
			select.val($(this).attr('data-index'));
			listItems.removeClass('is-active');
			$(this).addClass('is-active');
			list.fadeOut(timer);
			e.stopPropagation();
		});
	
		// Hides the unordered list when clicking outside of it
		$(document).on('click', function () {
			select__bar.removeClass('is-active');
			list.fadeOut(timer);
		});
	
	});
});