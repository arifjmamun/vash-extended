
    var DropDownList = function (selector, source) {
        var options = "";

        source.forEach(function (obj) {
            options += '<option value="' + obj.value + '">' + obj.text + '</option>';
        });

        var select = '<select id="' + selector + '" name="' + selector + '">' + options + '</select>';
        return select;
    }
