disorder.fragment = (function (fragment) {
    var definitions = {};
    var fragments = {};

    var define = function (definition, args, ondefine) {
        var name = definition.name;
        fragments[name] = definition.fn.apply(null, args);
        ondefine && ondefine(fragments[name]);
    };

    var fragmenter = function (resolver, name, use, error) {
        var definition = definitions[name];
        var dependencies = definition.dependencies;
        var args = [];
        var loop = function () {
            if (args.length == dependencies.length) 
                define(definition, args, use);
            else
                fragment.using(resolver, dependencies[args.length], function (d) {
                    args.push(d); loop();
                }, error);
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
    fragment.using = function (resolver, name, use, error) {
        if (!definitions[name])
            resolver(name, function () {
                if (definitions[name])
                    fragment.using(resolver, name, use, error);
                else
                    error();
            }, error);
        else if (!fragments[name])
            fragmenter(resolver, name, use, error);
        else 
            use(fragments[name]);
    };

    return fragment;
}({}))
