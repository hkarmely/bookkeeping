$(function() {
    bootbox.setLocale('zh_CN');

    initSidebar();
    $(window).on('page-navigate', onPageNavigate);
    var url = location.hash.substr(1) || 'overview';
    navigate(url);
});

function getTitle(url) {
    return $('.sidebar li a[href=' + url + ']').html();
}

function onPageNavigate() {
    Tag.refresh();
    $('[data-toggle=tagit]').each(initTagit);
}

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

    $.get(url + '.html').done(function(html) {
        $('.page-content').html(html);
        $(window).trigger('page-navigate', [url]);
    }).fail(function(xhr) {
        Message.error('Fetch page error: ' + xhr.responseText);
    });
}

function initSidebar($sidebar) {
    $('.sidebar').on('click', '.nav li a', function(e) {
        var url = $(e.target).attr('href');
        var title = $(e.target).html();
        navigate(url, title);
        return false;
    });
}
