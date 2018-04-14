/*
    取得學校經費列表
    @param type 學校類型
        0 : 膺續學校
        1 : 新申請學校
        else : 全部學校
*/
function listSchool(country, isNew) {
    var param = { country, isNew };
    if (getSelectedYear()) {
        param = { country, isNew, year: getSelectedYear() }
    }
    get(
        ("../API/admin/listSchoolFoundingByCountry2.ashx"),
        param,
        render,
        errorHandle
    )
}

/*
    錯誤處理
*/
function errorHandle(xhr, ajaxOptions, thrownError) {
    alert("error");
    console.log(xhr, ajaxOptions, thrownError);
}

/*
    將取回的學校資料輸出至頁面
*/
function render(schoolList) {
    var TotalFunding = 0;
    var schoolTable = document.getElementById('schoolTable');
    schoolTable.innerHTML = "<tr><td>申請人</td><td>申請類型</td><td>所屬縣市</td><td>學校代碼</td><td>學校名稱</td><td>人事費</td><td>業務費</td><td>設備費</td><td>總額</td></tr>";
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
            var uid = schoolList[i]["uid"];
            var sid = schoolList[i]["sid"];
            //console.log("field:", keys[j]);
            switch (keys[j]) {
                case "year":
                case "uid":
                case "sid":
                    continue; 
                // 學校名稱
                case "name":
                    content = document.createElement('a');
                    content.href = "/ap/admin/ViewApplication.aspx?action=1&sid=" + sid + "&uid=" + uid;
                    var country = document.createTextNode(schoolList[i][keys[j]]);
                    content.appendChild(country);
                    break;
                // 申請人名稱
                case "user_name":
                    if (schoolList[i][keys[j]] == null) 
                        schoolList[i][keys[j]] = '無';
                    content = document.createTextNode(schoolList[i][keys[j]]);
                    break;
                case "isNew":
                    //schoolList[i][keys[j]] = (schoolList[i][keys[j]] == 0) ? "膺續學校" : "新申請學校";
                    switch (schoolList[i][keys[j]]) {
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
                    td.style = "text-align:right";
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
        td.style = "text-align:right";
        td.appendChild(document.createTextNode(thousandComma(total)));
        tr.appendChild(td);
        TotalFunding += total;
        schoolTable.appendChild(tr);
    }
    document.getElementById("totalCosts").innerHTML = thousandComma(TotalFunding);
}