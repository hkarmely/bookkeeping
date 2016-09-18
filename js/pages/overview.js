define([
    'jquery', 'models/tag', 'models/transaction', 'utils/message', 'tag-it'
], function($, Tag, Transaction, Message) {
    function onload() {

        Transaction.on('changed', function(){
            renderTransactions();
            renderTotal();
        });
        Tag.on('changed', renderTags);

        Transaction.trigger('changed');
        Tag.trigger('changed');

        $('#tags').tagit({
            readOnly: true
        });
    }

    function onunload() {
        Transaction.off('changed', renderTransactions);
        Tag.off('changed', renderTags);
    }

    function renderTransactions() {
        var ts = Transaction.query();
        console.log('[overview] rendering transactions', ts.length, 'found');
        ts = ts.sort(function(lhs, rhs) {
                return (new Date(rhs.date)) - (new Date(lhs.date));
            })
            .map(function(t) {
                var $tr = $('<tr>');
                var $del = $('<a>')
                    .addClass('btn btn-xs btn-danger').html('删除')
                    .click(function() {
                        Message.confirm('确认删除该交易？').then(function() {
                            Transaction.remove(t.id);
                        });
                    });
                var $update = $('<a href="#update?id=' + t.id + '">')
                    .addClass('btn btn-xs btn-default').html('修改');
                $('<td>').html(t.date).appendTo($tr);
                $('<td class="cash">').html(t.amount).appendTo($tr);
                $('<td>').html(t.category).appendTo($tr);
                $('<td>').html(t.channel).appendTo($tr);
                $('<td>').html(t.member).appendTo($tr);
                $('<td>').html(t.tags).appendTo($tr);
                $('<td>').append($del).append($update).appendTo($tr);
                return $tr;
            });
        $('.transaction-table tbody').empty().append(ts);
    }

    function renderTags() {
        var ts = Tag.query().map(function(tag) {
            return tag.name + '(' + tag.count + ')';
        });
        console.log('[overview] rendering tags', ts.length, 'found');
        $('#tags').val(ts.join(','));
    }

    function renderTotal() {
        var ts = Transaction.query();
        var totalIn = 0,
            totalOut = 0,
            tsIn = 0,
            tsOut = 0;
        ts.forEach(function(t) {
            if (t.amount >= 0) {
                tsIn++;
                totalIn += t.amount;
            } else {
                tsOut++;
                totalOut -= t.amount;
            }
        });
        $('#total-income').html(Number(totalIn).toFixed(2));
        $('#total-expense').html(Number(totalOut).toFixed(2));
        $('#income-transactions').html(tsIn);
        $('#expense-transactions').html(tsOut);
    }

    return {
        onload: onload,
        onunload: onunload
    };
});
