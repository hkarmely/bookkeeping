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
    }
};

function pageOn(Model, type, cb) {
    var id = Model.on(type, cb);
    $(window).one('page-navigate', function(event, target) {
        console.log('[input] page-navigate', target);
        if (!_.includes(target, 'input')) {
            Model.off('update', id);
        }
    });
}

function initTagit(i, el) {
    var $el = $(el);
    var tags = Tag.query().map(function(tag) {
        return tag.name;
    });

    $el.tagit({
        availableTags: tags,
        autocomplete: {
            delay: 0,
            minLength: 2
        },
        readOnly: $el.is('[readonly]'),
        placeholderText: 'separated by , or ;',
        singleField: true,
        fieldName: 'tags',
        tagLimit: 10,
        onTagLimitExceeded: function() {
            Message.error('Too mutch tags');
        },
        beforeTagAdded: function(event, ui) {
            if (typeof ui.tagLabel !== "string") return;
            var tags = ui.tagLabel.split(/[,;.，；、。]/).filter(function(tag) {
                return tag;
            });
            if (tags.length < 2) return; // prevent dead loop
            tags.map(function(tag) {
                $el.tagit("createTag", tag);
            });
            return false;
        }
    });
}
