var TotalFunding = 0;
var TotalApplySchoolNum = 0;

/*
    取得縣市列表
*/
function listCountry() {
    get(
        ("../API/admin/listCountryFounding2.ashx"),
        {},
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
function render(countryList) {
    if (countryList.length == 0)
        return false;
    //console.log(countryList);
    var schoolTable = document.getElementById('countryTable');
    for (var i = 0 ; i < countryList.length ; i++) {
        var total = 0;
        var keys = Object.keys(countryList[i]);
        var tr = document.createElement('tr');
        for (var j = 0 ; j < keys.length ; j++) {
            var td = document.createElement('td');
            var content = {};
            //console.log("field:", keys[j]);
            switch (keys[j]) {
                case "sortKey":
                    continue;
                case "country":
                    content = document.createElement('a');
                    content.href = "/ap/sa/school.aspx?country=" + countryList[i][keys[j]];
                    var country = document.createTextNode(countryList[i][keys[j]]);
                    content.appendChild(country);
                    break;
                case "applyNum":
                    td.style = "text-align:right";
                    TotalApplySchoolNum += countryList[i][keys[j]];
                    content = document.createTextNode(thousandComma(countryList[i][keys[j]]));
                    break;
                case "StaffCosts":
                case "AgencyCost":
                case "DeviceCost":
                    td.style = "text-align:right";
                    var costs = (countryList[i][keys[j]] == null) ? 0 : countryList[i][keys[j]];
                    total += costs;
                    content = document.createTextNode(thousandComma(costs));
                    break;
                default:
                    content = document.createTextNode(countryList[i][keys[j]]);
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
    document.getElementById("totalCosts").innerHTML = "申請經費總額: " + thousandComma(TotalFunding) + "元";
    document.getElementById("Is_apply_school_count").innerHTML = TotalApplySchoolNum + " 所";
}