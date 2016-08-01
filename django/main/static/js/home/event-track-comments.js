var COMMENT_SECTION_PARENT_IDS = ["comment-table-id", "comment-div"];
var PARENT_DIVS = ["body_div", "navigation-div"];
var HTML_TAG = "HTML";

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
    // data = JSON.stringify(data);
    getRequest(url, data, processAllTrackComments);
}

function showPost(){
    console.log("INPUT CLICKED");
    document.getElementById("user-comment-input").removeEventListener('click', showPost, false);

    var post_comment_div = document.getElementById("post-comment-div");
    var button = document.createElement("button");
    button.innerHTML = "POST";
    post_comment_div.appendChild(button);

    var button = document.createElement("button");
    button.innerHTML = "CANCEL";
    post_comment_div.appendChild(button);    
}

// Tracks every user click
// If the user clicks outside the comment section, close comment section
// event, click event of the user
function traceClick(event){
    var parent_found = findParentNode(event.target);

    if (parent_found)
        console.log("INSIDE TABLE");
    else
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
    if (node.tagName == HTML_TAG || PARENT_DIVS.includes(node.id))
        return false;
    else if (COMMENT_SECTION_PARENT_IDS.includes(node.id))
        return true;
    else
        return findParentNode(node.parentNode)
}