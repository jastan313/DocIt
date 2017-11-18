angular.module('DocboardCtrl', []).controller('DocboardControlller', function($scope, Page, User, Doc) {
    $scope.getDocs = function(userID) {
        User.get(userID).then(function() {
            
        });
    };
    
    $scope.getDocFeed = function(num) {
        
    };
});