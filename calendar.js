var agendas = [[], [], [], [], [], [], []];
var newweekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
var weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Agu", "Sep", "Oct", "Nov", "Dec"];
var dates =[0, 0, 0, 0, 0, 0, 0];
var monthsNum =[0, 0, 0, 0, 0, 0, 0];

$(document).ready(function(){
    var d = new Date();
    var year = d.getFullYear(); //get the current year
    var date = d.getDate(); //get the current date
    var day = d.getDay();  //get the current day of the week, sunday is 0
    var month = d.getMonth() + 1;  //get the current month, january is 1
    var datesView = document.getElementsByClassName("date");
    var clickedDate=day-1;

    displayDates(year, date, day, month, clickedDate);

    $(".w3-display-right").click(function(){
        agendas = [[], [], [], [], [], [], []];
        var daysinmonth = getDaysInMonth(month,year);
        clickedDate = undefined;

        if (date + 7 > daysinmonth) {
            date = 7 - (daysinmonth - date);
            month++;
            if (month > 12) {
                month = 1;
                year++;
            }
        }
        else {
            date += 7;
        }

        displayDates(year, date, day, month, clickedDate);
    });

    $(".w3-display-left").click(function(){
        agendas = [[], [], [], [], [], [], []];
        var daysinprevmonth = getDaysInMonth(month-1,year);
        clickedDate = undefined;

        if (date - 7 < 1) {
            date = daysinprevmonth - (7 - date);
            month--;
            if (month < 1) {
                month = 12;
                year--;
            }
        }
        else {
            date -= 7;
        }

        displayDates(year, date, day, month, clickedDate);
    });

    $("#todaybutton").click(function(){
        agendas = [[], [], [], [], [], [], []];

        year = d.getFullYear(); //get the current year
        date = d.getDate(); //get the current date
        day = d.getDay();  //get the current day of the week, sunday is 0
        month = d.getMonth() + 1;  //get the current month, january is 1
        clickedDate = day-1;

        displayDates(year, date, day, month, clickedDate);
    });

    $(".date").click(function(){
        agendas = [[], [], [], [], [], [], []];
        clickedDate = $(this)[0].children[1].id.substring(3, 4) - 1;
        displayDates(year, date, day, month, clickedDate);
    });

    // Get the modal
    var modal = document.getElementById('myModal');

    // When the user clicks the title, open the modal 
    $('.agenda').on('click', '.titleView', function(event){
        $(".modal-body").empty();
        modal.style.display = "block";
        var close = document.createElement("span");
        close.className = "close";
        close.innerHTML = "&times;";
        $(".modal-body").append(close);

        //get the index of clicked item in the agenda view
        var titleView = document.getElementsByClassName("titleView");
        var index = -1;
        var i;
        for (i = 0; i<titleView.length; i++) {
            if (titleView[i] == event.target.parentElement || titleView[i] == event.target) {
                index = i;
            }
        }

        if (clickedDate == -1) {
            clickedDate = 6;
        }

        var agenda = agendas[clickedDate][index];
        var title = agenda.title;
        var date = agenda.date;
        var opendates = agenda.opendates;
        var time = agenda.time;
        var desc = agenda.desc;
        var trainer = agenda.trainer;
        var detail = agenda.detail;

        var titleView = document.createElement("p");
        var dateView = document.createElement("p");
        var timeView = document.createElement("div");
        var descView = document.createElement("div");
        var trainerView = document.createElement("p");
        var detailView = document.createElement("div");

        if (title != undefined) {
            titleView.style.marginTop = "10px";
            titleView.style.marginBottom = "15px";
            titleView.style.fontSize = "18px";
            titleView.innerHTML = title;

            $(".modal-body").append(titleView);
        }

        if (date != undefined) {
            var calendaricon = document.createElement("i");
            calendaricon.className = "far fa-calendar-alt";
            calendaricon.style.fontSize = "11px";

            if (title == "Opening Time") {
                date = "  " + opendates;
            }
            else {
                date = "  " + newweekdays[clickedDate] + ", " + months[monthsNum[clickedDate] - 1] + " " + dates[clickedDate] + ", " + year;
            }

            var datespan = document.createElement("span");
            datespan.innerHTML = date;

            dateView.appendChild(calendaricon);
            dateView.appendChild(datespan);
            $(".modal-body").append(dateView);
        }

        if (time != undefined) {
            var timeicon = document.createElement("i");
            timeicon.className = "fas fa-align-justify";
            timeicon.style.fontSize = "11px";
            timeView.appendChild(timeicon);
            var timespan = document.createElement("span");
            var timesplit = time.split("|");
            timespan.innerHTML = "  " + timesplit[0];
            timeView.appendChild(timespan);

            var i;
            for (i = 1; i<timesplit.length; i++) {
                var timespan = document.createElement("p");
                timespan.innerHTML = "  " + timesplit[i];
                timespan.style.marginLeft = "15px";
                timeView.appendChild(timespan);
            }

            timeView.style.marginTop = "8px";

            timeView.appendChild(timespan);

            $(".modal-body").append(timeView);
        }

        if (desc != undefined) {
            var descspan = document.createElement("span");
            descspan.innerHTML = "  " + desc;
            descView.style.marginTop = "8px";
            descView.appendChild(descspan);

            $(".modal-body").append(descView);
        }

        if (trainer != undefined) {
            var trainerspan = document.createElement("span");
            trainerspan.innerHTML = "课程教练：" + trainer;
            trainerView.style.marginTop = "8px";
            trainerView.appendChild(trainerspan);
            $(".modal-body").append(trainerView);
        }

        if (detail != undefined) {
            var detailsplit = detail.split("|");
            var detailspan = document.createElement("p");
            detailspan.innerHTML = detailsplit[0];

            var ul = document.createElement("ul");

            var i;
            for (i = 1; i<detailsplit.length; i++) {
                var li = document.createElement("li");
                li.innerHTML = detailsplit[i];
                ul.appendChild(li);
            }

            ul.style.marginLeft = "18px";
            ul.style.marginTop = "4px";
            
            detailView.appendChild(detailspan);
            detailView.appendChild(ul);
            detailView.style.marginTop = "8px";
            $(".modal-body").append(detailView);
        }
    });

    // When the user clicks on <span> (x), close the modal
    $('.modal-body').on('click', '.close', function(){
        modal.style.display = "none";
    });

});

