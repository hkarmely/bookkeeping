define([
    'jquery',
    'models/tag',
    'models/transaction',
    'highcharts'
], function($, Tag, Transaction, Highcharts) {
    function onload() {
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
    }
    return {
        onload: onload
    };

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
});
