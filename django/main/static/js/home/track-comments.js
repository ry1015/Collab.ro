var COMMENT_DIV_ID = "comment-div";
var COMMENT_TABLE_ID = "comment-table-id";
var POST_COMMENT_BUTTON_ID = "post-comment-button";
var CANCEL_COMMENT_BUTTON_ID = "cancel-comment-button";
var TRACK_LIST_DIV_ID = "track-list-div";
var INPUT_TABLE_ID = "input-table-id";
var selected_track = "";
var REPLY_ID = "reply-button";
var POST_REPLY_CLASS = "post-reply-button";
var CANCEL_REPLY_CLASS = "cancel-reply-button";
var MARGIN = 148;
var TRACK_PREVIOUS_ID = "track-previous";
var TRACK_NEXT_ID = "track-next";

// Add event listener to every click a user makes when track comment section is activated
function addCommentEventListener(){
    document.addEventListener('click', traceClick, false); //event-track-comments.js
    document.getElementById("user-comment-input").addEventListener('click', showPost, false);

    var reply_buttons = document.getElementsByClassName(REPLY_ID);
    for (var i = 0; i < reply_buttons.length; i++){
        reply_buttons[i].addEventListener('click', createReplyToCommentSection, false);
    }
    
}

// Add post comment event listener 
function addPostCommentEventListener(){
    document.getElementById(POST_COMMENT_BUTTON_ID).addEventListener('click', postComment, false); //event-track-comments.js
    document.getElementById(CANCEL_COMMENT_BUTTON_ID).addEventListener('click', cancelComment, false); //event-track-comments.js
}

// Add reply event listener
function addReplyToCommentEventListener(){
    var post_replies = document.getElementsByClassName(POST_REPLY_CLASS);
    for (var i = 0; i < post_replies.length; i++){
        post_replies[i].addEventListener('click', postReplyComment, false); //event-track-comments.js
    }

    var cancel_replies = document.getElementsByClassName(CANCEL_REPLY_CLASS);
    for (var i = 0; i < cancel_replies.length; i++){
        cancel_replies[i].addEventListener('click', cancelReplyComment, false); //event-track-comments.js
    }
}

// Add event listeners to previous and next buttons
function addTrackNavigationEventListener(){
    document.getElementById(TRACK_PREVIOUS_ID).addEventListener('click', previousTrack, false); //event-track-comments.js
    document.getElementById(TRACK_NEXT_ID).addEventListener('click', nextTrack, false); //event-track-comments.js
}

// Creates a comment div for the associated track
// track, associated user track
// called in event-track-comments.js
function createTrackCommentSection(track_comments)
{
    console.log("-------------------------------------------------------")
    console.log("START OF CREATING TRACK COMMENTS");
    

    document.getElementById("track-list-table").style.visibility = "hidden";
    document.getElementById("project_div").style.visibility = "hidden";
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
    var cell_previous = row.insertCell(0);
    // cell_previous.innerHTML = "PREVIOUS";
    cell_previous.id = TRACK_PREVIOUS_ID;

    cell = row.insertCell(1);
    cell.id = filename;
    cell.style.border = "1px solid black";
    cell.style.textAlign = "center";
    var track = new Audio("media/" + filename);
    track.controls = true;
    track.id = filename;
    selected_track = filename;
    cell.appendChild(track);

    cell_next = row.insertCell(2);
    // cell_next.innerHTML = "NEXT";
    cell_next.id = TRACK_NEXT_ID;

    // Create user input
    row = comment_table.insertRow(comment_table.rows.length);
    cell = row.insertCell(0);
    cell.colSpan = "3";

    var input = document.createElement("input");
    input.id = "user-comment-input";
    input.setAttribute("type", "text");
    input.placeholder = "Share a creative comment...";
    // input.value = "i love mah music";

    var post_comment_div = document.createElement("div");
    post_comment_div.id = "post-comment-div";
    cell.appendChild(input);
    cell.appendChild(post_comment_div);
    cell.style.textAlign = "center";

    // Insert track comments
    for (var i in track_comments)
    {
        if (track_comments[i]["filename"] == undefined)
        {
            row = comment_table.insertRow(comment_table.rows.length);
            row.setAttribute("cid", track_comments[i]["id"]);
            cell = row.insertCell(0);
            cell.colSpan = "3";
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

            // Insert comment
            div = document.createElement("div");
            var text = track_comments[i]["comments"];
            div.innerHTML = text;
            cell.appendChild(div);
            
            // Insert reply button
            div = document.createElement("div");
            var button = document.createElement("button");
            button.setAttribute("class", REPLY_ID);
            var text = document.createTextNode("REPLY");
            button.appendChild(text);
            div.appendChild(button);
            cell.appendChild(div);

            // Insert replies
            var child_length = track_comments[i]["child"].length;
            for (var j = child_length - 1; j >= 0; j--)
            {
                row = comment_table.insertRow(comment_table.rows.length);
                cell = row.insertCell(0);
                cell.colSpan = "3";
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

                // Insert comment
                div = document.createElement("div");
                div.innerHTML = track_comments[i]["child"][j]["comments"];
                cell.appendChild(div);
                cell.setAttribute("class", "response")

                // Insert reply button
                div = document.createElement("div");
                var button = document.createElement("button");
                button.setAttribute("class", REPLY_ID);
                var text = document.createTextNode("REPLY");
                button.appendChild(text);
                div.appendChild(button);
                cell.appendChild(div);
            }
        }
    }

    comment_div.appendChild(comment_table);
    track_list_parent.appendChild(comment_div);
    addCommentEventListener();
    addTrackNavigationEventListener();
    console.log("END OF CREATING TRACK COMMENTS");
    console.log("-------------------------------------------------------")
}

