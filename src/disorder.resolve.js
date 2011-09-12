disorder.resolve = (function (resolve) {
    resolve.fixed = function (scope, name, onload) {
        var parts = name.split(".");

        var check = function (obj, ps) {
            if (ps.length == 0)
                return;
            var next = ps.shift();
            var r = obj[next];
            if (!r)
                throw "Could not resolve [" + name + "]";
            find(r, ps);
        };

        check(scope, parts);
        onload();
    };

    resolve.url = function (scope, prefix, munger, name, use) {
        var script = document.createElement('script');
        script.type= 'text/javascript';
        script.onreadystatechange = function () {
            if (this.readyState == 'complete' || this.readyState == 'loaded') {
                use && use();
                use = null;
            }
        }
        script.onload = use;
        script.src = prefix + "/" + munger(name);
        var head = document.getElementsByTagName('head')[0];
        head.appendChild(script);
    };

    resolve.namer = function (name) {
        return name.split(".").join("/") + ".js";
    };

    return resolve;
}({}))