function displayDates(year, date, day, month, clickedDate) {
    var titleView;
    var dateView;
    var titlepart1;
    var titlepart2;
    var hr;

    var i;
    for (i=0; i<7; i++) {
        $("#circle" + (i + 1)).text(" ");
    }

    var datesView = document.getElementsByClassName("date");
    var i;
    for (i=0; i<7; i++) {
        datesView[i].children[3].className = datesView[i].children[3].className.replace("indicator activeIndicator", "indicator");
        datesView[i].className = datesView[i].className.replace("selectedDate", "notcurrentdate");
    }

    $("#datetext").text(months[month-1] + " " + year);

    if (day == 0) {
        day = 6;
    }
    else {
        day = day - 1;
    }

    var j;
    for (j=day; j>=0;j--) {
        var newDate = date + j - day;
        var daysinprevmonth = getDaysInMonth(month-1,year);

        if (newDate < 1) {
            newDate += daysinprevmonth;
            monthsNum[j] = month - 1;
        }
        else {
            monthsNum[j] = month;
        }

        dates[j] = newDate;
    }

    for (j=day; j<7;j++) {
        var newDate = date + j - day;
        var daysinmonth = getDaysInMonth(month,year);

        if (newDate > daysinmonth) {
            newDate -= daysinmonth;
            monthsNum[j] = month + 1;
        }        
        else {
            monthsNum[j] = month;
        }

        dates[j] = newDate;
    }

    for (i=0; i<7; i++) {
        var week = weekdays[i];

        $("#week" + (i + 1)).text(week);
        $("#day" + (i + 1)).text(dates[i]);
    }

    loadJSON(function (response) {
        // Parse JSON string into object
        var agendaOjbects = JSON.parse(response);
        var i;
        for (i = 0; i<agendaOjbects.length; i++) {
            var desc = agendaOjbects[i].desc;
            var date = agendaOjbects[i].date;
            var title = agendaOjbects[i].title;
            var time = agendaOjbects[i].time;
            var dateSplit = date.split("/");
            var dateAgenda = dateSplit[1];
            var monthAgenda = dateSplit[0];
            var yearAgenda = dateSplit[2];

            var j;
            for (j=0; j<7; j++) {
                if (year == yearAgenda && monthsNum[j] == monthAgenda && dates[j] == dateAgenda) {
                    var circle = document.createElement("span");    // Create with DOM
                    circle.className = "activeCircle";
                    circle.style.marginLeft = "1px"
                    circle.style.marginRight = "1px"
                    $("#circle" + (j + 1)).append(circle);
                    agendas[j].push(agendaOjbects[i]);
                }
            }
        }

        console.log(agendas);
        console.log(clickedDate);

        //add items on the agenda view
        if (clickedDate == undefined) {
            $(".agenda").text("No events for this day");
        }
        else {
            $(".agenda").empty();

            if (clickedDate == -1) {
                clickedDate = 6;
            }

            if (agendas[clickedDate].length != 0) {
                var i;
                for (i = 0; i < agendas[clickedDate].length; i++) {
                    var dateConverted = new Date(agendas[clickedDate][i].date);
                    var agenda = agendas[clickedDate][i];
                    var title = agenda.title;
                    var date = agenda.date;
                    var brief = agenda.brief;
                    var opendates = agenda.opendates;
                    var desc = agenda.desc;
                    var trainer = agenda.trainer;
                    var detail = agenda.detail;

                    titleView = document.createElement("p");    // Create with DOM
                    briefView = document.createElement("p");    // Create with DOM
                    titlepart1 = document.createElement("span");    // Create with DOM
                    titlepart2 = document.createElement("span");    // Create with DOM
                    titlepart3 = document.createElement("button");
                    hr = document.createElement("hr");    // Create with DOM
                    titleView.className = "titleView";

                    titlepart1.className = "activeCircle2";
                    titlepart1.style.marginBottom = "2px";
                    titlepart2.style.marginLeft = "5px";
                    titlepart3.className = "agendabutton";
                    titleView.appendChild(titlepart1);
                    titleView.appendChild(titlepart2);
                    titleView.appendChild(titlepart3);
                    briefView.style.marginLeft = "11px";
                    hr.style.marginLeft = "-10px";
                    hr.style.marginRight = "-10px";
                    hr.style.marginTop = "8px";
                    hr.style.marginBottom = "12px";
                    titlepart2.innerHTML = agendas[clickedDate][i].title;
                    titlepart3.innerHTML = "details";
                    briefView.innerHTML = brief;

                    if (brief == undefined) {
                        $(".agenda").append(titleView, hr);
                    }
                    else {
                        $(".agenda").append(titleView, briefView, hr);
                    }
                }
            } 
            else {
                $(".agenda").text("No events for this day");
            }   
        }
    });

    var d = new Date();
    var currentdate = d.getDate(); //get the current date
    var currentday = d.getDay();  //get the current day of the week, sunday is 0
    var currentmonth = d.getMonth() + 1;  //get the current month, january is 1

    if (date == currentdate) {
        datesView[day].className = datesView[day].className.replace("notcurrentdate", "selectedDate");
    }

    if (clickedDate != undefined) {
        if (clickedDate == -1) {
            clickedDate = 6;
        }
        datesView[clickedDate].children[3].className = datesView[clickedDate].children[3].className.replace("indicator", "indicator activeIndicator");
    }
}

function getDaysInMonth(month,year) {
    return new Date(year, month, 0).getDate();
 }

function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'agenda.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}
