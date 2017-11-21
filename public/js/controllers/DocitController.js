angular.module('DocitCtrl', []).controller('DocitControlller', function($scope, Page, User, Doc) {
    $scope.displayDocit = function() {
        var doc = Page.getDoc();
        if(doc) {
            $scope.docAlias = doc.user.alias;
            $scope.docDate =  doc.date.getMonth() + 
                        "/" + doc.date.getDate() + 
                        "/" + doc.date.getFullYear();
            $scope.docTitle = doc.title;
            $scope.docBody = doc.body;
            if(!doc.published) {
                Page.addElement("docit-directory",
                    "<div id=\"docit-directory-save-btn\" class=\"directory-opt\" title=\"Save Doc's current progress.\">|SAVE|</div>");
                Page.addElement("docit-directory",
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