(function (global) {
    var conflict = this.disorder;
    global.disorder = {};
    global.disorder.global = global;
    global.disorder.conflict = conflict;    
}(this))

