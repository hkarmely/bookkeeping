define(['models/storage'], function(Storage){

    var _id = 0;

    var model = {
        get: function(id) {
            var arr = this.query();
            for (var i = 0; i < arr.length; i++) {
                if (obj.id === id) return obj;
            }
            return null;
        },
        update: function(id, val) {
            var arr = this.query();
            var update = arr.some(function(obj, i) {
                if (id === obj.id) {
                    val = new Model(val);
                    arr.splice(i, 1, val);
                    this.dump(arr);
                    return true;
                }
            }.bind(this));
            this.trigger('changed');
            return update;
        },
        on: function(type, cb) {
            console.log('[store] event on', type);
            cb.id = _id++;
            this.cbs[type].push(cb);
            //console.log(this.cbs[type]);
            return cb.id;
        },
        off: function(type, targetCb) {
            console.log('[store] event off', type);
            _.some(this.cbs[type], function(cb, i) {
                if (cb === targetCb) {
                    this.cbs[type].splice(i, 1);
                    return true;
                }
            }.bind(this));
        },
        trigger: function(type) {
            console.log('[store] triggering',
                this.cbs[type].length, 'callbacks for', type, 'event');
            //console.log(this.cbs[type]);
            this.cbs[type].forEach(function(cb) {
                cb();
            });
        },
        create: function(val) {
            val.id = _id++;
            return val;
        },
        save: function(val) {
            console.log('[store] saving', this.name);
            val = this.create(val);
            var arr = this.query();
            arr.push(val);
            this.dump(arr);
            this.trigger('changed');
            return val;
        },
        remove: function(id) {
            console.log('[store] removing', id);
            var arr = this.query();
            var val;
            arr = arr.filter(function(_val) {
                return _val.id !== id;
            });
            this.dump(arr);
            this.trigger('changed');
            return val;
        },
        query: function() {
            return Storage.get(this.name) || [];
        },
        dump: function(v) {
            console.log('[store] dumping', this.name);
            Storage.set(this.name, v);
            this.trigger('changed');
            return v;
        }
    };

    return function(name) {
        var m = Object.create(model);
        m.name = name;
        m.cbs = {
            changed: []
        };
        return m;
    }

});
