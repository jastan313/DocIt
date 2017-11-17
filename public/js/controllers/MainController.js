angular.module('MainCtrl', []).controller('MainController', function ($scope, Page) {
    $scope.title = Page.getTitle();
});