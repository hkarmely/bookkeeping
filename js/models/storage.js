define(function() {
    var Storage = {
        get: function(k) {
            var str = localStorage.getItem(k);
            return str ? JSON.parse(str) : null;
        },
        set: function(k, v) {
            var str = JSON.stringify(v);
            localStorage.setItem(k, str);
            return v;
        }
    };
    return Storage;
});
