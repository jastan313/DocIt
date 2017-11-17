angular.module('MainCtrl', []).controller('MainController', function ($scope, $location, Page) {
    // Utility function to change pages
    $scope.changePage = function(page) {
        Page.setPage(page);
        $scope.pageTitle = Page.getTitle();
        $location.path(Page.getPage());
    }
    
    $scope.userID = null;
    $scope.changePage('login');
});