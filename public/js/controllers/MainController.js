angular.module('MainCtrl', []).controller('MainController', function ($scope) {
    $scope.changePage = function(page) {
        $location.path('/' + page);
    };
});