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
        highcharts: {
            deps: ["jquery"],
            init: function($) {
                this.Highcharts.setOptions({
                    global: {
                        useUTC: false
                    },
                    credits: {
                        enabled: false
                    },
                    xAxis: {
                        dateTimeLabelFormats: {
                            month: '%m月%d日',
                            day: '%m月%d日',
                            week: '%m月%d日'
                        }
                    },
                    lang: {
                        loading: '正在载入...',
                        months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                        weekdays: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
                        shortMonths: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
                        exportButtonTitle: "导出",
                        printChart: "打印",
                        rangeSelectorFrom: "从",
                        rangeSelectorTo: "到",
                        rangeSelectorZoom: "区间",
                        downloadPNG: '下载 PNG',
                        downloadJPEG: '下载 JPEG',
                        downloadPDF: '下载 PDF',
                        downloadSVG: '下载 SVG',
                        drillUpText: '返回{series.name}',
                        noData: '没有可显示的数据'
                    }
                });
                return this.Highcharts;
            }
        }
    }
});

requirejs(['index']);
