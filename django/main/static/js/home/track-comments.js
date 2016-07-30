var COMMENT_DIV_ID = "comment-div";
var COMMENT_TABLE_ID = "comment-table-id";
var TRACK_LIST_DIV_ID = "track-list-div";

// Add event listener to every click a user makes when track comment section is activated
function addCommentEventListener(){
    document.addEventListener('click', traceClick, false); //event-track-comments.js
}

// Creates a comment div for the associated track
// track, associated user track
// called in event-track-comments.js
function createTrackCommentSection(track_comments){
    var track_list_parent = document.getElementById(TRACK_LIST_DIV_ID);
    var parent_table = document.getElementById(COMMENT_TABLE_ID);

    if (parent_table != null){
        parent_table.parentNode.removeChild(parent_table.parentNode.childNodes[0]);
        
        var temp_comment_div = document.getElementById(COMMENT_DIV_ID);
        if (temp_comment_div != null)
            temp_comment_div.remove();
    }

    var comment_div = document.createElement("div");
    comment_div.id = COMMENT_DIV_ID;
    comment_div.setAttribute("class", "center");

    var comment_table = document.createElement("table");
    comment_table.id = COMMENT_TABLE_ID

    console.log("----------------------------------");
    var filename="";
    console.log(track_comments);
    for (var i in track_comments){
        if (track_comments[i]["filename"] != null)
            filename = track_comments[i]["filename"];
            break;
    }


    row = comment_table.insertRow(comment_table.rows.length);
    cell = row.insertCell(0);
    cell.id = "TEST ID";
    cell.width = "10px";
    cell.height = "10px";
    cell.style.border = "1px solid black";

    row = comment_table.insertRow(comment_table.rows.length);
    cell = row.insertCell(0);
    cell.innerHTML = "<span>" + "track" + "<span>";

    row = comment_table.insertRow(comment_table.rows.length);
    cell = row.insertCell(0);
    cell.width = "10px";
    cell.height = "10px";

    comment_div.appendChild(comment_table);
    track_list_parent.appendChild(comment_div);
    addCommentEventListener();
}