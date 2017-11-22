angular.module('DocviewCtrl', []).controller('DocviewControlller', function ($scope, Page, User, Doc) {
    $scope.showAuthorBtns = false;
    $scope.docRating = false;

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
                $scope.showAuthorBtns = (doc.author._id === user._id);

                // Check if user has rated this Doc
                for (var i = 0; i < doc.ratings.length; i++) {
                    if (doc.ratings[i].user_id === user._id) {
                        docRating = doc.ratings[i].rating;
                        break;
                    }
                }
                // Add styling to rating buttons if user has rated
                updateDocRating();
            }
        } else {
            $scope.changePage("docboard");
        }
    }

    $scope.updateDocRating = function () {
        if (docRating == null || docRating === 0) {
            // Don't add any button styling since user has not rated Doc yet
        } else if (docRating > 0) {
            var rateUpBtn = angular.element(document.querySelector('#docview-rateup-btn'));
            rateUpBtn.addClass('ratedup');
        } else if (docRating < 0) {
            var rateDownBtn = angular.element(document.querySelector('#docview-rateup-btn'));
            rateUpBtn.addClass('rateddown');
        }
    }

    $scope.rateUpDoc = function () {

    }

    $scope.rateDownDoc = function () {

    }

    $scope.copyDoc = function () {

    }
});