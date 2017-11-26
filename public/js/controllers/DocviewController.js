angular.module('DocviewCtrl', []).controller('DocviewControlller', function ($scope, Page, User, Doc) {
    $scope.showAuthorBtns = false;
    $scope.docRating = 0;
    $scope.copyText = "";

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
                $scope.showAuthorBtns = (doc.author === user._id);

                // Check if user has rated this Doc
                for (var i = 0; i < doc.ratings.length; i++) {
                    if (doc.ratings[i].user_id === user._id) {
                        $scope.docRating = doc.ratings[i].rating;
                        break;
                    }
                }
                // Add styling to rating buttons if user has rated
                $scope.updateDocRatingButtons();
            }
        } else {
            $scope.changePage("docboard");
        }
    }

    $scope.updateDocRatingButtons = function () {
        if (docRating == null || docRating === 0) {
            // Don't add any button styling since user has not rated Doc yet
        } else if (docRating > 0) {
            var rateUpBtn = angular.element('#docview-rateup-btn');
            rateUpBtn.addClass('ratedup');
        } else if (docRating < 0) {
            var rateDownBtn = angular.element('#docview-rateup-btn');
            rateUpBtn.addClass('rateddown');
        }
    }

    $scope.rateUpDoc = function () {
        var newRatings = Page.getDoc().ratings;
        if ($scope.docRating === -1) {
            var userID = Page.getUser()._id;
            for (var i = 0; i < newRatings.length; i++) {
                if (newRatings[i].user_id === userID) {
                    newRatings[i].rating = 1;
                    break;
                }
            }
        } else {
            newRatings.push({'user_id': Page.getUser()._id, 'rating': 1});
        }
        var docData = {'ratings': newRatings};
        Doc.update(Page.getDoc()._id, docData).then(function (doc) {
            Page.setDoc(doc);
            $scope.docRating = 1;
            $scope.displayInfoPopup("Doc Rated Up!");
            $scope.updateDocRatingButtons();
        }, function (err) {
            console.log("Docview: Rate Up Error: " + err);
        });

    }

    $scope.rateDownDoc = function () {
        var newRatings = Page.getDoc().ratings;
        if ($scope.docRating === 1) {
            var userID = Page.getUser()._id;
            for (var i = 0; i < newRatings.length; i++) {
                if (newRatings[i].user_id === userID) {
                    newRatings[i].rating = -1;
                    break;
                }
            }
        } else {
            newRatings.push({'user_id': Page.getUser()._id, 'rating': -1});
        }
        var docData = {'ratings': newRatings};
        Doc.update(Page.getDoc()._id, docData).then(function (doc) {
            Page.setDoc(doc);
            $scope.docRating = -1;
            $scope.displayInfoPopup("Doc Rated Down!");
            $scope.updateDocRatingButtons();
        }, function (err) {
            console.log("Docview: Rate Down Error: " + err);
        });

    }

    $scope.copyDoc = function () {
        $scope.copyText = $scope.docTitle + "\nby " + $scope.docAlias + ", " + $scope.docDate +
                "\n\n" + $scope.docBody;
        var toCopy = document.getElementById("docview-copytext");
        try {
            document.execCommand('copy');
            $scope.displayInfoPopup("Doc Contents Copied!");
        } catch (err) {
            alert("Docview: Copy Doc Error: " + err);
        } finally {
            $scope.copyText = "";
        }
    }

    $scope.deleteDoc = function () {
        if (Page.getDoc().author === Page.getUser()._id) {
            Doc.delete(Page.getDoc()._id).then(function (doc) {
                User.updateByDoc(Page.getUser()._id, Page.getDoc()._id);
                $scope.displayInfoPopup("Doc Deleted:\n\n" + Page.getDoc().title + "\nby: " +
                        Page.getDoc().alias + ", " + Page.getDoc().date);
                document.getElementById("info-modal").classList.add('open');
            }, function (err) {
                console.log("Docit: Doc Deletion Error: " + err);
            });
        }
    }
});