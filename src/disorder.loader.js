disorder.loader = (function (loader, global, fragment, resolve, curry) {
    var api = function (resolver) {
        return {using: curry(fragment.using, resolver)};
    };

    loader.fixed = function () {
        var resolver = curry(resolve.fixed, global);
        return api(resolver);
    };

    loader.url = function (base) {
        var resolver = curry(resolve.url, global);
        var based = curry(resolver, base);
        var munged = curry(based, resolve.namer);
        return api(munged);
    };

    return loader;
}({}, disorder.global, disorder.fragment, disorder.resolve, disorder._.curry))
