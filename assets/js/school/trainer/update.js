/*
    新增防護員資料
*/
function updateTrainer(certificate_no, name, grade, success) {
    var param = { certificate_no, name, grade };
    post(
        ("./API/school/trainer/update.ashx"),
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
