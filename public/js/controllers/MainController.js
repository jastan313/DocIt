angular.module('MainCtrl', []).controller('MainController', function ($scope, $location, Page) {
    // Utility function to change pages
    $scope.changePage = function (page) {
        if (Page.setPage(page)) {
            $scope.pageTitle = Page.getTitle();
            $location.path(Page.getPage());
        }
    }

    // Utility binding to track Ctrl + (Keyboard key) pressed.
    $scope.ctrlDown = false;
    $scope.ctrlKey = 17, $scope.vKey = 86, $scope.cKey = 67;
    angular.element($window).bind("keyup", function ($event) {
        if ($event.keyCode == $scope.ctrlKey)
            $scope.ctrlDown = false;
        $scope.$apply();
    });

    angular.element($window).bind("keydown", function ($event) {
        if ($event.keyCode == $scope.ctrlKey)
            $scope.ctrlDown = true;
        $scope.$apply();
    });

    $scope.changePage('login');
});