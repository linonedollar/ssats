
getFundingInfo()

function getFundingInfo() {
    get(
        ("API/school/fundingCompare.ashx"),
        {},
        render,
        errorHandle
    )
}

/*
    錯誤處理
*/
function errorHandle(xhr, ajaxOptions, thrownError) {
    alert("取得資料時出現錯誤");
    console.log(xhr, ajaxOptions, thrownError);
}

function render(fundingList) {
    console.log(fundingList)
    if (fundingList.length == 0)
        return false;
    //console.log(fundingList);
    var fundingTable = document.getElementById('fundingTable');
    var fundingA_Total = 0;
    var fundingB_Total = 0;
    var fundingC_Total = 0;
    var fundingD_Total = 0;
    var fundingE_Total = 0;
    var fundingF_Total = 0;
    
    for (var i = 0; i < fundingList.length; i++) {
        var total = 0;
        var keys = Object.keys(fundingList[i]);
        var tr = document.createElement('tr');
        for (var j = 0; j < keys.length; j++) {
            var td = document.createElement('td');
            var content = {};
            //console.log("field:", keys[j]);
            switch (keys[j]) {
                case "item":
                    td.colSpan = '2';
                    content = document.createTextNode(fundingList[i][keys[j]]);
                    break;
                case "fundingA":
                    fundingA_Total += fundingList[i][keys[j]];
                    content = document.createTextNode(fundingList[i][keys[j]]);
                    break;
                case "fundingB":
                    fundingB_Total += fundingList[i][keys[j]];
                    content = document.createTextNode(fundingList[i][keys[j]]);
                    break;
                case "fundingC":
                    fundingC_Total += fundingList[i][keys[j]];
                    content = document.createTextNode(fundingList[i][keys[j]]);
                    break;
                case "fundingD":
                    fundingD_Total += fundingList[i][keys[j]];
                    content = document.createTextNode(fundingList[i][keys[j]]);
                    break;
                case "fundingE":
                    fundingE_Total += fundingList[i][keys[j]];
                    content = document.createTextNode(fundingList[i][keys[j]]);
                    break;
                case "fundingF":
                    fundingF_Total += fundingList[i][keys[j]];
                    content = document.createTextNode(fundingList[i][keys[j]]);
                    break;
                default:
                    content = document.createTextNode(fundingList[i][keys[j]]);
            }
            td.appendChild(content);
            tr.appendChild(td);
        }
        // 各校經費總計
        fundingTable.appendChild(tr);
    }
    

}