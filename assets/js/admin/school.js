/*
    取得學校經費列表
    @param type 學校類型
        0 : 膺續學校
        1 : 新申請學校
        else : 全部學校
*/
function listSchool(country, isNew) {
    var param = { country: country, isNew: isNew };
    if (getSelectedYear()) {
        param = { country: country, isNew: isNew, year: getSelectedYear() }
    }
    get(
        ("../API/admin/listSchoolFoundingByCountry2.ashx"),
        param,
        render,
        function(xhr, ajaxOptions, thrownError) {
            alert("取得學校資料時出現錯誤");
            console.log(xhr, ajaxOptions, thrownError);
        }
    )
}

/*
    錯誤處理
*/
function errorHandle(xhr, ajaxOptions, thrownError) {
    alert("error");
    console.log(xhr, ajaxOptions, thrownError);
}

function changeLevelStatus(year, sid, level, isDone) {
    console.log("changeLevel:", year, sid, level, isDone)
    // 串接API
    post(
        "../API/admin/updateLevelDone.ashx",
        { year: year, sid: sid, level: level, isDone:isDone },
        function () {
            //alert("資料已儲存");
            console.log("資料已儲存");
        },
        function (xhr, ajaxOptions, thrownError) {
            alert("更新階段資料時出現錯誤");
            console.log(xhr, ajaxOptions, thrownError);
        }
    )
}

function updateRemark(year, sid, text) {
    console.log("updateRemark:", year, sid, text)
    // 串接API
    post(
        "../API/admin/updateSchoolRemark.ashx",
        { year: year, sid: sid, text: text },
        function () {
            //alert("資料已儲存");
            console.log("資料已儲存");
        },
        function (xhr, ajaxOptions, thrownError) {
            alert("更新資料時出現錯誤");
            console.log("更新資料時出現錯誤");

        }
    )
}

function upload(form) {
    // 串接API
    postWithFile(
        "../API/admin/uploadFile.ashx",
        new FormData(form),
        function () {
            console.log("資料已儲存");
            alert("上傳成功");
            //content = document.createElement('a');
            //content.href = "../admin/downloadPDF.ashx?year=" + schoolList[i]["year"] + "&sid=" + schoolList[i]["sid"];
            //content.target = "_blank";
            //content.appendChild(document.createTextNode("下載"));
            //form.parentNode.replaceChild(content, form)
            location.reload();
        },
        function (xhr, ajaxOptions, thrownError) {
            alert("上傳失敗");
            console.log(xhr, ajaxOptions, thrownError);
        }

    )
}

function deletePDF(form) {
    // 串接API
    postWithFile(
        "../API/admin/deleteFile.ashx",
        new FormData(form),
        function () {
            console.log("資料已刪除");
            alert("刪除成功");
            location.reload();
        },
        function (xhr, ajaxOptions, thrownError) {
            alert("刪除失敗");
            console.log(xhr, ajaxOptions, thrownError);
        }

    )
}

