angular.module('DocitCtrl', []).controller('DocitControlller', function($scope, Page, User, Doc) {
    $scope.showAuthorBtns = false;
    
    $scope.displayDocit = function() {
        // Get the Doc we are looking at
        var doc = Page.getDoc();
        if(doc) {
            // Data bind corresponding Doc data
            $scope.docAlias = doc.user.alias;
            $scope.docDate =  doc.date.getMonth() + 
                        "/" + doc.date.getDate() + 
                        "/" + doc.date.getFullYear();
            $scope.docTitle = doc.title;
            $scope.docBody = doc.body;
            
            // Add Copy and Save buttons if user has not published Doc yet
            $scope.showAuthorBtns = !doc.published;
        }
        else {
            $scope.changePage("docboard");
        }
    }
    
    $scope.saveDoc = function() {
        
    }
    
    $scope.publishDoc = function() {
        
    }
    
    $scope.deleteDoc = function() {
        
    }
});