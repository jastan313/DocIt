angular.module('DocboardCtrl', []).controller('DocboardController', function ($scope, Page, User, Doc) {
    // Initialize Doc Archive and Doc Feed by GET requests
    $scope.init = function () {
        $scope.alias = Page.getUser() ? Page.getUser().alias : "";
        $scope.docArchive = [];
        $scope.docFeed = [];

        $scope.getDocArchive();
        $scope.getDocFeed(10, 7);
    }

    // Displays overview help information
    $scope.help = function () {
        $scope.displayInfoPopup("Help",
                "Hi, " + Page.getUser().alias + "! Welcome to |DOCIT|, a document-based web \
        application where writers are encouraged to brainstorm, write, and publish any type \
        of creative, text-based work anonymously. You may create new Docs, edit drafts until \n\
        you are satisfied, and publish their finalized form for public viewing and rating.\n\n\
        |DOCBOARD|: Here is your main hub where you will find two sections, the Doc Archive \
        and the Doc Feed.\n\nThe Doc Archive is a list of all your saved Docs as well as the option \
        to start a new Doc draft. Creating a new Doc or selecting an existing Doc that has yet to \
        be published will direct you to |DOCIT|. Selecting a published Doc will direct you to \
        |DOCVIEW|.\n\nThe Doc Feed will show you recently published Docs by you and fellow writers, \
        sorted by highest rating. Selecting any Doc in the Doc Feed will direct you to |DOCVIEW|.\n\n\
        |DOCIT|: Using Docit, you will have the option to view, edit, save, export, and publish your \
        Docs.\n\n|DOCVIEW|: Using Docview, you will be able to view and rate published-only Docs.");
    }

    // Populate Doc Archive with user's Docs
    $scope.getDocArchive = function () {
        var user = Page.getUser();
        if (user) {
            Doc.getByUserID(user._id).then(function (response) {
                var docs = response.data;
                for (var i = 0; i < docs.length; i++) {
                    var doc = docs[i];
                    var docRating = "Not Published";
                    if (doc.published) {
                        if (doc.rating === 0) {
                            docRating = "0 Rating";
                        } else if (doc.rating > 0) {
                            docRating = "+" + doc.rating + " Rating";
                        } else {
                            docRating = doc.rating + " Rating";
                        }
                    }
                    $scope.docArchive.push(
                            {_id: doc._id,
                                title: Doc.formatTitle(doc.title),
                                date: Doc.formatDate(doc.date),
                                rating: docRating
                            }
                    );
                }
            });
        } else {
            Page.changePage("login");
        }
    };

    // Populate Doc Feed with published Docs 
    // (limited to num Docs within the past d days)
    $scope.getDocFeed = function (num, d) {
        Doc.getByRatingAndTime(num, d).then(function (response) {
            var docs = response.data;
            for (var i = 0; i < docs.length; i++) {
                var doc = docs[i];
                var docRating = docs[i].rating;
                if (docRating === 0) {
                    docRating = "0 Rating";
                } else if (docRating > 0) {
                    docRating = "+" + docRating + " Rating";
                } else {
                    docRating = docRating + " Rating";
                }
                $scope.docFeed.push(
                        {_id: doc._id,
                            title: Doc.formatTitle(doc.title),
                            alias: doc.author.alias,
                            date: Doc.formatDate(doc.date),
                            rating: docRating
                        }
                );
            }
        });
    };

    // Go view the Doc in either Docit or Docview depending on published flag
    $scope.goDoc = function (docID) {
        if (docID == null) {
            Page.setDoc(null);
            $scope.changePage('docit');
        } else {
            Doc.get(docID).then(function (response) {
                Page.setDoc(response.data);
                if (response.data.published) {
                    $scope.changePage('docview');
                } else {
                    $scope.changePage('docit');
                }
            });
        }
    }
});