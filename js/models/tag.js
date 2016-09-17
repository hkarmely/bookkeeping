define(['models/model', 'models/transaction', 'lodash'], function(Model, Transaction, _){
    var Tag = Model('tags');

    Tag.refresh = function(v) {
        var transactions = Transaction.query();
        var tags = _.chain(transactions)
            .map(function(t) {
                return t.tags.split(',').map(_.trim);
            })
            .flatten()
            .uniq()
            .value();
        Tag.dump(tags);
    };
    return Tag;
});
