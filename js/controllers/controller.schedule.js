app.expandControllerSchedule = function ($scope, $http, $timeout, $filter, $window, $sce, $compile) {

    // schedule
    //$scope.createEvent = function ($event) {
    //    var o = $($event.target);
    //    if ($(o)[0].tagName == "DIV") return;
    //    var ev = $("<div draggable></div>");
    //    var el = $compile(ev)($scope);

    //    //where do you want to place the new element?
    //    angular.element(o).append(ev);
    //    $scope.insertHere = el;
    //}

    $scope.loadScheduleAll = function () {
        $('.drop-target').empty();
        $scope.loadSchedule();
        $scope.createSchGrid(40, 10);
    }

    // events
    $scope.loadSchedule = function () {
        $(".drag-item").draggable({
            snap: '.gridlines',
            handle: "div.div-d",
            containment: ".gridFrame"
        });
        $(".drop-target").droppable({
            accept: ".drag-item"
        });
    }

    $scope.createSchGrid = function (sizeY, sizeX) {
       
        var i,
        sel = $('.drop-target'),
            height = sel.height(),
            width = sel.width(),
            ratioW = Math.floor((width - 3) / sizeX),
            ratioH = Math.floor((height - 2) / sizeY);

        for (i = 0; i <= ratioW; i++) { // vertical grid lines
            $('<div />').css({
                'top': 0,
                'left': i * sizeX,
                'width': 1,
                'height': height,
                'background-color': (i % 4 == 0 ? '#ddd' : 'transparent')
            })
              .addClass('gridlines')
              .appendTo(sel);
        }

        for (i = 1; i <= ratioH; i++) { // horizontal grid lines
            $('<div />').css({
                'top': i * sizeY,
                'left': 0,
                'width': width,
                'height': 2,
                'background-color': (i == 0 ? 'transparent' : '#ccc')
            })
              .addClass('gridlines')
              .appendTo(sel);
        }

        $('.gridlines').show();

        // frame
        $('<div />').css({
            'top': 0, //sel.top,
            'left': 0, //sel.left+20,
            'width': sel.width() + 20,
            'height': sel.height() + 20,
            'position': 'absolute',
            //'border': '1px solid silver',
            'background-color': 'transparent'
        })
             .addClass('gridFrame')
             .appendTo(sel);

        // H-header
        var s = "";
        for (i = 0; i < DayHours.length ; i++) {
            if(i % 4 == 0) s += "<span class='h-lbl'>" + DayHours[i] + "</span>";
        }
        var vh = $('<div />').css({
            'top': -20, //sel.top,
            'left': 0, //sel.left+20,
            'position': 'absolute'
        })
        .html(s)
        .appendTo(sel);

        // V-header
        s = "";
        for (i = 0; i < WeekDays.length ; i++) {
           s += "<span class='v-lbl'>" + WeekDays[i] + "</span>";
        }
        var vh = $('<div />').css({
            'top': 0, //sel.top,
            'left': 526, //sel.left+20,
            'position': 'absolute'
        })
        .html(s)
        .appendTo(sel);
    }

    
    $scope.createCellEvent = function ($event) {
        var o = $($event.target);
        if ($(o).attr("class") != "gridFrame") return;
        var ev = $('#prEvent').children().first().clone();
        var lt = $scope.selectedCourse.LessonTime * 10;
        //$scope.schShift = lt - 40;

        $(ev).css("width", lt);
        var x = Math.floor(($event.pageX - $(".gridFrame").eq(0).offset().left) / 40) * 40;
        var y = Math.floor(($event.pageY - $(".gridFrame").eq(0).offset().top) / 40) * 40;
        var shift = $scope.selectedCourse.LessonTime == 6 ? 20 : 0;
        if (x > 480 || y > 200) return;

        x = x < shift ? 0 : x - shift;
        ev.css("left", x + "px");
        ev.css("top", y + "px");

        var el = $compile(ev)($scope); //compilation
        //angular.element(o).append(ev);
        $(ev).appendTo($('.drop-target'));
        $scope.insertHere = el;  //add to scope after compilation

        $scope.loadSchedule();
        // update events array
        GetAllEventsData();
    }

    // create event element from db
    $scope.createCellEventFromData = function (d) {
        //var o = $($event.target);
        //if ($(o).attr("class") != "gridFrame") return;
        var ev = $('#prEvent').children().first().clone();
        var lt = $scope.selectedCourse.LessonTime * 10;
        $scope.schShift = lt - 40;

        $(ev).css("width", lt);
        var x = 480 - d.Hour * 10; // - 40; //(DayHours.length - d.Hour + 1)*10; //Math.floor(($event.pageX - $(".gridFrame").eq(0).offset().left) / 40) * 40;
        var y = d.Day*40 - 40; // Math.floor(($event.pageY - $(".gridFrame").eq(0).offset().top) / 40) * 40;
        var shift = $scope.selectedCourse.LessonTime == 6 ? 20 : 0;
        if (x > 480 || y > 200) return;

        x = x < shift ? 0 : x - shift;
        ev.css("left", x + "px");
        ev.css("top", y + "px");

        var el = $compile(ev)($scope); //compilation
        //angular.element(o).append(ev);
        $(ev).appendTo($('.drop-target'));
        $scope.insertHere = el;  //add to scope after compilation

        $scope.loadSchedule();
        // update events array
        //GetAllEventsData();
    }

    $scope.remEvent = function ($event) {
        $($event.target).closest(".drag-item").remove();
        GetAllEventsData();
    }

    $scope.remAllEvents = function () {
        $.each($(".drag-item"), function (i, el) {
            if ($(el).parent().attr("id") != "prEvent") $(el).remove();
        });        
    }

    $scope.$watch("selectedCourse.LessonTime", function (nv, ov) {
        $scope.updateEventsData(ov);        
    });

    // update when LessonTime is changed
    $scope.updateEventsData = function (ov) {
        $.each($(".drag-item"), function (i, el) {
            if ($(el).parent().attr("id") != "prEvent") {
                var d = GetEventData(el);
                var shift = ($scope.selectedCourse.LessonTime - ov) * 10
                $(el).css("left", $(el).position().left - shift);
                $(el).css("width", $scope.selectedCourse.LessonTime * 10 + "px");
                $(el).find(".div-d").eq(0).attr("title", GetTooltip(d));
            }
        });
        $scope.safeApply();
    }
    // update when saved
    //$scope.updateSavedEventsData = function () {
    //    $.each($(".drag-item"), function (i, el) {
    //        if ($(el).parent().attr("id") != "prEvent") {
    //            var d = GetEventData(el);
    //            //var shift = ($scope.selectedCourse.LessonTime - ov) * 10
    //            //$(el).css("left", $(el).position().left - shift);
    //            //$(el).css("width", $scope.selectedCourse.LessonTime * 10 + "px");
    //            //$(el).find(".div-d").eq(0).attr("title", GetTooltip(d));
    //        }
    //    });
    //    $scope.safeApply();
    //}

    $scope.eventData = [];
    $scope.lessonTime = [45, 60, 90];
}

