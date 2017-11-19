angular.module('DocboardCtrl', []).controller('DocboardControlller', function ($scope, Page, User, Doc) {
    $scope.getDocs = function (userID) {
        Doc.getByUserID(userID).then(function (docs) {
            for(var i = 0; i < docs.length; i++) {
                var docID = docs[i]._id;
                var docTitle = docs[i].title;
                var docDate = docs[i].date.getMonth() + 
                        "/" + docs[i].date.getDate() + 
                        "/" + docs[i].date.getFullYear();
                var docRating = docs[i].published ? docs[i].rating : "Not Published";
                
            }
        }, function (err) {
            console.log("Docboard: Doc Archive Get Error: " + err);
        });
    };

    $scope.getDocFeed = function (num, d) {
        Doc.getByRatingAndTime(num, d).then(function (docs) {
            for(var i = 0; i < docs.length; i++) {
                var docID = docs[i]._id;
                var docTitle = docs[i].title;
                var docAlias = docs[i].author.alias;
                var docDate = docs[i].date.getMonth() + 
                        "/" + docs[i].date.getDate() + 
                        "/" + docs[i].date.getFullYear();
                var docRating = docs[i].rating;
                
            }
        }, function (err) {
            console.log("Docboard: Doc Feed Get Error: " + err);
        });
    };
    
    $scope.goDocit = function(docID) {
        Doc.get(docID).then(function (doc) {
            Page.setDoc(doc);
            Page.changePage('docit');
        }, function (err) {
            console.log("Docboard: Go Docit Error: " + err);
        });
    }
    
    $scope.goDocview = function(docID) {
        Doc.get(docID).then(function (doc) {
            Page.setDoc(doc);
            Page.changePage('docview');
        }, function (err) {
            console.log("Docboard: Go Docview Error: " + err);
        });
    }
});