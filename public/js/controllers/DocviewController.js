angular.module('DocviewCtrl', []).controller('DocviewControlller', function ($scope, Page, User, Doc) {
    $scope.displayDocview = function () {
        // Get the Doc we are looking at
        var doc = Page.getDoc();
        if (doc && doc.published) {
            // Data bind corresponding Doc data
            $scope.docAlias = doc.user.alias;
            $scope.docDate = doc.date.getMonth() +
                    "/" + doc.date.getDate() +
                    "/" + doc.date.getFullYear();
            $scope.docTitle = doc.title;
            $scope.docBody = doc.body;
            var user = Page.getUser();
            if (user) {
                // Add Edit button if user is the author of this Doc
                if (doc.author._id === user._id) {
                    Page.addElement("docview-directory",
                            "<div id=\"docview-directory-edit-btn\" class=\"directory-opt\" title=\"Edit Doc.\">|EDIT|</div>");
                }
                var rating = null;
                for(var i = 0; i < doc.ratings.length; i++) {
                    if(doc.ratings[i].user_id === user._id) {
                        rating = doc.ratings[i].rating;
                        break;
                    }
                }
                
                // Add styling to rating buttons
                if(rating == null || rating === 0) {
                    // Don't add any button styling since user has not rated Doc yet
                }
                else if(rating > 0) {
                    var rateUpBtn = angular.element(document.querySelector('#docview-rateup-btn'));
                    rateUpBtn.addClass('ratedup');
                }
                else if(rating < 0) {
                    var rateDownBtn = angular.element(document.querySelector('#docview-rateup-btn'));
                    rateUpBtn.addClass('rateddown');
                }
            }
        } else {
            $scope.changePage("docboard");
        }
    }
    
    $scope.rateUpDoc = function() {
        
    }
    
    $scope.rateDownDoc = function() {
        
    }
});