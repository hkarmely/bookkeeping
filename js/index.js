define(['models/tag', 'jquery'], function(Tag, $) {
    initDeepLink();

    $('.navbar-fixed-top .nav a').click(function() {
        $(this).closest('.collapse').collapse('hide');
    });

    var url = location.hash.substr(1) || 'overview';
    navigate(url);

    require(['index']);

    function getTitle(url) {
        return $('.sidebar li a[href=' + url + ']').html();
    }


    var currentPage = null;
    function navigate(url, title) {
        title = title || getTitle(url);
        var $loading = $('<div>')
            .css("text-align", "center")
            .css("margin-top", "100px")
            .css("font-size", "24px")
            .html('<i class="fa fa-spin fa-spinner"></i>');

        $('.page-header').html(title);
        $('.page-content').html($loading);
        $('.sidebar').find('.nav li').removeClass('active');
        $('.sidebar li a[href=' + url + ']').parent().addClass('active');

        location.hash = '#' + url;
        $(window).trigger('page-navigate', [url]);

        if(currentPage && currentPage.onunload){
            currentPage.onunload();
        }

        $.get(url + '.html').done(function(html) {
            $('.page-content').html(html);
            require(['pages/' + url], function(page){
                Tag.refresh();
                page.onload && page.onload();
                currentPage = page;
            });
        }).fail(function(xhr) {
            Message.error('Fetch page error: ' + xhr.responseText);
        });
    }

    function initDeepLink() {
        $('a.deep-link').click(function(e) {
            e.preventDefault();
            var url = $(e.target).attr('href');
            var title = $(e.target).html();
            navigate(url, title);
        });
    }
});
