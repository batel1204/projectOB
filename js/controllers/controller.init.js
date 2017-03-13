app.expandControllerInit = function ($scope, $http, $timeout, $filter, $window, $sce) {
    var testMode = false;
    //$scope.data = {};
   
    $scope.currentUser = {
        Id: 0,
        Type: null,
        Password: null,
        Permission: null,
        Department: "",
        FullName: "",
        EMail: ""
    };
        
	angular.element(document).ready(function () {
		// temp data
	    if (testMode) {
	        $scope.data = angular.copy(tempData);
	        $scope.prepareData();
	        console.log($scope.data);
	    } else {
	        $http.get("Tasks.aspx?tp=getInitData", null).then(
                    function (d) {
                        if (d.data != "error") {
                            $scope.data = angular.copy(d.data);
                            $scope.prepareData();
                            console.log($scope.data);
                            $scope.tempUser = Enumerable.From($scope.data.User).Where(function (j) { return j.uid == $scope.UserId }).FirstOrDefault();
                            $scope.currentUser.Id = $scope.tempUser.uid;
                            $scope.currentUser.Permission = $scope.tempUser.Role;
                            $scope.currentUser.Department = $scope.tempUser.Department;
                            $scope.currentUser.FullName = $scope.tempUser.DisplayName;
                            $scope.currentUser.EMail = $scope.tempUser.EmailAddress;
                        } else {
                            console.log(d.data);
                        }
                    },
                    function (er) {
                        console.log(er);
                    });
	    }
	     //modal windows events
	    $("#editTicket").on('shown.bs.modal', function () {
	        setTimeout(function () {
	            //$('input:visible:first').focus();
	            $scope.loadScheduleAll();
	        }, 100);
	    })
	});

	$scope.getItem = function (tp, id) {
	    if ($scope.data == undefined) return null;
	    var t = Enumerable.From($scope.data[tp])
            .Where(function (i) { return i.Id == id }).FirstOrDefault();
	    return t.DisplayName;
	}

	$scope.prepareData = function () {
	    WeekDays = Enumerable.From($scope.data.Days).Select("$.Day").ToArray();
	    DayHours = Enumerable.From($scope.data.Hours).Select("$.Time").ToArray();
        //$.each()
	}

};