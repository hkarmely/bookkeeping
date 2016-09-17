define(['messenger', 'bootbox', 'bluebird'], function(Messenger, bootbox, Promise) {
    bootbox.setLocale('zh_CN');

    var Message = {
        error: function(text) {
            Messenger().post({
                message: text,
                type: 'error',
                showCloseButton: true
            });
        },
        success: function(text) {
            Messenger().post({
                message: text,
                type: 'success',
                showCloseButton: true
            });
        },
        confirm: function(msg) {
            return new Promise(function(resolve, reject) {
                bootbox.confirm(msg || '是否确认？', function(ret) {
                    ret ? resolve() : reject();
                });
            });
        }
    };
    return Message;
});
