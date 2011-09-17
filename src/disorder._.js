disorder._ = (function (_) {
    _.curry = function (f, a) {        
        return function () {
            var args = Array.prototype.slice.call(arguments);
            args.unshift(a);
            return f.apply(null, args);
        };
    };
    return _;
}({}))
