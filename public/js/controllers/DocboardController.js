angular.module('DocboardCtrl', []).controller('DocboardControlller', function ($scope, Page, User, Doc) {
    $scope.generateDocs = function(num, published) {
        var arr = [];
        for(var i = 0; i < num; i++) {
            var obj = {};
            obj.title = "Title #" + num;
            obj.alias = "Alias Name " + num;
            obj.date.getMonth = function() { return  "M: " + num; }
            obj.date.getDate = function() { return  "D: " + num; }
            obj.date.getFullYear = function() { return  "Y: " + num; }
            obj.published = published;
            obj.rating = Math.random()*100 < 50 ? -Math.floor(Math.random()*10) : Math.floor(Math.random()*10);
            arr.push(obj);
        }
        return arr;
    }
    
    $scope.docArchive = generateDocs(10, false);
    $scope.docFeed = generateDocs(10, true);

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

    $scope.goDocit = function (docID, editing) {
        Doc.get(docID).then(function (doc) {
            Page.setDoc(doc, editing);
            $scope.changePage('docit');
        }, function (err) {
            console.log("Docboard: Go Docit Error: " + err);
        });
    }

    $scope.goDocview = function (docID) {
        Doc.get(docID).then(function (doc) {
            Page.setDoc(doc, false);
            $scope.changePage('docview');
        }, function (err) {
            console.log("Docboard: Go Docview Error: " + err);
        });
    }
});