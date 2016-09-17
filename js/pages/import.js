define([
    'jquery',
    'utils/message',
    'models/transaction'
], function($, Message, Transaction) {
    function onload() {
        $('.import-form').on('submit', function(e) {
            e.preventDefault();
            var msg = '导入后原有数据将被清空，替换为当前数据。是否确认导入？';
            Message.confirm(msg).then(function() {
                var raw = $('.import-form #data').val();
                var data = normalize(raw);
                if (!data) {
                    return Message.error('数据不合法: ' + raw);
                }
                saveOldTransactions();
                Transaction.dump(data);

                Message.success('导入成功');
            });
        });
    }

    function onunload() {
        $('.import-form').off('submit');
    }

    function saveOldTransactions() {
        var old = Transaction.query();
        var now = new Date();
        var fingerprint = 'transaction-' + now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + (now.getDate());
        console.log('[import] saving old transactions to', fingerprint);
        localStorage[fingerprint] = old;
    }

    function normalize(data) {
        try {
            return data = JSON.parse(data);
        } catch (e) {
            return false;
        }
    }
    return {
        onload: onload,
        onunload: onunload
    };
});
