angular.module('DocviewCtrl', []).controller('DocviewControlller', function ($scope, Page, User, Doc) {
    $scope.displayDocview = function () {
        var doc = Page.getDoc();
        if (doc && doc.published) {
            $scope.docAlias = doc.user.alias;
            $scope.docDate = doc.date.getMonth() +
                    "/" + doc.date.getDate() +
                    "/" + doc.date.getFullYear();
            $scope.docTitle = doc.title;
            $scope.docBody = doc.body;
            var user = Page.getUser();
            if (user) {
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
                if(rating == null || rating === 0) {
                    Page.addElement("docview-directory-rating-container",
                        "<div id=\"docview-rateup-btn\" title=\"Upvote Doc.\">+1</div><div id=\"docview-ratedown-btn\" title=\"Downvote Doc.\">-1</div>");
                }
                else if(rating > 0) {
                    Page.addElement("docview-directory-rating-container",
                        "<div id=\"docview-rateup-btn\" class=\"ratedup\" title=\"Upvote Doc.\">+1</div><div id=\"docview-ratedown-btn\" title=\"Downvote Doc.\">-1</div>");
                }
                else if(rating < 0) {
                    Page.addElement("docview-directory-rating-container",
                        "<div id=\"docview-rateup-btn\" title=\"Upvote Doc.\">+1</div><div id=\"docview-ratedown-btn\" class=\"rateddown\" title=\"Downvote Doc.\">-1</div>");
                }
            }
        } else {
            $scope.changePage("docboard");
        }
    }
});