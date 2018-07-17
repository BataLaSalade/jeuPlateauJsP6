var rows = 10;
var columns = 10;
var $row = $("<div />", {
    class: 'line'
});
var $square = $("<div />", {
    class: 'square'
});

$(document).ready(function () {
    //add columns to the the temp row object
    for (var i = 0; i < columns; i++) {
        $row.append($square.clone());
    }
    //clone the temp row object with the columns to the wrapper
    for (var i = 0; i < rows; i++) {
        $("#wrapper").append($row.clone());
    }
});