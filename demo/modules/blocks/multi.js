disorder.fragment.wire("blocks.multi", ["blocks.red", "blocks.blue"], function (red, blue) {

    var block = function (text, colour, width, height) {
        var el = document.createElement("div");
        el.style.background = colour;
        el.style.width = width;
        el.style.height = height;
        return el;
    };

    var blat = function (el) {
        var r = block("i am a red div", red.get(), "100px", "100px");
        var b = block("i am a blue div", blue.get(), "200px", "200px");
        el.appendChild(r);
        el.appendChild(b);
    };

    return {blat: blat};
});