/*
    將取回的學校資料輸出至頁面
*/
function render(schoolList) {
    var TotalFunding = 0;
    var schoolTable = document.getElementById('schoolTable');

    // 清除原本資料
    for (let idx = schoolTable.childNodes.length - 1; idx > 0; idx--) {
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
            var uid = schoolList[i]["uid"];
            var sid = schoolList[i]["sid"];
            var year = schoolList[i]["year"];
            //console.log("field:", keys[j]);
            switch (keys[j]) {
                case "year":
                case "uid":
                case "sid":
                    continue; 
                // 學校名稱
                case "name":
                    content = document.createElement('a');
                    content.href = "../admin/ViewApplication.aspx?action=1&sid=" + sid + "&uid=" + uid;
                    var country = document.createTextNode(schoolList[i][keys[j]]);
                    content.appendChild(country);
                    break;
                // 上傳檔案(學校審查結果)
                case "isUploaded":
                    if (schoolList[i][keys[j]]) {
                        // 下載按鈕
                        let downloadBtn = document.createElement('input');
                        downloadBtn.type = "button";
                        downloadBtn.className = 'btn applica-btn';
                        downloadBtn.value = "下載檔案";
                        // 下載連結
                        let downloadLink = document.createElement('a');
                        downloadLink.href = "../admin/downloadPDF.aspx?year=" + schoolList[i]["year"] + "&sid=" + schoolList[i]["sid"];
                        //downloadLink.appendChild(document.createTextNode("下載"));
                        downloadLink.appendChild(downloadBtn);
                        td.appendChild(downloadLink);
                        // 刪除按鈕
                        let delete_form = document.createElement('form');
                        delete_form.method = "POST";
                        delete_form.enctype = "multipart/form-data";
                        let deleteBtn = document.createElement('input');
                        deleteBtn.type = "button";
                        deleteBtn.className = 'btn applica-btn';
                        deleteBtn.value = "刪除檔案";
                        deleteBtn.onclick = function ($this) {
                            if (confirm("確定刪除檔案?")) {
                                deletePDF($this.target.parentNode);
                            }
                        }
                        let field_sid = document.createElement('input');
                        field_sid.type = 'hidden';
                        field_sid.name = "sid";
                        field_sid.value = schoolList[i]["sid"];
                        let field_year = document.createElement('input');
                        field_year.type = 'hidden';
                        field_year.name = "year";
                        field_year.value = schoolList[i]["year"];
                        delete_form.appendChild(field_year);
                        delete_form.appendChild(field_sid);
                        delete_form.appendChild(deleteBtn);
                        td.appendChild(delete_form);
                    }
                    // 上傳表單
                    content = document.createElement('form');
                    content.method = "POST";
                    content.enctype = "multipart/form-data";
                    uploadBtn = document.createElement('input');
                    uploadBtn.type = 'button';
                    uploadBtn.value = '選擇檔案';
                    uploadBtn.className = "btn applica-btn";
                    uploadBtn.onclick = function () {
                        this.form.pdfFile.click();
                    }
                    field_file = document.createElement('input');
                    field_file.type = 'file';
                    field_file.name = "pdfFile";
                    field_file.style = "display:none;"
                    field_file.onchange = function () {
                        upload(this.parentNode);
                    }
                    field_sid = document.createElement('input');
                    field_sid.type = 'hidden';
                    field_sid.name = "sid";
                    field_sid.value = schoolList[i]["sid"];
                    field_year = document.createElement('input');
                    field_year.type = 'hidden';
                    field_year.name = "year";
                    field_year.value = schoolList[i]["year"];
                    content.appendChild(uploadBtn);
                    content.appendChild(field_year);
                    content.appendChild(field_sid);
                    content.appendChild(field_file);
                    break;
                // 申請人名稱
                case "user_name":
                    if (schoolList[i][keys[j]] != null) {
                        content = document.createElement('a');
                        content.href = "/ap/ChangeUserInfo.aspx?sid=" + sid + "&uid=" + uid;
                        var country = document.createTextNode(schoolList[i][keys[j]]);
                        content.appendChild(country);
                        break;
                    }
                    else {
                        schoolList[i][keys[j]] = '無';
                        content = document.createTextNode(schoolList[i][keys[j]]);
                        break;
                    }
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
                case "isLevel1Done":
                case "isLevel2Done":
                    /*
                    content = document.createElement('input');
                    content.type = "checkbox";
                    content.checked = (schoolList[i][keys[j]] == 1);
                    content.onclick = (function (school, key) {
                        return function () {
                            changeLevelStatus(school["year"], school["sid"], key, this.checked);
                        }
                    })(schoolList[i], keys[j])
                    */
                    content = document.createElement('form');
                    let statusText = ['未請款', '撥款中', '已撥入'];
                    for (let k = 0; k < 3; k++) {
                        let label = document.createElement('label');
                        let radio = document.createElement('input');
                        let txt = document.createTextNode(statusText[k]);
                        let br = document.createElement('br');
                        radio.type = "radio";
                        radio.value = k;
                        radio.checked = (schoolList[i][keys[j]] == k);
                        radio.onclick = (function (school, key, status) {
                            return function () {
                                let children = this.parentNode.parentNode.children;
                                for (let i = 0; i < children.length; i++) {
                                    let radio = children[i].children[0];
                                    if (radio.value != status)
                                        radio.checked = false;
                                }
                                changeLevelStatus(school["year"], school["sid"], key, status);
                            }
                        })(schoolList[i], keys[j], k)
                        label.appendChild(radio);
                        label.appendChild(txt);
                        label.appendChild(br);
                        content.appendChild(label);
                    }
                    break;
                case 'levelStatus':
                    let status = [''];
                    content = document.createElement('input');
                    content.type = "radio";
                    content.checked = (schoolList[i][keys[j]] == 1);
                    content.onclick = (function (school, key) {
                        return function () {
                            changeLevelStatus(school["year"], school["sid"], key, this.checked);
                        }
                    })(schoolList[i], keys[j])
                    break;
                case "remark":
                    content = document.createElement('textarea');
                    content.cols = "10";
                    content.rows = "4";
                    content.onblur = (function (school) {
                        return function () {
                            updateRemark(school["year"], school["sid"], this.value);
                        }
                    })(schoolList[i])
                    var contextText = document.createTextNode((!schoolList[i][keys[j]]) ? "" : schoolList[i][keys[j]] );
                    content.appendChild(contextText);
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
        //tr.appendChild(td);
        tr.insertBefore(td, tr.children[8]);
        TotalFunding += total;
        schoolTable.appendChild(tr);
    }
    document.getElementById("totalCosts").innerHTML = thousandComma(TotalFunding);
}