// utils for event objects
// drag
function GetEventParams(e) {
    var o = GetEventData($(e.target));
    $(e.target).find(".event-prm").eq(0).html('<b>' + o.Day + '</b> ' + o.Time);
};
// drop
function HideLabel() {
    GetAllEventsData();
    setTimeout(function () {
        $(".event-prm").empty();        
    }, 500);
};
// get event data
function GetEventData(el) {
    var y = $(el).position().top / 40;
    if (y > WeekDays.length - 1 || y < 0) y = 0;
    var day = WeekDays[y];
    
    var x = Math.round($(el).position().left / 10);
    var shift = scope.selectedCourse.LessonTime - 4;
    var hour = DayHours[DayHours.length - x - shift-2];
    return {
        Y: y+1,
        Day: day,
        X: DayHours.length - x - shift - 1,
        Time: hour,
        Size: scope.selectedCourse.LessonTime,
        Element: el
    }
    //scope.safeApply();
}

// update all availible events data
function GetAllEventsData() {
    scope.eventData = [];
    $.each($(".drag-item"), function (i, el) {
        if ($(el).parent().attr("id") != "prEvent") {
            var d = GetEventData(el);
            scope.eventData.push(d);
            $(el).find(".div-d").eq(0).attr("title", GetTooltip(d));
        }
    });
    scope.safeApply();
}




function GetTooltip(d) {
    return "יום " + d.Day + "', " + "משעה " + d.Time;
}

