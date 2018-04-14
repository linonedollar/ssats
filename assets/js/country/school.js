/*
    取得學校經費列表
    @param type 學校類型
        0 : 膺續學校
        1 : 新申請學校
        else : 全部學校
*/
function listSchool(isNew) {
    var param = { isNew };
    if (getSelectedYear()) {
        param = { isNew, year: getSelectedYear() }
    }
    get(
        ("../API/country/listSchoolFounding.ashx"),
        param,
        render,
        errorHandle
    )
}

/*
    錯誤處理
*/
function errorHandle(xhr, ajaxOptions, thrownError) {
    alert("請重新登入");
    window.location.href = "CountryLogin.aspx";
    console.log(xhr, ajaxOptions, thrownError);
}


/*
    將取回的學校資料輸出至頁面
*/
function render(schoolList) {
    var TotalFunding = 0;
    var schoolTable = document.getElementById('schoolTable');
    
    // 清除原本資料
    for (let idx = schoolTable.childNodes.length - 1; idx > 2; idx--) {
        schoolTable.removeChild(schoolTable.childNodes[idx]);
    }

    if (schoolList.length == 0) {
        document.getElementById("totalCosts").innerHTML = TotalFunding;
        return false;
    }
    
    //console.log(schoolList);
    for (var i = 0 ; i < schoolList.length ; i++) {
        var total = 0;
        var keys = Object.keys(schoolList[i]);
        var tr = document.createElement('tr');
        for (var j = 0 ; j < keys.length ; j++) {
            var td = document.createElement('td');
            var content = {};
            //console.log("field:", keys[j]);
            switch (keys[j]) {
                case "isUploaded":
                case "year":
                case "uid":
                case "sid":
                case "isLevel1Done":
                case "isLevel2Done":
                case "remark":
                    continue;
                case "user_name":
                    schoolList[i][keys[j]] = (schoolList[i][keys[j]] == null) ? '無' : schoolList[i][keys[j]];
                    content = document.createTextNode(schoolList[i][keys[j]]);
                    break;
                case "isNew":
                    //schoolList[i][keys[j]] = (schoolList[i][keys[j]] == 0) ? "膺續學校" : "新申請學校";
                    switch (schoolList[i][keys[j]]){
                        case 0:
                            schoolList[i][keys[j]] = "膺續學校";
                            break;
                        case 1:
                            schoolList[i][keys[j]] = "新申請學校";
                            break;
                        default:
                            schoolList[i][keys[j]] = "尚未申請";
                    }
                    content = document.createTextNode(schoolList[i][keys[j]]);
                    break;
                case "StaffCosts":
                case "AgencyCost":
                case "DeviceCost":
                    //td.style = "text-align:right";
                    var costs = (schoolList[i][keys[j]] == null) ? 0 : schoolList[i][keys[j]];
                    total += costs;
                    content = document.createTextNode(thousandComma(costs));
                    break;
                default:
                    content = document.createTextNode(schoolList[i][keys[j]]);
            }
            td.appendChild(content);
            tr.appendChild(td);
        }
        // 各校經費總計
        var td = document.createElement('td');
        //td.style = "text-align:right";
        td.appendChild(document.createTextNode(thousandComma(total)));
        tr.appendChild(td);
        tr.insertBefore(td, tr.children[8]);
        TotalFunding += total;
        schoolTable.appendChild(tr);
    }
    document.getElementById("totalCosts").innerHTML = thousandComma(TotalFunding);
}