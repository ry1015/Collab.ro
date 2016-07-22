function createTrackCommentSection(track){
    console.log("CREATING TRACK COMMENT SECTION");
    var track_list_parent = document.getElementById("track-list-div");
    
    if (document.getElementById("comment-table-id").hasChildNodes())
        

    var comment_div = document.createElement("div");
    comment_div.id = "comment-div";
    comment_div.setAttribute("class", "center");

    var comment_table = document.createElement("table");
    comment_table.id = "comment-table-id";

    row = comment_table.insertRow(comment_table.rows.length);
    cell = row.insertCell(0);
    cell.innerHTML = "<span>" + track + "<span>";

    comment_div.appendChild(comment_table);
    
    track_list_parent.appendChild(comment_div);
}