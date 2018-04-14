/*
    取得防護員資料
*/
function getTrainer(certificate_no, success) {
    var param = { certificate_no };
    get(
        ("./API/school/trainer/read.ashx"),
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
