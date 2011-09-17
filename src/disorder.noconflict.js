disorder.noconflict = (function (current) {
    return function () {
        var global = current.global;
        global.disorder = current.conflict;
        return current;
    };
}(disorder));
