angular.module('MainCtrl', []).controller('MainController', function ($scope, $location, Page) {
    // Utility function to change pages
    $scope.changePage = function (page) {
        if (Page.setPage(page)) {
            $scope.pageTitle = Page.getTitle();
            $location.path(Page.getPage());
        }
    }

    $scope.changePage('login');
});