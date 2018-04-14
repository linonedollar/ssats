/*
    設定系統年度
*/
function setYear() {
    post(
        ("../API/admin/updateYear2.ashx"),
        { year : getYear() },
        render,
        errorHandle
    )
}

/*
    錯誤處理
*/
function errorHandle(xhr, ajaxOptions, thrownError) {
    document.getElementById('year').value = "";
    alert("error");
    console.log(xhr, ajaxOptions, thrownError);
}


function getYear(){
    return document.getElementById('year').value;
}

/*
    將取回的學校資料輸出至頁面
*/
function render() {
    alert("系統申請年度已變更為: " + getYear());
    document.getElementById('currentYear').innerText = getYear();
    document.getElementById('year').value = "";
}