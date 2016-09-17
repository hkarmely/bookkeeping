define([
    'models/model',
    'models/transaction',
    'lodash'
], function(Model, Transaction, _) {
    var Tag = new Model('tags');

    Tag.queryName = function(v) {
        return Tag.query().map(function(t) {
            return t.name;
        });
    };

    Tag.refresh = function(v) {
        var transactions = Transaction.query();
        var tags = _.chain(transactions)
            .map(function(t) {
                return t.tags.split(',').map(_.trim);
            })
            .flatten()
            .countBy(function(str){
                return str; 
            })
            .map(function(count, tag) {
                return Tag.create({
                    name: tag,
                    count: count
                });
            })
            .value();
        Tag.dump(tags);
    };

    return Tag;
});
