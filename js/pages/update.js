define([
    'jquery',
    'models/tag',
    'models/transaction',
    'utils/message',
    'utils/form',
    'tag-it'
], function($, Tag, Transaction, Message) {
    function onload(params) {
        var t = Transaction.get(params.id);
        $('.transaction-form').populate(t);

        $('#tags').tagit({
            availableTags: Tag.queryName(),
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
            var t = $(this).serializeObject();
            Transaction.update(params.id, t);
            Message.success('已保存：' + t.date + '，￥' + t.amount);
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
