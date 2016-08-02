var COMMENT_SECTION_PARENT_IDS = ["comment-table-id", "comment-div"];
var PARENT_DIVS = ["body_div", "navigation-div", "post-comment-div"];
var HTML_TAG = "HTML";
var USER_COMMENT_INPUT = "user-comment-input";
var COMMENT_TABLE_ID = "comment-table-id";
var POST_COMMENT_DIV_ID = "post-comment-div";
var IGNORE = ["cancel-comment-button", "post-comment-button"];
var TD_MAX_NUM_CHILDREN = 4;
// Cancel comment
function cancelComment(){
    console.log("CANCEL COMMENT");
    var button_div = document.getElementById(POST_COMMENT_DIV_ID);
    if (button_div.innerHTML != "")
        button_div.innerHTML = "";
    var comment_input = document.getElementById(USER_COMMENT_INPUT);
    if (comment_input.value != "")
        comment_input.value = ""
}
// Get all comments associated to a particular track
// track, selected track
function getAllTrackComments(track){
    var url = "api/get-track-comments";
    var split_track = track.split("_");
    var track_username = split_track[1];
    
    var processAllTrackComments = function(result){
        var track_comments = result;
        createTrackCommentSection(track_comments); //track-comments.js
    }

    var data = 
    {
        "filename": track
    }
    getRequest(url, data, processAllTrackComments);
}

// Post comment
function postComment(){
    console.log("-------------------------------------------");
    console.log("POST COMMENT");
    // selected_track is found in track-comments.js

    var comment = document.getElementById(USER_COMMENT_INPUT).value;
    var processPostComment = function(result){
        document.getElementById(USER_COMMENT_INPUT).value = "";
        console.log(result);
    };

    if (comment != ""){
        var url = "api/post-track-comment";
        var data = {
            "username": current_user.user.username,
            "comment": comment,
            "track_filename": selected_track
        };
        var row_index = document.getElementById(USER_COMMENT_INPUT).parentNode.parentNode.rowIndex + 1;
        var row = document.getElementById(COMMENT_TABLE_ID).insertRow(row_index);

        var cell = row.insertCell(0);
        cell.style.border = "1px solid black";
        var div = document.createElement("div");
        var a = document.createElement("a");
        a.id = current_user.user.username;
        a.href = "#";
        a.innerHTML = current_user.user.username;
        a.setAttribute("class", "user-comments");
        var span = document.createElement("span");
        span.innerHTML = "&nbsp;(" + new Date().toString() + ")";
        span.style.fontSize = "10px";

        div.appendChild(a);
        div.appendChild(span);
        cell.appendChild(div);

        div = document.createElement("div");
        var text = comment;
        div.innerHTML = text;
        cell.appendChild(div);

        postRequest(url, data, processPostComment);
    }
}

// Reply to comment
function replyToComment(){
    console.log("-----------------------------------------------------------------")
    console.log("START REPLY TO COMMENT");
    // var tr_depth = findTRDepth(this) - 1;
    // var node = this;
    // for (var i = 0; i < tr_depth; i++){
    //     node = node.parentNode;
    // }

    // var row_index = node.rowIndex + 1;
    // var row = document.getElementById(COMMENT_TABLE_ID).insertRow(row_index);

    // var cell = row.insertCell(0);
    
    var node = this;
    while (node.tagName != "TD"){
        node = node.parentNode;
    }

    if (node.children.length < TD_MAX_NUM_CHILDREN){
        var div = document.createElement("div");
        var input = document.createElement("input");
        input.id = "comment-reply-input";
        input.setAttribute("type", "text");


        div.setAttribute("class", "response");
        div.appendChild(input);
        node.appendChild(div);
    }
    console.log("END REPLY TO COMMENT");
}

// Tracks every user click
// If the user clicks outside the comment section, close comment section
// event, click event of the user
function traceClick(event){
    var parent_found = findParentNode(event.target);

    if (!parent_found)
    {
        console.log("OUTSIDE TABLE");
        var delete_table = document.getElementById("comment-div");
        if (delete_table == null || event.target.id == "Search")
            document.removeEventListener('click', traceClick, false);
        else{
            delete_table.parentNode.removeChild(delete_table);
            document.getElementById("track-list-table").style.visibility = "visible";
            document.getElementById("project_table").style.visibility = "visible";
            document.removeEventListener('click', traceClick, false);
        }
    }
}

function findParentNode(node){
    if (IGNORE.includes(node.id))
        return true;
    else if (PARENT_DIVS.includes(node.id) || node.tagName == HTML_TAG)
        return false;
    else if (COMMENT_SECTION_PARENT_IDS.includes(node.id))
        return true;
    else
        return findParentNode(node.parentNode)
}

function findTRDepth(node){
    if (node.tagName == null)
        return 0;
    else if (node.tagName == "TR")
        return 1;
    else
        return 1 + findTRDepth(node.parentNode);
}