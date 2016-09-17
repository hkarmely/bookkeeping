define(['jquery', 'lodash'], function($, _) {
    $.fn.populate = function(obj) {
        var $form = $(this);
        _.forOwn(obj, function(v, k) {
            $form.find('[name=' + k + ']').val(v);
        });
    };
    $.fn.serializeObject = function() {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
    return $;
});
