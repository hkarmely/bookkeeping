define(['models/storage', 'utils/guid'], function(Storage, GUID) {

    function Model(name) {
        this.name = name;
        this.cbs = {
            changed: []
        };
        if(!Storage.get(this.name)){
            Storage.set(this.name, {});
        }
    }

    Model.prototype = {
        get: function(id) {
            return Storage.get(this.name)[id];
        },
        update: function(id, val) {
            var all = Storage.get(this.name);
            if(!all[id]) return false;

            if(this.normalize){
                val = this.normalize(val);
            }
            var ret = _.assign(all[id], val);
            this.dump(all);
            return ret;
        },
        on: function(type, cb) {
            this.cbs[type].push(cb);
        },
        off: function(type, targetCb) {
            _.some(this.cbs[type], function(cb, i) {
                if (cb === targetCb) {
                    this.cbs[type].splice(i, 1);
                    return true;
                }
            }.bind(this));
        },
        trigger: function(type) {
            this.cbs[type].forEach(function(cb) {
                cb();
            });
        },
        create: function(val) {
            val = this.normalize(val);
            val.id = GUID();
            var all = Storage.get(this.name);
            all[val.id] = val;
            this.dump(all);
            return val;
        },
        remove: function(id) {
            var all = Storage.get(this.name);
            var val = all[id];
            delete all[id];
            this.dump(all);
            return val;
        },
        query: function() {
            return _.values(Storage.get(this.name));
        },
        raw: function() {
            return Storage.get(this.name);
        },
        dump: function(v) {
            Storage.set(this.name, v);
            this.trigger('changed');
            return v;
        },
        dumpArray: function(arr) {
            var obj = {};
            arr.forEach(function(o){
                // already exist or null
                if(obj[o.id] && !o.id){
                    obj.id = GUID();
                }
                obj[o.id] = o;
            });
            Storage.set(this.name, obj);
        },
        // default implementation
        normalize: function(v){
            return v;
        }
    };

    return Model;
});
