app.expandControllerUser = function ($scope, $http, $timeout, $filter, $window, $sce, $compile) {


    $scope.newUser = function (tpN) {

        $scope.selectedUser = {
            uid: "",
            [Display-Name]: "",
            [E-mail-Address]: "",
            [Telephone-Number]: "",
            Department: "",
            [User-Password]: "",
            [Login-Status]: 0,
            Role: "",
            admin: 0

        }

    }
    $scope.getUserName = function (w) {
        return w.Display-Name;
    }

    //$scope.getTicketCategory = function (w) {
    //    return w.Category;
    //}
}