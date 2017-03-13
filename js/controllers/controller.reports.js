app.expandControllerReports = function ($scope, $http, Upload, $timeout, $filter, $window, $sce) {

    $scope.repFilter = {
        Patient: "",
        Ptp: 3,
        Building: 0,
        From: moment().startOf('year').format('DD-MM-YYYY'),
        To: moment().format('DD-MM-YYYY')
    }


    $scope.reportDialog = function (id) {
        switch (id) {
            case 1:
                $('#repPatientCard').modal('show');
                break;
            case 2:
                $('#repPatientsFlow').modal('show');
                break;
            default:
                $('#tempForReport').modal('show');
                break;
        }
    }

    $scope.repPeriods = ["חודש", "3 חודשים", "מתחילת השנה", "תקופה אחרת"];
    $scope.setReportPtp = function (n) {
        $scope.repFilter.Ptp = n + 1;
    }

    $scope.repFilterBac = angular.copy($scope.repFilter);

    $scope.getRepPatientImg = function () {
        if ($scope.repFilter.Patient == "" || isNaN($scope.repFilter.Patient))
            return $scope.noImg;
        else
            return $scope.dicPatient[$scope.repFilter.Patient].Img;
    }

    $scope.loadRepSelects = function () {
        $scope.repFilter = angular.copy($scope.repFilterBac);
        $(".sel2-rep-period").select2({
            placeholder: "בחר תקופה",
            minimumResultsForSearch: Infinity
        })
        .on("change", function (a) {
            $scope.repFilter.Ptp = parseInt($(this).val());
            $scope.safeApply();
        });

        $scope.loadRepPatients();

        $(".sel2-rep-buildings").select2({
            minimumResultsForSearch: Infinity,
            //placeholder: "בחר בית אבות",
            //allowClear: true,
            //templateResult: $scope.formatPatient,
            data: $scope.getBuildingList()               
        })
       .on("change", function (a) {
           $scope.repFilter.Building = parseInt($(this).val());
           $scope.safeApply();
       });
        $(".sel2-rep-buildings").val($scope.userBuild).trigger("change");
        if ($scope.userBuild != 0) $('.sel2-rep-buildings').select2("enable", false);
    }

    $scope.loadRepPatients = function () {
        $(".sel2-rep-patients").html("");
        $(".sel2-rep-patients").select2({
            placeholder: "בחר דייר",
            allowClear: true,
            templateResult: $scope.formatPatient,
            data: Enumerable.From($scope.data.Patients)
                .Where(function (e) { return ($scope.selectedBuilding.Id == 0 || e.Building == $scope.selectedBuilding.Id) })
                .Select(function (p) { return { id: p.Id, text: p.Name } })
                .ToArray()
        })
       .on("change", function (a) {
           $scope.repFilter.Patient = parseInt($(this).val());
           $scope.safeApply();
       });
    }

    $scope.getBuildingList = function(){
        var ar = Enumerable.From($scope.data.Buildings)
                    .Select(function (p) { return { id: p.Id, text: p.Name } })
                    .ToArray();
        ar.push({ id: 0, text: "כל בתי אבות" });
        return ar;
    }

    $scope.repMsg = {
        Text: ""
    }
    $scope.createReport = function (n) {
        
        if (n == 1 && ($scope.repFilter.Patient == "" || isNaN($scope.repFilter.Patient))) {
            $scope.repMsg.Text = "נא לבחור דייר כדי להפיק את הדוח";
            $timeout(function () { $scope.repMsg.Text = ""; }, 3000);
            return;
        }

        // date range
        var to = 0;
        var from = 100;
        if ($scope.repFilter.Ptp == 1)
            from = 30;
        else if ($scope.repFilter.Ptp == 2)
            from = 92;
        else if ($scope.repFilter.Ptp == 3) {
            var d1 = moment().startOf('year');
            var d2 = moment();
            from = d2.diff(d1, 'days');
        }
        else if ($scope.repFilter.Ptp == 4) {
            var d3 = moment();
            var d4 = moment($scope.repFilter.From, "DD-MM-YYYY");
            var d5 = moment($scope.repFilter.To, "DD-MM-YYYY");
            from = d3.diff(d4, 'days');
            to = d3.diff(d5, 'days');
        }
        //
        var dialogs = ["repPatientCard", "repPatientsFlow"];
        $('#' + dialogs[n - 1]).modal('hide');
        var pid = n == 1 ? $scope.repFilter.Patient : $scope.repFilter.Building;
        var url = "Report.aspx?tp=" + n + "&pid=" + pid + "&from=" + from + "&to=" + to;
        window.open(url, '_blank');

    }

}