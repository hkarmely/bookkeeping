define(['jquery', 'models/transaction'], function($, Transaction) {
    function onload() {
        var $data = $('#data');
        var ts = Transaction.raw();
        $data.html(JSON.stringify(ts));
    }
    return {
        onload: onload
    };
});
