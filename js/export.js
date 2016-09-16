$(function(){
    var $data = $('#data');
    var ts = Transaction.query();
    $data.html(JSON.stringify(ts));
});
