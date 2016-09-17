define([
    'jquery', 'models/tag', 'models/transaction', 'utils/message', 'tag-it'
], function($, Tag, Transaction, Message) {
    function onload() {
        updateData();

        Transaction.on('changed', renderTransactions);
        Tag.on('changed', renderTags);

        Transaction.trigger('changed');
        Tag.trigger('changed');

        $('#tags').tagit();
    }

    function onunload() {
        Transaction.off('changed', renderTransactions);
        Tag.off('changed', renderTags);
    }

    function renderTransactions() {
        var ts = Transaction.query();
        console.log('[overview] rendering transactions', ts.length, 'found');
        ts = ts
            .sort(function(lhs, rhs) {
                return (new Date(rhs.date)) - (new Date(lhs.date));
            })
            .map(function(t) {
                var $tr = $('<tr>');
                var $del = $('<a>').addClass('btn btn-xs btn-danger').html('删除')
                    .click(function() {
                        Message.confirm('确认删除该交易？').then(function() {
                            Transaction.remove(t.id);
                        });
                    });
                $('<td>').html(t.date).appendTo($tr);
                $('<td class="cash">').html(t.amount).appendTo($tr);
                $('<td>').html(t.category).appendTo($tr);
                $('<td>').html(t.channel).appendTo($tr);
                $('<td>').html(t.tags).appendTo($tr);
                $('<td>').append($del).appendTo($tr);
                return $tr;
            });
        $('.transaction-table tbody').empty().append(ts);
    }

    function renderTags() {
        var ts = Tag.query();
        console.log('[overview] rendering tags', ts.length, 'found');
        $('#tags').val(ts.join(','));
    }

    function updateData() {
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
        $('#total-income').html(totalIn);
        $('#total-expense').html(totalOut);
        $('#income-transactions').html(tsIn);
        $('#expense-transactions').html(tsOut);
    }
    return {
        onload: onload,
        onunload: onunload
    };
});
