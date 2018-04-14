
/*
  successCallback: function(response){}  
  errorCallback: function(xhr, ajaxOptions, thrownError){}  
*/
function get(url, data, successCallback, errorCallback) {
    $.ajax({
        url: url,
        type: 'GET',
        data: data,
        dataType:'json',
        error: errorCallback,
        success: successCallback
    });
}

/*
  successCallback: function(response){}  
  errorCallback: function(xhr, ajaxOptions, thrownError){}  
*/
function post(url, data, successCallback, errorCallback) {
    $.ajax({
        url: url,
        type: 'POST',
        data: data,
        dataType: 'json',
        error: errorCallback,
        success: successCallback
    });
}

/*
  successCallback: function(response){}  
  errorCallback: function(xhr, ajaxOptions, thrownError){}  
*/
function postWithFile(url, data, successCallback, errorCallback) {
    $.ajax({
        url: url,
        type: 'POST',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        dataType: 'json',
        error: errorCallback,
        success: successCallback
    });
}