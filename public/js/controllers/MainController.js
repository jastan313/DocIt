angular.module('MainCtrl', []).controller('MainController', function ($scope, PageService) {
    $scope.title = PageService.getTitle();
});