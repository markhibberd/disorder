disorder.fragment = (function (fragment, map, curry) {
    var definitions = {};
    var fragments = {};

    var define = function (definition, args, ondefine) {
        fragments[name] = definition.fn.apply(null, args);
        ondefine && ondefine(fragments[name]);
    }

    var fragmenter = function (resolver, name, use) {
        var definition = definitions[name];
        var dependencies = definition.dependencies;
        var args = [];
        var loop = function () {
            if (args.length == dependencies.length) 
                define(definition, args, use)
            else
                fragment.using(resolver, dependencies[args.length], function (d) {
                    args.push(d); loop();
                });
        };
        loop();
    };


    /** define a fragment */
    fragment.wire = function (name, dependencies, definition) {
        if (definitions[name])
            throw "multiple declaration for module [" + name + "]";
        definitions[name] = {
            name: name,
            dependencies: dependencies,
            fn: definition
        };
    };

    /** use a fragment */
    fragment.using = function (resolver, name, use) {
        if (!definitions[name])
            resolver(name, function () {
                fragment.using(resolver, name, use);
            });
        else if (!definitions[name])
            throw "can not load module [" + name + "]";
        else if (!fragments[name])
            fragmenter(resolver, name, use);
        else 
            use(fragments[name]);
    };

    return fragment;
}({}, disorder._.map, disorder._.curry))