// Gets rough estimate of the current position of an element
// elem, an element
function getPosition(elem) {
    var position = 0;
    elem = getTR(elem); // event-track-comments.js

    while (elem.previousSibling != null){
        position += elem.clientHeight;
        elem = elem.previousSibling;
    }
    return position;
}

function closeOtherReplyDiv(){
    var other_reply_divs = document.getElementsByClassName("response");
    for (var i = 0; i < other_reply_divs.length; ++i){
        if (other_reply_divs[i].tagName == "DIV"){
            var parent_node = other_reply_divs[i].parentNode;
            parent_node.removeChild(other_reply_divs[i]);
        }
    }
}
// Create reply to comment input
function createReplyToCommentSection(){
    console.log("-----------------------------------------------------------------")
    console.log("START REPLY TO COMMENT");
    var node = this;
    closeOtherReplyDiv();

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

        var button_div = document.createElement("div");
        button_div.id = "button-div-reply";
        var post_reply = document.createElement("button");
        post_reply.innerHTML = "POST";
        post_reply.setAttribute("class", POST_REPLY_CLASS);

        var cancel_reply = document.createElement("button");
        cancel_reply.innerHTML = "CANCEL";
        cancel_reply.setAttribute("class", CANCEL_REPLY_CLASS);

        button_div.appendChild(post_reply);
        button_div.appendChild(cancel_reply);
        div.appendChild(button_div);
        node.appendChild(div);

        var total = getPosition(div);
        var rec = div.getBoundingClientRect();
        if (rec.bottom > window.innerHeight){
            total += MARGIN;
            var diff = total - window.innerHeight;
            window.scroll(0, diff);
        }
        
        addReplyToCommentEventListener();
    }
    console.log("END REPLY TO COMMENT");
    console.log("-----------------------------------------------------------------")
}

// Create POST and CANCEL Buttons
function showPost()
{
    console.log("INPUT CLICKED");
    // document.getElementById("user-comment-input").removeEventListener('click', showPost, false);

    var post_comment_div = document.getElementById("post-comment-div");
    if (post_comment_div.innerHTML == "")
    {
        var button = document.createElement("button");
        button.innerHTML = "POST";
        button.id = POST_COMMENT_BUTTON_ID;
        post_comment_div.appendChild(button);

        var button = document.createElement("button");
        button.innerHTML = "CANCEL";
        button.id = CANCEL_COMMENT_BUTTON_ID;
        post_comment_div.appendChild(button);
        addPostCommentEventListener();
    }
}