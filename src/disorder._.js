disorder._ = (function (_) {
    _.map = function (xs, f) {
        var r = [];
        for (var i = 0; i < xs.length; ++i)
            r.push(f(xs[i]));
        return r;
    };

    _.curry = function (f, a) {        
        return function () {
            var args = Array.prototype.slice.call(arguments);
            args.unshift(a);
            return f.apply(null, args);
        };
    };

    return _;
}({}))
