var TRACK_LIST_DIV_ID = "track_list_div";

// Gets all tracks associated to a user
// parent_node, parent tag to attach the track list section
function getUserTracks(parent_node){
    var url = "api/get-tracks";
    var data = {};
    var username = current_user.user.username;
    data["username"] = username;
    data = JSON.stringify(data);

    var processTracks = function(result){
        current_user["tracks"] = result["tracks"];
        createUserTrackList(parent_node); // track-list.js
    }

    getRequest(url, data, processTracks);
}

// Show comments associated to a track
// Called at track-list.js
function showTrackComments(){
    var track = this.parentNode.previousSibling.childNodes[0].id;
    getAllTrackComments(track); //event-track-comments.js
}