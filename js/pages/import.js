define([
    'jquery',
    'utils/message',
    'models/transaction',
    'strftime'
], function($, Message, Transaction, strftime) {
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
                if(data instanceof Array){
                    Transaction.dumpArray(data);
                }
                else{
                    Transaction.dump(data);
                }
                Message.success('导入成功');
            });
        });
    }

    function onunload() {
        $('.import-form').off('submit');
    }

    function saveOldTransactions() {
        var old = Transaction.query();
        var fingerprint = 'transaction-' + strftime('%Y-%m-%d');
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
