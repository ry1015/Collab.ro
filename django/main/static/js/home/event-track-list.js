var TRACK_LIST_DIV_ID = "track_list_div";

function getTracks(username, parent_node){
    var url = "api/get-tracks";
    var data = {};
    data["username"] = username;
    data = JSON.stringify(data);

    var processTracks() = function(result){
        current_user["tracks"] = result["tracks"];

    }
    getRequest(url, data, callback);

}