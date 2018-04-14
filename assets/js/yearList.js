/*
    取得學校經費列表
    @param type 學校類型
        0 : 膺續學校
        1 : 新申請學校
        else : 全部學校
*/
function listYear() {
    get(
        ("../API/yearList.ashx"),
        {},
        renderYearSelect,
        errorHandle
    )
}

/*
    錯誤處理
*/
function errorHandle(xhr, ajaxOptions, thrownError) {
    //alert("取得年度列表時出現錯誤");
    console.log(xhr, ajaxOptions, thrownError);
}


/*
    將取回的學校資料輸出至頁面
*/
function renderYearSelect(yearList) {
    var select = document.getElementById('yearSelect');
    select.innerHTML = "";
    for (var i = 0 ; i < yearList.length ; i++) {
        var option = document.createElement('option');
        option.text = yearList[i].year;
        option.value = yearList[i].year;
        select.appendChild(option);
    }
    
}

/*
    取得學年度
*/
function getSelectedYear() {
    return document.getElementById("yearSelect").value;
}