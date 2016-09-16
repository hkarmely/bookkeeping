$(window).on('page-loaded', function() {
    var $form = $('.transaction-form');
    $form.submit(function(e) {
        e.preventDefault();
        var transaction = _.chain($form.serializeArray())
            .map(function(v) {
                return [v.name, v.value];
            })
            .fromPairs()
            .value();
        transaction.amount = Number(transaction.amount);
        transaction = Transaction.save(transaction);
        Tag.refresh();
        console.log('[input] transaction saved', transaction);
        Message.success('Transaction saved!');
    });
});
