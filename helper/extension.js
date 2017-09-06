var SelectListItem = function(value, text){
    return {
        Value: value,
        Text: text 
    };
}

var SelectList = function(selectListItems, selectedValue=null){
    var options = "";
    selectListItems.forEach(function (selectListItem) {
        options += '<option value="' + selectListItem.Value + '">' + selectListItem.Text + '</option>';
    });
    return options;
    //return ('<select id="' + selector + '" name="' + selector + '">' + options + '</select>');
}