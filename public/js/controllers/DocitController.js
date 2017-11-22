angular.module('DocitCtrl', []).controller('DocitControlller', function($scope, Page, User, Doc) {
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
            if(!doc.published) {
                Page.insertBefore("docit-directory-copy-btn",
                    "<div id=\"docit-directory-save-btn\" class=\"directory-opt\" title=\"Save Doc's current progress.\">|SAVE|</div>");
                Page.insertBefore("docit-directory-save-btn",
                    "<div id=\"docit-directory-publish-btn\" class=\"directory-opt\" title=\"Finalize and publish Doc to public Doc Feed.\">|PUBLISH|</div>");
            }
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