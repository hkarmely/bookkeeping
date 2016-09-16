$(window).on('page-loaded', function() {
    var ts = Transaction.query();
    var incomes = parse(ts, function(t) {
        return t.amount >= 0;
    });
    var expenses = parse(ts, function(t) {
        return t.amount < 0;
    });

    var trendData = [{
        name: '收入',
        data: incomes
    }, {
        name: '支出',
        data: expenses
    }];

    console.log(trendData);

    draw($('.trend'), trendData);
});

function draw($el, data) {
    $el.highcharts({
        chart: {
            type: 'area'
        },
        title: {
            text: '收入支出趋势'
        },
        xAxis: {
            type: 'datetime'
        },
        yAxis: {
            min: 0,
            minTickInterval: 1,
            title: {
                text: false
            }
        },
        tooltip: {
            formatter: function() {
                var date = Highcharts.dateFormat('%b月%e日', new Date(this.x));

                return date + this.series.name + "￥" + this.y;
            }
        },
        plotOptions: {
            area: {
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 2,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: data
    });
}

function parse(ts, filter) {
    var obj = {};
    ts.filter(filter).forEach(function(t) {
        if (obj[t.date] === undefined) {
            obj[t.date] = 0;
        }
        obj[t.date] += t.amount;
    });
    return _.keys(obj).sort().map(function(k) {
        var t = obj[k];
        return {
            x: new Date(k),
            y: Math.abs(obj[k])
        };
    });
}

Highcharts.setOptions({
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
