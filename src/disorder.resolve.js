disorder.resolve = (function (resolve) {
    resolve.fixed = function (scope, name, onload, onerror) {
        var parts = name.split(".");

        var check = function (obj, ps) {
            if (ps.length == 0)
                return;
            var next = ps.shift();
            var r = obj[next];
            if (!r)
                onerror();
            else
                find(r, ps);
        };

        check(scope, parts);
        onload();
    };

    var ie = function (onload, onerror) {
        return function () {
            if (this.readyState == 'loaded' || this.readyState == 'complete') {
                if (this.status >= 200 && this.status < 300)
                    onload();
                if (this.status >= 400)
                    onerror();
            }           
        };
    };

    resolve.url = function (scope, prefix, munger, name, onload, onerror) {
        var script = document.createElement('script');
        script.type= 'text/javascript';
        script.onreadystatechange = ie(onload, onerror);
        script.onload =  onload;
        script.onerror = onerror;
        script.src = prefix + "/" + munger(name);
        var head = document.getElementsByTagName('head')[0];
        head.appendChild(script);
    };

    resolve.namer = function (name) {
        return name.split(".").join("/") + ".js";
    };

    return resolve;
}({}))

