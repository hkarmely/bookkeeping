define(['jquery', 'models/tag', 'models/transaction', 'utils/message', 'tag-it'], function($, Tag, Transaction, Message) {
    function onload() {
        $('#tags').tagit({
            availableTags: Tag.query(),
            placeholderText: '以逗号分隔',
            singleField: true,
            fieldName: 'tags',
            tagLimit: 10,
            tabIndex: 6,
            onTagLimitExceeded: function() {
                Message.error('标签够多了哦！');
            }
        });
        $('.transaction-form').on('submit', function(e) {
            e.preventDefault();
            var transaction = _.chain($(this).serializeArray())
                .map(function(v) {
                    return [v.name, v.value];
                })
                .fromPairs()
                .value();
            transaction.amount = Number(transaction.amount);
            transaction = Transaction.save(transaction);
            Tag.refresh();
            console.log('[input] transaction saved', transaction);
            Message.success('已保存：' + transaction.date + '，￥' + transaction.amount);
        });
    }

    function onunload() {
        $('.transaction-form').off('submit');
    }
    return {
        onload: onload,
        onunload: onunload
    };
});
