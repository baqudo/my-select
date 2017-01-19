'use strict';

$(document).ready(function () {

	$('.select').each(function () {
		var $select = $(this),
			zone = $select.parents().parents(),
			zone2 = $select.parents().siblings();

		$select.wrap('<div class="select__wrapp"></div>').before('<div class="select__bar">click</div>').after('<ul class="select__dropdown"></ul>');
		var select__bar = $select.prev('div.select__bar'),
			$options = $select.children();

			select__bar.html($options.eq(0).html());

		var $dropdown = $select.next('ul.select__dropdown');

		for (var i = 0; i < $options.length; i++) {
			$dropdown.append('<li class="option" data-index="' + i + '">' + $options[i].innerHTML + '</li>');
		};

		$dropdown.children().on('click', function () {
			
			$(this).siblings().removeClass('option_active');
			$(this).addClass('option_active');
			$(this).parent().hide();
			select__bar.html($(this).text()).removeClass('is-active').addClass('selected');

			var index = $(this).attr('data-index');
			var options = $(this).siblings();
			$(options).attr('selected', false);
			$(options[index]).attr('selected', true);
		});

		select__bar.on('click', function (e) {
			$(this).toggleClass('is-active');
			e.stopPropagation();
			$dropdown.toggle();
		});

		zone.on('click', function (e) {
			e.stopPropagation();
			$('.select__bar').removeClass('is-active');
			$('.select__dropdown').hide();
		});
		zone2.on('click', function (e) {
			e.stopPropagation();
			$('.select__bar').removeClass('is-active');
			$('.select__dropdown').hide();
		});
	});

});

// //////////////////////////////////////////////////////////
