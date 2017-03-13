// main controller
var app = angular.module('myApp', ['ngSanitize', 'moment-picker', 'ngFileUpload', 'ui.bootstrap', 'ngAnimate'])
        .controller('myController', function ($scope, $http, Upload, $timeout, $filter, $window, $sce, $compile) {

            app.expandControllerInit($scope, $http, $timeout, $filter, $window, $sce);
            //app.expandControllerPaging($scope, $http, $timeout, $filter, $window, $sce);
            app.expandControllerTicket($scope, $http, Upload, $timeout, $filter, $window, $sce);
            //app.expandControllerUser($scope, $http, $timeout, $filter, $window, $sce, $compile);
            app.expandControllerSchedule($scope, $http, $timeout, $filter, $window, $sce, $compile);
            app.expandControllerSorting($scope, $sce);

            $scope.selectedPage = 0;
            $scope.pages = [
                { Name: "ניהול פניות", Item: "פניות", Id: 0 },
                { Name: "פתיחת פניה חדשה", Item: "פתיחת פניה חדשה", Id: 1 },
                { Name: "חיפוש", Item: "חיפוש", Id: 2 },
                { Name: "ניהול משתמשים", Item: "ניהול משתמשים", Id: 3 },
                 { Name: "הפקת דוחות", Item: "דוחות", Id: 4 }
            ];            

            $scope.msg = {
                Text: "",
                IsError: true
            }
            $scope.msg1 = {
                Text: "",
                IsError: true
            }


            $scope.dicPages = {};
            $.each($scope.pages, function (i, o) {
                $scope.dicPages[o.Id] = $scope.pages[i];
            });

            $scope.setPage = function (n) {
                $scope.selectedPage = n;
            }

            $scope.$watch("selectedPage", function (nv, ov) {
                // tbd
            });

            $scope.search = {
                Key: '',
                Type: 0
            };            


            $scope.keyFilter = function(o) {
                var key = $scope.search.Key.trim();
                if (key == "") {
                    return ($scope.search.Type == 0 || o.CourseType == $scope.search.Type);
                }
                if (o.Id == undefined) return false;
                if ($scope.selectedPage == 0) { // courses - temp
                    return true;
                } else if ($scope.selectedPage == 1) { // customers - temp
                    return true;
                } else if ($scope.selectedPage == 2) { // instructors
                    return ((o.Name != null && o.Name.indexOf(key) > -1) ||
                            (o.Phone != null && o.Phone.indexOf(key) > -1) ||
                            (o.Id.toString().indexOf(key) > -1));
                } else if ($scope.selectedPage == 3) { // branches
                    return ((o.Name != null && o.Name.indexOf(key) > -1) ||
                            (o.Address != null && o.Address.indexOf(key) > -1) ||
                            (o.Contact != null && o.Contact.indexOf(key) > -1) ||
                            (o.Phone != null && o.Phone.indexOf(key) > -1) ||
                            (o.Id.toString().indexOf(key) > -1));
                }
            }

            $scope.getObject = function(tp, id) {
                return Enumerable.From($scope.data[tp])
                    .Where(function(e) { return e.Id == id })
                    .FirstOrDefault();               
            }

            $scope.getObjectProperty = function (tp, id, prop) {
                var o = $scope.getObject(tp, id);
                return o == null ? "" : o[prop];
            }

            $scope.safeApply = function (fn) {
                var phase = this.$root.$$phase;
                if (phase == '$apply' || phase == '$digest') {
                    if (fn && (typeof (fn) === 'function')) {
                        fn();
                    }
                } else {
                    this.$apply(fn);
                }
            };

            $scope.fitString = function (s, n) {
                if (typeof (s) == 'undefined' || s == null) {
                    return "";
                }
                s = s.replace("'", "").replace("\"", "");
                return s.length > n ? (s.substring(0, n - 3) + "...") : s;
            }
            $scope.formatDate = function (date) {
                var d = moment(date, 'DD-MM-YYYY').format('DD-MM-YYYY'); // new Date(date);
                //console.log(d);
                if (d == "Invalid date")
                    return "";
                else
                    return d;
            };


            // upload instructor/client picture
            $scope.fileInputClick = function ($event) {
                var el = $event.target;
                $(el).parent().find("input").click();
            };

            // pic upload
            $scope.imgUploadTp = '';
            $scope.imgUploadId = '';
            $scope.ifImgExists = false;
            $scope.setImgUploadParams = function (tp, id) {
                $scope.imgUploadTp = tp;
                $scope.imgUploadId = id;
                $scope.ifImgExists = false;
            }

            $scope.resetImgUploadParams = function () {
                $scope.imgUploadTp = '';
                $scope.imgUploadId = '';
                $scope.ifImgExists = false;
            }

            $scope.isImage = function (f) {
                var ext = f.match(/\.(.+)$/)[1];
                switch (ext) {
                    case 'jpg':
                    case 'jpeg':
                    case 'png':
                    case 'bmp':
                    case 'gif':
                        return true;
                    default:
                        return false;
                }
            }

            $scope.imgLoading = false;
            $scope.fileUpload = function (f) {

                if (!$scope.isImage(f.name)) {
                    $scope.fileExtErMessage = "יש להשתמש בקיבצי תמונות בלבד !";
                    $("#fileExtError").modal("show");
                    $scope.safeApply();
                    return;
                }

                $scope.imgLoading = true;
                $scope.safeApply();
                var myFormData = new FormData();
                myFormData.append('file', f);
                $.ajax({
                    url: 'imgUploader.ashx?id=' + $scope.imgUploadId + "&tp=" + $scope.imgUploadTp,
                    type: 'POST',
                    processData: false, // important
                    contentType: false, // important
                    dataType: 'json',
                    data: myFormData,
                    complete: function (d) {
                        if (d.responseText.indexOf("__error_") > -1) {
                            $scope.ifImgExists = false;
                            // unsupported format - tbd
                        } else {
                            $scope.ifImgExists = true;
                                $scope.selectedInstructor.Img = "images/instructors/" + $scope.selectedInstructor.Id + ".png?t=" + (new Date()).getTime();
                                // update existing 
                                $.each($scope.data.Instructors, function (i, e) {
                                    if (e.Id == $scope.imgUploadId) $scope.data.Instructors[i].Img = $scope.selectedInstructor.Img;
                                });
                        }
                        $scope.imgLoading = false;
                        $scope.safeApply();
                        //setTimeout(function () { $scope.safeApply(); }, 300);
                    }
                });
            }

        // 



    })
    .directive('compileTemplate', function ($compile, $parse) {
        return {
            link: function (scope, element, attr) {
                var parsed = $parse(attr.ngBindHtml);
                function getStringValue() { return (parsed(scope) || '').toString(); }

                //Recompile if the template changes
                scope.$watch(getStringValue, function () {
                    $compile(element, null, -9999)(scope);  //The -9999 makes it skip directives so that we do not recompile ourselves
                });
            }
        }
    })
