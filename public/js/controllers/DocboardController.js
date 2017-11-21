angular.module('DocboardCtrl', []).controller('DocboardControlller', function ($scope, Page, User, Doc) {
    $scope.docArchive = [];
    $scope.docFeed = [];

    $scope.getDocs = function () {
        var user = Page.getUser();
        if (user) {
            Doc.getByUserID(user._id).then(function (docs) {
                for (var i = 0; i < docs.length; i++) {
                    var docID = docs[i]._id;
                    var docTitle = docs[i].title;
                    var docDate = docs[i].date.getMonth() +
                            "/" + docs[i].date.getDate() +
                            "/" + docs[i].date.getFullYear();
                    var docRating = docs[i].published ? docs[i].rating : "Not Published";
                    $scope.docArchive.push(
                            {_id: docID,
                                title: docTitle,
                                date: docDate,
                                rating: docRating}
                    );
                }
            }, function (err) {
                console.log("Docboard: Doc Archive Get Error: " + err);
            });
        } else {
            Page.changePage("login");
        }
    };

    $scope.getDocFeed = function (num, d) {
        Doc.getByRatingAndTime(num, d).then(function (docs) {
            for (var i = 0; i < docs.length; i++) {
                var docID = docs[i]._id;
                var docTitle = docs[i].title;
                var docAlias = docs[i].author.alias;
                var docDate = docs[i].date.getMonth() +
                        "/" + docs[i].date.getDate() +
                        "/" + docs[i].date.getFullYear();
                var docRating = docs[i].rating;
                if(docRating === 0) {
                    docRating = "0 Rating";
                }
                else if(docRating > 0) {
                    docRating = "+" + docRating + " Rating";
                }
                else {
                    docRating = "-" + docRating + " Rating";
                }
                $scope.docFeed.push(
                        {_id: docID,
                            title: docTitle,
                            alias: docAlias,
                            date: docDate,
                            rating: docRating}
                );
            }
        }, function (err) {
            console.log("Docboard: Doc Feed Get Error: " + err);
        });
    };

    $scope.goDocit = function (docID) {
        Doc.get(docID).then(function (doc) {
            Page.setDoc(doc);
            Page.changePage('docit');
        }, function (err) {
            console.log("Docboard: Go Docit Error: " + err);
        });
    }

    $scope.goDocview = function (docID) {
        Doc.get(docID).then(function (doc) {
            Page.setDoc(doc);
            Page.changePage('docview');
        }, function (err) {
            console.log("Docboard: Go Docview Error: " + err);
        });
    }
});