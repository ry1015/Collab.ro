var COMMENT_SECTION_PARENT_IDS = ["comment-table-id", "comment-div"];
var PARENT_DIVS = ["body_div", "navigation-div", "post-comment-div"];
var HTML_TAG = "HTML";
var USER_COMMENT_INPUT = "user-comment-input";
var COMMENT_TABLE_ID = "comment-table-id";
var POST_COMMENT_DIV_ID = "post-comment-div";
var IGNORE_IDS = ["cancel-comment-button", "post-comment-button"];
var INGORE_CLASSES = ["cancel-reply-button"]
var TD_MAX_NUM_CHILDREN = 4;
var COMMENT_REPLY_INPUT_ID = "comment-reply-input";

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

// Cancel reply to comment
function cancelReplyComment(){
    console.log("-------------------------------------------");
    console.log("START CANCEL REPLY TO COMMENT CLICKED");
    var parent_node = this;
    var delete_node = this;
    while (parent_node.tagName != "TD")
        parent_node = parent_node.parentNode;

    while (delete_node.className != "response")
        delete_node = delete_node.parentNode;

    parent_node.removeChild(delete_node);
    console.log("-------------------------------------------");
    console.log("END CANCEL REPLY TO COMMENT CLICKED");
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

// Post reply
function postReplyComment(){
    console.log("-------------------------------------------");
    console.log("REPLY TO COMMENT CLICKED");
    // selected_track is found in track-comments.js

    var comment = document.getElementById(COMMENT_REPLY_INPUT_ID).value;
    var processReplyComment = function(result){
        document.getElementById(COMMENT_REPLY_INPUT_ID).value = "";
        console.log(result);
    };

    if (comment != ""){
        var url = "api/post-reply-comment";
        var data = {
            "username": current_user.user.username,
            "comment": comment,
            "track_filename": selected_track
        };
        var comment_reply_node = document.getElementById(COMMENT_REPLY_INPUT_ID);
        while (comment_reply_node.tagName != "TR")
            comment_reply_node = comment_reply_node.parentNode;

        while (comment_reply_node != null)
            if (comment_reply_node.childNodes[0].className != "response")
                break;
            else
                comment_reply_node = comment_reply_node.nextSibling;
            
        var row_index = 0;
        if (comment_reply_node == null)
            row_index = document.getElementById(COMMENT_TABLE_ID).rows.length;
        else
            row_index = comment_reply_node.rowIndex + 1;
        var row = document.getElementById(COMMENT_TABLE_ID).insertRow(row_index);

        var cell = row.insertCell(0);
        cell.style.border = "1px solid black";
        cell.setAttribute("class", "response");
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

        // postRequest(url, data, processReplyComment);
    }
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
    if (INGORE_CLASSES.includes(node.className))
        return true;
    else if (IGNORE_IDS.includes(node.id))
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