.directive('draggable', function ($document) {
    return function (scope, element, attr) {
        var startX = 0, startY = 0, x = 0, y = 0;
        var x = 0, y = 0;
        //element.attr("startX", parseInt(element.attr("startX")));
        //element.attr("startY", parseInt(element.attr("startY")));
        //element.attr("x", parseInt(element.attr("x")));
        //element.attr("y", parseInt(element.attr("y")));
        element.css({
            position: 'relative',
            border: '1px solid red',
            backgroundColor: 'lightyellow',
            padding:'10px',
            cursor: 'pointer',
            display: 'block',
            //width: '40px',
            height:'40px'
        });
        element.on('mousedown', function (event) {
            // Prevent default dragging of selected content
            event.preventDefault();
            startX = event.screenX - x;
            startY = event.screenY - y;
            //element.attr("startX", event.screenX - x);
            //element.attr("startY", event.screenY - y);
            $document.on('mousemove', mousemove);
            $document.on('mouseup', mouseup);
            //
           
        });
        function mousemove(event) {
            y = event.screenY - startY;
            x = event.screenX - startX;
            //y = event.screenY - parseInt(element.attr("startY"));
            //x = event.screenX - parseInt(element.attr("startX"));
            element.css({
                top: y + 'px',
                left: x + 'px'
            });
        }
        function mouseup(event) {
            //y = event.screenY - startY;
            //x = event.screenX - startX;
            //element.css({
            //    top: y + 'px',
            //    left: x + 'px'
            //});
            $document.off('mousemove', mousemove);
            $document.off('mouseup', mouseup);
        }
    };
});