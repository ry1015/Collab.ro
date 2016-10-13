function getUserProject(user, project){
    var url = "api/get-user-public-project";
    form = new FormData();
    form.append("username", user);
    form.append("project_title", project);
    form.append("viewer", current_user.user.username);
    postFormRequest(url, form, processUserProject);
}

function processUserProject(result){
    console.log(result);
}