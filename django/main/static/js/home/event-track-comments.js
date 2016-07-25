var COMMENT_SECTION_PARENT_IDS = ["comment-table-id", "comment-div"];

// Tracks every user click
// If the user clicks outside the comment section, close comment section
// event, click event of the user
function traceClick(event){
    if (event.target.parentNode.parentNode != null)
        var parentNode = event.target.parentNode.parentNode.parentNode.parentNode.id;

    var comment_div = document.getElementById("comment-div");
    // console.log(comment_div.innerHTML);
    if (comment_div != null){
        if (parentNode != null && COMMENT_SECTION_PARENT_IDS.includes(parentNode)){
            console.log("INSIDE TABLE");
        }
        else{
            console.log(event.target.className);
            if (event.target.tagName != "IMG" && event.target.className != COMMENT_CLASS){
            console.log("OUTSIDE TABLE");
            var delete_table = document.getElementById("comment-div");
            delete_table.parentNode.removeChild(delete_table);
            }
        }
    }
}