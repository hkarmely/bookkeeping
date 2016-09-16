$(function() {
    var $form = $('.import-form');
    $form.submit(function(e) {
        e.preventDefault();
        bootbox.confirm('导入后原有数据将被清空，替换为当前数据。是否确认导入', function(ret) {
            if (!ret) return;

            var raw = $('.import-form #data').val();
            var data = normalize(raw);
            if (!data) {
                return Message.error('invalid data: ' + raw);
            }
            saveOldTransactions();
            Transaction.dump(data);

            Message.success('Import success');
        });
    });

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
});
