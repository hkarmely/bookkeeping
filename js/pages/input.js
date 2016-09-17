define([
    'jquery',
    'models/tag',
    'models/transaction',
    'utils/message',
    'strftime',
    'tag-it',
    'utils/jquery.form'
], function($, Tag, Transaction, Message, strftime) {
    function onload() {
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
        reset();
        $('.transaction-form').on('submit', function(e) {
            e.preventDefault();
            var t = $(this).serializeObject();
            t = Transaction.create(t);
            reset();
            Tag.refresh();
            Message.success('已保存：' + t.date + '，￥' + t.amount);
        });
    }

    function reset(){
        $('.transaction-form').get(0).reset();
        $('#date').val(strftime('%Y-%m-%d'));
        $('#tags').tagit('removeAll');
    }

    function onunload() {
        $('.transaction-form').off('submit');
    }
    return {
        onload: onload,
        onunload: onunload
    };
});
