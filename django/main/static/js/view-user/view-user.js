function createView(){
    var username = this.getAttribute("u");
    var project_title = this.getAttribute("t");
    processSearch(username, project_title);
}

function deleteChildren(node){
    while (node.childNodes.length > 0){
        var child = node.childNodes[0];
        node.removeChild(child);
    }

}
function processSearch(username, title){
    if (current_user.user.username == username){
        var main = document.getElementById("main");
        deleteChildren(main);
        showHome(current_user);
    }
    else
        getUserProject(username, title); //event-view-user.jss
}