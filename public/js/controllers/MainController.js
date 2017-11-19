angular.module('MainCtrl', []).controller('MainController', function ($scope, $location, Page) {
    // Utility function to change pages
    $scope.changePage = function (page) {
        if (Page.setPage(page)) {
            if (page === 'login' || page === 'signup') {
                Page.setUser(null);
                Page.setDoc(null);
            }
            $scope.pageTitle = Page.getTitle();
            $location.path(Page.getPage());
        }
    }

    $scope.changePage('login');
});