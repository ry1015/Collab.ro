var COMMENT_SECTION_PARENT_IDS = ["comment-table-id"];
var PARENT_DIVS = ["body_div", "navigation-div", "comment-div"];
var HTML_TAG = "HTML";
var USER_COMMENT_INPUT = "user-comment-input";
var COMMENT_TABLE_ID = "comment-table-id";
var POST_COMMENT_DIV_ID = "post-comment-div";
var IGNORE_IDS = ["cancel-comment-button", "post-comment-button"];
var INGORE_CLASSES = ["cancel-reply-button"]
var TD_MAX_NUM_CHILDREN = 4;
var COMMENT_REPLY_INPUT_ID = "comment-reply-input";
var track_comments = "";
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
// called at event-track-list.js
function getAllTrackComments(track){
    var url = "api/get-track-comments";
    var split_track = track.split("_");
    var track_username = split_track[1];
    
    var processAllTrackComments = function(result){
        track_comments = result;
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
    var row_num = "";
    var comment = document.getElementById(USER_COMMENT_INPUT).value;
    var processPostComment = function(result){
        document.getElementById(USER_COMMENT_INPUT).value = "";
        var post_comment_div = document.getElementById(POST_COMMENT_DIV_ID);
        if (post_comment_div.innerHTML != "")
            post_comment_div.innerHTML = "";

        var table_comments = document.getElementById(COMMENT_TABLE_ID);
        table_comments.childNodes[0].childNodes[row_num].setAttribute("cid", result["cid"]);
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
        cell.colSpan = "3";
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

        // Insert reply button
        div = document.createElement("div");
        var button = document.createElement("button");
        button.setAttribute("class", REPLY_ID);
        button.addEventListener('click', createReplyToCommentSection, false);
        var text = document.createTextNode("REPLY");
        button.appendChild(text);
        div.appendChild(button);
        cell.appendChild(div);
        row_num = getTR(cell).rowIndex;
        postRequest(url, data, processPostComment);
    }
}

// Get a node's TD
// node, a node
function getTD(node){
    while (node.tagName != "TD")
        node = node.parentNode;
    return node;
}

// Get a node's TR
// node, a node
function getTR(node){
    while (node.tagName != "TR")
        node = node.parentNode;
    return node;
}

// Checks if a node's tr is a child of a track comment
// node, the node that needs to be checked
function isNodeChild(node){
    if (node.getAttribute("cid") == null)
        return true;
    else
       return false;
}

// Find reply's parent
// node, reply node
function findParent(node){
    node = getTR(node);
    while (node.getAttribute("cid") == null)
        node = node.previousSibling
    return node;
}
// Post reply
function postReplyComment(){
    console.log("-------------------------------------------");
    console.log("REPLY TO COMMENT CLICKED");
    // selected_track is found in track-comments.js
    var comment_node = this.parentNode.previousSibling;
    var processReplyComment = function(result){
        var parent = getTD(comment_node);
        var child = comment_node.parentNode;
        parent.removeChild(child);
        console.log(result);
    };

    if (comment_node.value != ""){
        var url = "api/post-reply-comment";
        var comment_table = document.getElementById(COMMENT_TABLE_ID);
        var tr_node = getTR(comment_node);
        var child = isNodeChild(tr_node);
        var parent_val = "";

        if (child){
            var current_node = findParent(comment_node);
            parent_val = current_node.getAttribute("cid");
        } else
            parent_val = tr_node.getAttribute("cid")

        var data = {
            "username": current_user.user.username,
            "comment": comment_node.value,
            "track_filename": selected_track,
            "parent": parent_val
        };
        console.log(data);

        // If tr_node.nextSibling == null, last message has been reached
        if (tr_node.nextSibling != null)
            while (tr_node.nextSibling != null && tr_node.nextSibling.getAttribute("cid") == null)
                tr_node = tr_node.nextSibling;

        var row_index = tr_node.rowIndex + 1;
        var row = document.getElementById(COMMENT_TABLE_ID).insertRow(row_index);

        var cell = row.insertCell(0);
        cell.colSpan = "3";
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
        var text = comment_node.value;
        div.innerHTML = text;
        cell.appendChild(div);

        // Insert reply button
        div = document.createElement("div");
        var button = document.createElement("button");
        button.setAttribute("class", REPLY_ID);
        button.addEventListener('click', createReplyToCommentSection, false);
        var text = document.createTextNode("REPLY");
        button.appendChild(text);
        div.appendChild(button);
        cell.appendChild(div);

        var total = getPosition(div);
        if (button.getBoundingClientRect().bottom > window.innerHeight){
            total += MARGIN;
            var diff = total - window.innerHeight;
            window.scroll(0, diff);
        }

        postRequest(url, data, processReplyComment);
    }
}

function findChildNode(node, tag_name){
    var tmp = node;
    while (tmp.tagName != tag_name.toUpperCase()){
        tmp = tmp.firstChild;
    }
    return tmp;
}

function getTrackListChildNodes(parent){
    return parent.childNodes[0].childNodes[0].childNodes;
}

function nextTrack(){
    console.log("-------------------------------------------------------")
    console.log("NEXT TRACK CLICKED");
    var current_track = this.previousSibling.id;
    var track_table = document.getElementById(TRACK_LIST_DIV_ID);
    var tracks = getTrackListChildNodes(track_table);
    var index = Number.MAX_VALUE;
    var tracks_size = tracks.length;
    var next_node = null;

    for (var i=0; i < tracks_size; ++i){
        if (tracks[i].innerHTML.includes(current_track)){
            if (i+1 < tracks_size){
                index = i + 1;
                next_node = findChildNode(tracks[i+1], "audio");
                break;
            }
        }
    }

    if (index < tracks_size){
        getAllTrackComments(next_node.id);
    }
}

function previousTrack(){
    console.log("-------------------------------------------------------")
    console.log("PREVIOUS TRACK CLICKED");
    var current_track = this.nextSibling.id;
    var track_table = document.getElementById(TRACK_LIST_DIV_ID);
    var tracks = getTrackListChildNodes(track_table);
    var index = -1;
    var tracks_size = tracks.length;
    var previous_node = null;

    for (var i=tracks_size-1; i >= 0; --i){
        if (tracks[i].innerHTML.includes(current_track)){
            if (i-1 >= 0){
                index = i - 1;
                previous_node = findChildNode(tracks[i-1], "audio");
                break;
            }
        }
    }

    if (index >= 0){
        getAllTrackComments(previous_node.id);
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
            document.getElementById("project_div").style.visibility = "visible";
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