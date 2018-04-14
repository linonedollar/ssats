/*
    變更會議資料
*/
function updateMeeting() {
    var type = "";
    var typeElements = $("input[id^='type']");
    for (let i = 0; i < typeElements.length; i++) {
        if (typeElements[i].checked) {
            type += typeElements[i].value + ",";
        }
    }
    /*
    var typeRadios = $('#typeRadio input:radio');
    for (var i = 0; i < typeRadios.length; i++) {
        if (typeRadios[i].checked) {
            type = typeRadios[i].value;
        }
    }
    */

    post(
        ("../API/regional/updateMeeting.ashx"),
        {
            meetingID: document.getElementById("meetingID").value,
            name: document.getElementById("mem_name").value,
            date: document.getElementById("selRegistBoxYearPage").value + '-' + document.getElementById("selRegistBoxMonthPage").value + '-' + document.getElementById("selRegistBoxDayPage").value,
            type: type,
            location: document.getElementById("location").value,
            num: document.getElementById("mem_num").value,
        },
        function () {
            alert("更新成功");
            location.href = "coach_meetinglist.aspx";
        },
        function errorHandle(xhr, ajaxOptions, thrownError) {
            alert("操作失敗");
            console.log(xhr, ajaxOptions, thrownError);
        }
    )
    
}

/*
    刪除會議資料
*/
function deleteMeeting(meetingID) {
    if (confirm("是否需刪除此筆資料?")) {
        post(
            ("../API/regional/deleteMeeting.ashx"),
            { meetingID: meetingID },
            function () {
                alert("刪除成功");
                location.href = "coach_meetinglist.aspx";
            },
            function errorHandle(xhr, ajaxOptions, thrownError) {
                alert("操作失敗");
                console.log(xhr, ajaxOptions, thrownError);
            }
        )
    }
}

/*
    變更教育講座資料
*/
function updateLeture() {
    var type = "";
    var typeElements = $("input[id^='type']");
    for (let i = 0; i < typeElements.length; i++) {
        if (typeElements[i].checked) {
            type += typeElements[i].value + ",";
        }
    }
    /*
    var typeRadios = $('#typeRadio input:radio');
    for (var i = 0; i < typeRadios.length; i++) {
        if (typeRadios[i].checked) {
            type = typeRadios[i].value;
        }
    }
    */
    
    post(
        ("../API/regional/updateLecture.ashx"),
        {
            edulectureID: document.getElementById("edulectureID").value,
            topic: document.getElementById("topic").value,
            name: document.getElementById("name").value,
            date: document.getElementById("selRegistBoxYearPage").value + '-' + document.getElementById("selRegistBoxMonthPage").value + '-' + document.getElementById("selRegistBoxDayPage").value,
            type: type,
            location: document.getElementById("location").value,
            num: document.getElementById("mem_num").value,
        },
        function () {
            alert("更新成功");
            location.href = "coach_edulecturelist.aspx";
        },
        function errorHandle(xhr, ajaxOptions, thrownError) {
            alert("操作失敗");
            console.log(xhr, ajaxOptions, thrownError);
        }
    )

}


/*
    刪除教育講座資料
*/
function deleteLecture(edulectureID) {
    if (confirm("是否需刪除此筆資料?")) {
        post(
            ("../API/regional/deleteLecture.ashx"),
            { edulectureID: edulectureID },
            function () {
                alert("刪除成功");
                location.href = "coach_edulecturelist.aspx";
            },
            function errorHandle(xhr, ajaxOptions, thrownError) {
                alert("操作失敗");
                console.log(xhr, ajaxOptions, thrownError);
            }
        )
    }
}

/*
    變更訪視紀錄資料
*/
function updateVisit() {
    var type = "";
    var purposeElements = $("input[id^='purpose']");
    var purpose = "";
    var memberTypeElements = $("input[id^='memberType']");
    var memberType = "";

    for (let i = 0; i < purposeElements.length; i++) {
        if (purposeElements[i].checked) {
            purpose += purposeElements[i].value + ",";
        }
    }

    for (let i = 0; i < memberTypeElements.length; i++) {
        if (memberTypeElements[i].checked) {
            memberType += memberTypeElements[i].value + ",";
        }
    }
    
    post(
        ("../API/regional/updateVisit.ashx"),
        {
            visitID: document.getElementById("visitID").value,
            schoolName: document.getElementById("school").value,
            purpose: purpose,
            memberType: memberType,
            date: document.getElementById("selRegistBoxYearPage").value + '-' + document.getElementById("selRegistBoxMonthPage").value + '-' + document.getElementById("selRegistBoxDayPage").value,
            num: document.getElementById("mem_num").value,
        },
        function () {
            alert("更新成功");
            location.href = "coach_visit_reclist.aspx";
        },
        function errorHandle(xhr, ajaxOptions, thrownError) {
            alert("操作失敗");
            console.log(xhr, ajaxOptions, thrownError);
        }
    )
    
}

/*
    刪除訪視紀錄資料
*/
function deleteVisit(visitID) {
    if (confirm("是否需刪除此筆資料?")) {
        post(
            ("../API/regional/deleteVisit.ashx"),
            { visitID: visitID },
            function () {
                alert("刪除成功");
                location.href = "coach_visit_reclist.aspx";
            },
            function errorHandle(xhr, ajaxOptions, thrownError) {
                alert("操作失敗");
                console.log(xhr, ajaxOptions, thrownError);
            }
        )
    }
}



