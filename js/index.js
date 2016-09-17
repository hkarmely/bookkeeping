define([
	'models/tag',
	'jquery',
	'utils/url',
	'bootstrap'
], function(Tag, $, Url) {
	$('.navbar-fixed-top .nav a').click(function() {
		$(this).closest('.collapse').collapse('hide');
	});

	$(window).on('hashchange', function() {
		var hash = location.hash || '#overview';
		navigate(hash.substr(1));
	});

	var url = location.hash.substr(1) || 'overview';
	navigate(url);

	require(['index']);

	var currentPage = null;

	function navigate(url) {
		var TITLES = {
			overview: '概览',
			input: '录入',
			export: '导出',
			import: '导入',
			update: '修改',
			analytics: '分析'
		};

		var $loading = $('<div>')
			.css("text-align", "center")
			.css("margin-top", "100px")
			.css("font-size", "24px")
			.html('<i class="fa fa-spin fa-spinner"></i>');

		url = Url.parse(url);
		title = TITLES[url.path] || 'Book Keeping';

		$('.page-header').html(title);
		$('.page-content').html($loading);
		$('li a.deep-link').parent().removeClass('active');
		$('li a[href=#' + url.path + ']').parent().addClass('active');

		if (currentPage && currentPage.onunload) {
			currentPage.onunload();
		}

		$.get(url.path + '.html').done(function(html) {
			$('.page-content').html(html);
			require(['pages/' + url.path], function(page) {
				Tag.refresh();
				page.onload && page.onload(url.query);
				currentPage = page;
			});
		}).fail(function(xhr) {
			Message.error('Fetch page error: ' + xhr.responseText);
		});
	}

});
