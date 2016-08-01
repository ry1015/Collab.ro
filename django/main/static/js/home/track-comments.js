var COMMENT_DIV_ID = "comment-div";
var COMMENT_TABLE_ID = "comment-table-id";
var TRACK_LIST_DIV_ID = "track-list-div";
var INPUT_TABLE_ID = "input-table-id";
// Add event listener to every click a user makes when track comment section is activated
function addCommentEventListener(){
    document.addEventListener('click', traceClick, false); //event-track-comments.js
    document.getElementById("user-comment-input").addEventListener('click', showPost, false); //event-track-comments.js
}

// Creates a comment div for the associated track
// track, associated user track
// called in event-track-comments.js
function createTrackCommentSection(track_comments){
    console.log("-------------------------------------------------------")
    console.log("START OF CREATING TRACK COMMENTS");

    document.getElementById("track-list-table").style.visibility = "hidden";
    document.getElementById("project_table").style.visibility = "hidden";
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
    comment_div.style.marginTop = (-document.getElementById("track-list-div").clientHeight/2) + "px";
    var comment_table = document.createElement("table");
    comment_table.id = COMMENT_TABLE_ID

    // Find track filename
    var filename="";
    for (var i in track_comments){
        if (track_comments[i]["filename"] != undefined){
            filename = track_comments[i]["filename"];
            break;
        }
    }

    

    // Create track row
    var row = comment_table.insertRow(comment_table.rows.length);
    var cell = row.insertCell(0);
    cell.id = filename;
    cell.style.border = "1px solid black";
    cell.style.textAlign = "center";
    var track = new Audio("media/" + filename);
    track.controls = true;
    track.id = filename;
    cell.appendChild(track);

    // Create user input
    row = comment_table.insertRow(comment_table.rows.length);
    cell = row.insertCell(0);

    var input = document.createElement("input");
    input.id = "user-comment-input";
    input.setAttribute("type", "text");
    input.placeholder = "Share a creative comment...";

    var post_comment_div = document.createElement("div");
    post_comment_div.id = "post-comment-div";
    cell.appendChild(input);
    cell.appendChild(post_comment_div);
    cell.style.textAlign = "center";

    // Insert track comments
    for (var i in track_comments){
        if (track_comments[i]["filename"] == undefined){
            row = comment_table.insertRow(comment_table.rows.length);
            cell = row.insertCell(0);
            cell.style.border = "1px solid black";
            div = document.createElement("div");
            a = document.createElement("a");
            a.id = track_comments[i]["sender"]
            a.href = "#";
            a.innerHTML = track_comments[i]["sender"];
            a.setAttribute("class", "user-comments");
            var span = document.createElement("span");
            span.innerHTML = "&nbsp;(" + track_comments[i]["timestamp"] + ")";
            span.style.fontSize = "10px";

            div.appendChild(a);
            div.appendChild(span);
            cell.appendChild(div);

            div = document.createElement("div");
            var text = track_comments[i]["comments"];
            div.innerHTML = text;
            cell.appendChild(div);
            
            // Insert replies
            for (var j in track_comments[i]["child"]){
                row = comment_table.insertRow(comment_table.rows.length);
                cell = row.insertCell(0);
                cell.style.border = "1px solid black";
                div = document.createElement("div");
                a = document.createElement("a");
                a.id = track_comments[i]["sender"]
                a.href = "#";
                a.innerHTML = track_comments[i]["child"][j]["sender"];
                a.setAttribute("class", "user-comments");
                span = document.createElement("space");
                span.innerHTML = "&nbsp;(" + track_comments[i]["child"][j]["timestamp"] + ")";
                span.style.fontSize = "10px";

                div.appendChild(a);
                div.appendChild(span);
                cell.appendChild(div);

                div = document.createElement("div");
                div.innerHTML = track_comments[i]["child"][j]["comments"];
                cell.appendChild(div);
                cell.setAttribute("class", "response")
            }
        }
    }

    comment_div.appendChild(comment_table);
    track_list_parent.appendChild(comment_div);
    // document.getElementById("user-comment-input").style.width = "90%";
    addCommentEventListener();
    console.log("END OF CREATING TRACK COMMENTS");
    console.log("-------------------------------------------------------")
    
}