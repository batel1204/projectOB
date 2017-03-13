app.expandControllerTicket = function ($scope, $http, $timeout, $filter, $window, $sce, $compile) {


    $scope.initTicket = function () {
        $('#editTicket')
            .on('shown.bs.modal',
                function () {
                    $("#Id").focus();
                });
    }

 
    $scope.newTicket = function (tpN) {

        $scope.selectedTicket = {
            idTicket: 0,
            Category: 0,
            Location: 0,
            Priority: "", 
            Description: "",
            Status: "",
            Image: 0,
           
        }
        //$scope.loadInstructorsC();
        ////$scope.loadCourseTypeC();
        //$scope.loadBranchC();
        //$("#editCourse")
        //    .modal("show")
        //    .on('shown.bs.modal',
        //        function () {
        //            $scope.loadScheduleAll();
        //            $scope.safeApply();
        //        })
        //    .on('hidden.bs.modal',
        //        function () {
        //            $scope.remAllEvents();
        //            $scope.safeApply();
        //        });
        //$scope.setPage(0);
    }

    //$scope.editTicket = function (w) {
    //    w["WeekDays"] = []; //temp
    //    $scope.selectedTicket = angular.copy(w);
    //    $scope.loadInstructorsC(w.Instructor);
    //    //$scope.loadCourseTypeC(w.CourseType);
    //    $scope.loadBranchC(w.Branch);
    //    $("#editTicket")
    //        .modal("show")
    //        .on('shown.bs.modal',
    //            function () {
    //                $scope.loadScheduleAll();
    //                $scope.loadCourseLessons();
    //                $scope.safeApply();
    //            })
    //        .on('hidden.bs.modal',
    //            function () {
    //                $scope.remAllEvents();
    //                $scope.safeApply();
    //            });
    //}

    //$scope.loadCourseLessons = function () {
    //    var ls = Enumerable.From($scope.data.Lessons)
    //        .Where(function (l) {
    //            return l.Course == $scope.selectedCourse.Id &&
    //                l.Instructor == $scope.selectedCourse.Instructor &&
    //                l.Branch == $scope.selectedCourse.Branch
    //        })
    //        .ToArray();
    //    $.each(ls,
    //        function (i, o) {
    //            $scope.createCellEventFromData(o);
    //        })
    //}

    //$scope.saveCourse = function () {
    //    var p = angular.copy($scope.selectedCourse);
    //    var isNew = p.Id == 0;
    //    GetAllEventsData();
    //    p["Lessons"] = Enumerable.From($scope.eventData)
    //        .Select(function (e) { return { 'Day': e.Y, 'Time': e.X - 1 }; })
    //        .ToArray();
    //    var test = $scope.isValidCourse(p, isNew);
    //    if (test == "") {
    //        $http.post("Tasks.aspx?tp=saveCourse", p, null)
    //            .then(
    //                function (d) {
    //                    if (d.data != "error") {
    //                        if (isNew) {
    //                            $scope.data.Courses.push(angular.copy(d.data));
    //                            $scope.msg.Text = "סניף חדש נשמר בהצלחה";
    //                        } else {
    //                            var i = $scope.data.Courses.map(function (x) { return x.Id; })
    //                                .indexOf($scope.selectedCourse.Id);
    //                            $scope.data.Courses[i] = angular.copy(d.data); //$scope.selectedCourse);
    //                            //GetAllEventsData();
    //                            //$scope.updateSavedEventsData();

    //                            // update lessons
    //                            $scope.data.Lessons = Enumerable.From($scope.data.Lessons)
    //                                .Where(function (l) {
    //                                    return l.Course != $scope.selectedCourse.Id ||
    //                                        l.Instructor != $scope.selectedCourse.Instructor ||
    //                                        l.Branch != $scope.selectedCourse.Branch
    //                                })
    //                                .ToArray();
    //                            $.each($scope.eventData,
    //                                function (i, o) {
    //                                    var shift = $scope.selectedCourse.LessonTime == 3
    //                                        ? 1
    //                                        : ($scope.selectedCourse.LessonTime == 5 ? -2 : 0);
    //                                    var lesson = {
    //                                        Course: $scope.selectedCourse.Id,
    //                                        Instructor: $scope.selectedCourse.Instructor,
    //                                        Branch: $scope.selectedCourse.Branch,
    //                                        Day: o.Y,
    //                                        Hour: o.X - 1 - shift
    //                                    }
    //                                    $scope.data.Lessons.push(lesson);
    //                                })


    //                            $scope.msg.Text = "עידכון בוצע בהצלחה";
    //                        }
    //                        $scope.safeApply();
    //                        $("#editCourse").modal("hide");
    //                        $scope.msg.IsError = false;
    //                        $timeout(function () { $scope.msg.Text = ""; }, 3000);
    //                    } else {
    //                        console.log(d);
    //                        $scope.msg1.Text = "בעיית שמירה";
    //                        $scope.msg1.IsError = true;
    //                        $timeout(function () { $scope.msg1.Text = ""; }, 3000);
    //                    }
    //                },
    //                function (er) {
    //                    console.log(er);
    //                    $scope.msg1.Text = "בעיית שמירה";
    //                    $scope.msg1.IsError = true;
    //                    $timeout(function () { $scope.msg1.Text = ""; }, 3000);
    //                });
    //    } else { // validation error     
    //        $scope.msg1.Text = test;
    //        $scope.msg1.IsError = true;
    //        $timeout(function () { $scope.msg1.Text = ""; }, 3000);
    //    }
    //}

    //$scope.isValidCourse = function (e, isNew) {
    //    // err messages 
    //    if (isNaN($scope.selectedCourse.Instructor))
    //        return "שם המדריך הינו שדה חובה";
    //    else if (isNaN($scope.selectedCourse.CourseType))
    //        return "סוג הקורס הינו שדה חובה";
    //    else if ($scope.selectedCourse.Branch == "")
    //        return "סניף הינו שדה חובה";
    //    else if ($scope.selectedCourse.CourseType != 1 && $scope.selectedCourse.StartDate == "")
    //        return "מתאריך הינו שדה חובה";
    //    else if ($scope.selectedCourse.CourseType != 1 && $scope.selectedCourse.EndDate == "")
    //        return "עד תאריך הינו שדה חובה";
    //    else
    //        return "";
    //}

    $scope.getTicketId = function (w) {
        return w.idTicket;
    }

    $scope.getTicketCategory = function (w) {
        return w.Category;
    }
    // selects
    //$scope.loadInstructorsC = function (id) {
    //    $(".sel2-instructorsC").empty();
    //    $(".sel2-instructorsC")
    //        .select2({
    //            placeholder: "בחר מדריך",
    //            minimumResultsForSearch: Infinity,
    //            data: Enumerable.From($scope.data.Instructors)
    //                .Select(function (e) { return { id: e.Id, text: (e.FName + ' ' + e.LName) } })
    //                .ToArray()
    //        })
    //        .on("change",
    //            function (a) {
    //                $scope.selectedCourse.Instructor = $(this).val() == "" ? null : parseInt($(this).val());
    //                $scope.safeApply();
    //            });
    //    var v = arguments.length > 0 ? id : "";
    //    $('.sel2-instructorsC').val(v).trigger('change');
    //}

    //$scope.loadCourseTypeC = function (id) {
    //    $(".sel2-courseTypeC").empty();
    //    $(".sel2-courseTypeC")
    //        .select2({
    //            placeholder: "בחר סוג",
    //            minimumResultsForSearch: Infinity,
    //            data: Enumerable.From($scope.data.CourseTypes)
    //                .Select(function (e) { return { id: e.Id, text: (e.Name) } })
    //                .ToArray()
    //        })
    //        .on("change",
    //            function (a) {
    //                $scope.selectedCourse.CourseType = $(this).val() == "" ? null : parseInt($(this).val());
    //                $scope.safeApply();
    //            });
    //    var v = arguments.length > 0 ? id : "";
    //    $('.sel2-courseTypeC').val(v).trigger('change');
    //}

    //$scope.loadBranchC = function (id) {
    //    $(".sel2-branchC").empty();
    //    $(".sel2-branchC")
    //        .select2({
    //            placeholder: "בחר סניף",
    //            minimumResultsForSearch: Infinity,
    //            data: Enumerable.From($scope.data.Branches)
    //                .Select(function (e) { return { id: e.Id, text: (e.Name) } })
    //                .ToArray()
    //        })
    //        .on("change",
    //            function (a) {
    //                $scope.selectedCourse.Branch = $(this).val() == "" ? null : parseInt($(this).val());
    //                $scope.safeApply();
    //            });
    //    var v = arguments.length > 0 ? id : "";
    //    $('.sel2-branchC').val(v).trigger('change');
    //}


    //// times
    //$scope.mytime = {
    //    From: new Date(0, 0, 0, 12, 45),
    //    To: new Date(0, 0, 0, 13, 30)
    //}

    //$scope.displayTime = ['12:45', '13:30'];
    //$scope.secTime = 45; // temp in minutes

    //$scope.changeInternal = false;
    //$scope.$watch('mytime.From',
    //    function (newValue, oldValue) {
            //if (newValue === oldValue) return;
            //var hour = $scope.mytime.From.getHours(),
            //    hour = hour < 10 ? '0' + hour : hour,
            //    minutes = ($scope.mytime.From.getMinutes() < 10 ? '0' : '') + $scope.mytime.From.getMinutes();
            //$scope.displayTime[0] = hour + ':' + minutes;

            //$scope.mytime.To = moment($scope.mytime.From).add($scope.secTime,'m').toDate();;          
    //    });
    //$scope.$watch('mytime.To',
    //    function (newValue, oldValue) {
            //if (newValue === oldValue) return;
            //var hour = $scope.mytime.To.getHours(),
            //    hour = hour < 10 ? '0' + hour : hour,
            //    minutes = ($scope.mytime.To.getMinutes() < 10 ? '0' : '') + $scope.mytime.To.getMinutes();
            //$scope.displayTime[1] = hour + ':' + minutes;

            //$scope.mytime.From = moment($scope.mytime.To).add(-$scope.secTime, 'm').toDate();
        //});

    $scope.hstep = 1;
    $scope.mstep = 15;


    //$scope.getEventParams = function (o) {
    //    // var o = $($event.target);
    //    console.log(o);
    //    //if ($event==undefined) return;
    //    //var x = Math.floor(($event.pageX - $(".gridFrame").eq(0).offset().left) / 40);
    //    //var y = Math.floor(($event.pageY - $(".gridFrame").eq(0).offset().top) / 40);
    //    //return x + ' ' + y;
    //    return "123";
    //}
};
