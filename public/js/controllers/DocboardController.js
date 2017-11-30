angular.module('DocboardCtrl', []).controller('DocboardController', function ($scope, Page, User, Doc) {
    $scope.alias = Page.getUser() ? Page.getUser().alias : "";

    $scope.generateDocs = function (num, published) {
        var arr = [];
        for (var i = 0; i < num; i++) {
            var obj = {};
            obj.title = "Title " + i;
            obj.alias = "Alias " + i;
            obj.date = i + "/" + i + "/" + i
            obj.published = published;
            obj.rating = Math.random() * 100 < 50 ? -Math.floor(Math.random() * 10) : Math.floor(Math.random() * 10);
            arr.push(obj);
        }
        return arr;
    }

    //$scope.docArchive = $scope.generateDocs(10, false);
    //$scope.docFeed = $scope.generateDocs(10, true);

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
                                rating: docRating
                            }
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
                if (docRating === 0) {
                    docRating = "0 Rating";
                } else if (docRating > 0) {
                    docRating = "+" + docRating + " Rating";
                } else {
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

    $scope.goDoc = function (docID) {
        if (docID == null) {
            Page.setDoc(null);
            $scope.changePage('docit');
        }
        Doc.get(docID).then(function (doc) {
            Page.setDoc(doc);
            if (doc.published) {
                $scope.changePage('docit');
            } else {
                $scope.changePage('docview');
            }
        }, function (err) {
            console.log("Docboard: Go Doc Error: " + err);
        });
    }

    $scope.help = function () {
        displayInfoPopup("Hi, " + user.alias + "! Welcome to |DOCIT|, a document-based web \
        application where writers are encouraged to brainstorm, write, and publish any type \
        of creative, text-based work anonymously. You may create new Docs, edit drafts until \n\
        you are satisfied, and publish their finalized form for public viewing and rating.\n\n\
        |DOCBOARD|: Here is your main hub where you will find two sections, the Doc Archive \
        and the Doc Feed.\nThe Doc Archive is a list of all your saved Docs as well as the option \
        to start a new Doc draft. Creating a new Doc or selecting an existing Doc that has yet to \
        be published will direct you to |DOCIT|. Selecting a published Doc will direct you to \
        |DOCVIEW|. \nThe Doc Feed will show you recently published Docs by you and fellow writers, \
        sorted by highest rating. Selecting any Doc in the Doc Feed will direct you to |DOCVIEW|.\n\n\
        |DOCIT|: Using Docit, you will have the option to view, edit, save, export, and publish your \
        Docs.\n\n|DOCVIEW|: Using Docview, you will be able to view and rate published-only Docs.");
    }

    $scope.init = function () {
        $scope.getDocs();
        $scope.getDocFeed(10, 7);
    }
});