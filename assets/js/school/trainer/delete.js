/*
    刪除防護員資料
*/
function deleteTrainer(certificate_no, success) {
    var param = { certificate_no };
    post(
        ("./API/school/trainer/delete.ashx"),
        param,
        success,
        errorHandle
    )
}

/*
    錯誤處理
*/
function errorHandle(xhr, ajaxOptions, thrownError) {
    alert(xhr.responseJSON.msg);
    console.log(xhr, ajaxOptions, thrownError);
}
