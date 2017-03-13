app.expandControllerSorting = function ($scope, $sce) {

    $scope.sort = {
        Name: "Id",
        Desc: false
    }

    $scope.sortLink = function (c) {       
        var s = "<span class=\"glyphicon glyphicon-triangle-bottom red\" data-ng-if=\"((sort.Name==c || sort.Name=='First' + c) && sort.Desc)\"" +
                "style=\"display: inline-block; margin-left: 3px\"></span>" +
                "<span class=\"glyphicon glyphicon-triangle-top green\" data-ng-if=\"((sort.Name==c || sort.Name=='First' + c) && !sort.Desc)\"" + 
                "style=\"display: inline-block; margin-left: 3px\"></span>" +
                "<a href='#' data-ng-click=\"setSort('" + c + "')\">" + $scope.colHebDic[$scope.selectedPage][c] + "</a>";
        return $sce.trustAsHtml(s);
    }

    $scope.setSort = function (c) {
        if ($scope.sort.Name != c) {
            $scope.sort.Name = c;
            $scope.sort.Desc = false;
        } else {
            if ($scope.sort.Desc) {
                $scope.sort = {
                    Name: "Id",
                    Desc: false
                }
            }
            else if (!$scope.sort.Desc) {
                $scope.sort.Desc = true;
            }
        }
    }

    $scope.isNotSpecial = function (c) {
        return c.indexOf("_") == -1;
    }

    $scope.colHebDic = [
    { // tickettodo
        "Id": "מס",
        "NameReq": "שם הפונה",
        "Category": "קטגוריה",
        "Location": "מיקום",
        "CreateDate":"תאריך פתיחה",
        "Status": "סטטוס פניה",
      
        
    },
        { // myticket
            "Id": "מס",
            "Category": "קטגוריה",
            "Location": "מיקום",
            "CreateDate": "תאריך פתיחה",
            "Status": "סטטוס פניה",


        }
  
    ];
}


