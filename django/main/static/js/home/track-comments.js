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
    console.log("-------------------------------------------------------")
    console.log("CREATING TRACK COMMENTS");

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
    console.log(track_comments);
    // Find track filename
    var filename="";
    for (var i in track_comments){
        if (track_comments[i]["filename"] != undefined){
            filename = track_comments[i]["filename"];
            break;
        }
    }

    // Create track row
    row = comment_table.insertRow(comment_table.rows.length);
    cell = row.insertCell(0);
    cell.id = filename;
    cell.width = "50px";
    cell.style.border = "1px solid black";
    cell.style.textAlign = "center";
    console.log("FILENAME");
    console.log(filename);
    var track = new Audio("media/" + filename);
    track.controls = true;
    track.id = filename;
    cell.appendChild(track);

    // Insert track comments
    for (var i in track_comments){
        if (track_comments[i]["filename"] == undefined){
            row = comment_table.insertRow(comment_table.rows.length);
            cell = row.insertCell(0);
            cell.style.border = "1px solid black";
            var span = document.createElement("span");
            var text = track_comments[i]["sender"] + "&nbsp;&nbsp;&nbsp;&nbsp;(" + track_comments[i]["timestamp"] + ")<br/>";
            text+=track_comments[i]["comments"];
            span.innerHTML = text;
            cell.appendChild(span);

            // Insert replies
            for (var j in track_comments[i]["child"]){
                row = comment_table.insertRow(comment_table.rows.length);
                cell = row.insertCell(0);
                cell.style.border = "1px solid black";
                span = document.createElement("span");
                var text = track_comments[i]["child"][j]["sender"] + "&nbsp;&nbsp;&nbsp;&nbsp;(" +
                            track_comments[i]["child"][j]["timestamp"] + ")<br/>";
                text+= track_comments[i]["child"][j]["comments"];
                span.innerHTML = text;
                cell.setAttribute("class", "response")
                cell.appendChild(span);
            }
        }
    }

    comment_div.appendChild(comment_table);
    track_list_parent.appendChild(comment_div);
    addCommentEventListener();
}