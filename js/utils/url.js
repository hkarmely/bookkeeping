define(function(){
    function parse(url){
        var tokens = url.split('?');
        var query = _.chain(tokens[1])
            .split('&')
            .compact()
            .map(function(str){
                var arr = str.split('=');
                arr[1] = decodeURIComponent(arr[1]);
                return arr;
            })
            .fromPairs()
            .value();
        return {
            path: tokens[0],
            query: query
        };
    }
    return {
        parse: parse
    };
});
