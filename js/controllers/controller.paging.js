app.expandControllerPaging = function ($scope, $http, $timeout, $filter, $window, $sce) {

    $scope.isPagerShown = function () {
        if ($scope.data == undefined) return false;
        if ($scope.filtered == undefined) {
            return ($scope.selectedPage == 0 && $scope.data.Events.length > 0)
                || ($scope.selectedPage == 1 && $scope.data.Workers.length > 0)
                || ($scope.selectedPage == 2 && $scope.data.Patients.length > 0)
        } else {
            return $scope.filtered.length > 0;
        }
        
    }


    $scope.gridPager = {
        Skip: 0,
        Size: 20
    }

    $scope.lastPage = function () {
        if (typeof ($scope.data) == "undefined") return;
        var am = $scope.totalRecs();

        var last = $scope.gridPager.Size * Math.floor(am / $scope.gridPager.Size);
        $scope.gridPager.Skip = last == am
                ? last - $scope.gridPager.Size : last;
    }

    $scope.totalRecs = function () {
        if ($scope.data == undefined) return 0;
        if ($scope.filtered == undefined) {
            if ($scope.selectedPage == 0)
                return $filter('filter')($scope.data.Events, $scope.keyFilter).length;
            else if ($scope.selectedPage == 1)
                return $filter('filter')($scope.data.Workers, $scope.keyFilter).length;
            else if ($scope.selectedPage == 2)
                return $filter('filter')($scope.data.Patients, $scope.keyFilter).length;
        } else {
            return $scope.filtered.length;
        }
    }

    $scope.isPagingAtTheEnd = function () {
        var am = $scope.totalRecs();
        return $scope.toRecord < am;
    }

    $scope.nextPage = function () {
        $scope.gridPager.Skip += $scope.gridPager.Size;
    }

    $scope.prevPage = function () {
        $scope.gridPager.Skip -= $scope.gridPager.Size;
    }

    $scope.firstPage = function () {
        $scope.gridPager.Skip = 0;
    }

    $scope.lastPage = function () {
        if (typeof ($scope.data) == "undefined") return;
        var am = $scope.totalRecs();
        var last = $scope.gridPager.Size * Math.floor(am / $scope.gridPager.Size);
        $scope.gridPager.Skip = last == am ? last - $scope.gridPager.Size : last;
    }

    $scope.getToRecord = function () {
        var am = $scope.totalRecs();
        var n = $scope.gridPager.Skip + $scope.gridPager.Size;
        $scope.toRecord = am < n ? am : n;
        return $scope.toRecord;
    }


}