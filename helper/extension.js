class SelectListItem {
    constructor(value, text){
        this.Value = value;
        this.Text = text;
    }
}

//generating options for select (dropdown)
var SelectList = function(selectListItems, selectedValue=null){
    var options = "";
    selectListItems.forEach(function (selectListItem) {
        if(selectedValue !== null && selectListItem.Value === selectedValue){
            options += '<option value="' + selectListItem.Value + '" selected>' + selectListItem.Text + '</option>';
        }else{
            options += '<option value="' + selectListItem.Value + '">' + selectListItem.Text + '</option>';
        }        
    });
    return options;
    //return ('<select id="' + selector + '" name="' + selector + '">' + options + '</select>');
}