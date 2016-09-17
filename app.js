requirejs.config({
    baseUrl: 'js',
    paths: {
        'jquery': '../lib/jquery/jquery.min',
        'bootstrap': '../lib/bootstrap/js/bootstrap.min',
        'messenger': "../lib/messenger/js/messenger.min",
        'messenger-future': "../lib/messenger/js/messenger-theme-future",
        'jquery-ui': "../lib/jquery-ui/jquery-ui.min",
        'tag-it': "../lib/tag-it/js/tag-it.min",
        'lodash': "../lib/lodash/lodash.min",
        'bootbox': "../lib/bootbox/bootbox.min",
        'highcharts': "../lib/highcharts/highcharts",
        'bluebird': '../lib/bluebird/bluebird.min'
    },
    shim: {
        bootstrap: ['jquery'],
        messenger: {
            exports: "Messenger",
            deps: ['jquery']
        },
        'messenger-future': ['messenger'],
        'jquery-ui': ['jquery'],
        'tag-it': ['jquery-ui'],
        bootbox: ['bootstrap'],
        highcharts: {
            exports: "Highcharts",
            deps: ["jquery"]
        }
    }
});

requirejs(['index']);
