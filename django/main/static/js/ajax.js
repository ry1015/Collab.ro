var home = "http://127.0.0.1:8000/";
function failCallback(result){
    console.log(result.responseText);
}

function getCookie(name) {
    var cookieValue = null;
    if(document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for(var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            if(cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getCookie('csrftoken');

function csrfSafeMethod(method) {
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

function getRequest(url, data, callback){
    $.getJSON({
        url: home + url,
        data: data,
        success : function (result) { 
            callback(result);
        },
        error : function(result){
            failCallback(result);
        }
    });
}

function postRequest(url, data, callback){
    $.ajax({
        type: "POST",
        url: url,
        data: data,
        beforeSend: function(xhr, settings) {
            if(!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        },
        success : function (result){
            callback(result);
        },
        error : function(result){
            failCallback(result);
        }
    });
}

function deleteRequest(url, data, callback){
    $.ajax({
        type: "DELETE",
        url: url,
        data: data,
        beforeSend: function(xhr, settings) {
            if(!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        },
        success : function (result){
            callback(result);
        },
        error : function(result){
            failCallback(result);
        }
    });
}

function getFormRequest(url, data, callback){
    $.getJSON({
        url: home + url,
        data: data,
        processData: false,
        contentType: false,
        success : function (result) { 
            callback(result);
        },
        error : function(result){
            failCallback(result);
        }
    });
}

function postFormRequest(url, data, callback){
    $.ajax({
        type: "POST",
        url: url,
        data: data,
        beforeSend: function(xhr, settings) {
            if(!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        },
        processData: false,
        contentType: false,
        success : function (result){
            callback(result);
        },
        error : function(result){
            failCallback(result);
        }
    });
}

function deleteFormRequest(url, data, callback){
    $.ajax({
        type: "DELETE",
        url: url,
        data: data,
        beforeSend: function(xhr, settings) {
            if(!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        },
        processData: false,
        contentType: false,
        success : function (result){
            callback(result);
        },
        error : function(result){
            failCallback(result);
        }
    });
}