angular.module('DocitCtrl', []).controller('DocitControlller', function ($scope, Page, User, Doc) {
    $scope.showAuthorBtns = false;
    $scope.copyText = "";
    $scope.MIN_BODY_LENGTH = 50;

    $scope.displayDocit = function () {
        // Get the Doc we are looking at
        var doc = Page.getDoc();
        if (doc) {
            // Data bind corresponding Doc data
            $scope.docAlias = doc.user.alias;
            $scope.docDate = doc.date.getMonth() +
                    "/" + doc.date.getDate() +
                    "/" + doc.date.getFullYear();
            $scope.docTitle = doc.title;
            $scope.docBody = doc.body;

            // Show Copy and Save buttons if user has not published Doc yet
            $scope.showAuthorBtns = !doc.published;
        } else {
            $scope.changePage("docboard");
        }
    }

    $scope.copyDoc = function () {
        $scope.copyText = $scope.docTitle + "\nby " + $scope.docAlias + ", " + $scope.docDate +
                "\n\n" + $scope.docBody;
        var toCopy = document.getElementById("docit-copytext");
        try {
            document.execCommand('copy');
        } catch (err) {
            alert("Docit: Copy Doc Error: " + err);
        } finally {
            $scope.copyText = "";
        }
    }

    $scope.saveDoc = function () {
        var d = Page.getDoc();
        $scope.docTitle = $scope.docTitle.length > 0 ? $scope.docTitle : "Untitled";
        // If user is updating an existing Doc
        if (d) {
            var docData = {
                'title': $scope.docTitle,
                'body': $scope.docBody
            };
            Doc.update(d._id, docData).then(function (doc) {
                Page.setDoc(doc);
                $scope.displayInfoPopup("Doc Updated:\n\n" + Page.getDoc().title + "\nby: " +
                        Page.getDoc().alias + ", " + Page.getDoc().date);
            }, function (err) {
                console.log("Docit: Doc Update Error: " + err);
            });
        }
        // If user is creating a new Doc
        else {
            var docData = {
                'title': $scope.docTitle,
                'author': Page.getUser().alias,
                'body': $scope.docBody
            };
            Doc.create(docData).then(function (doc) {
                Page.setDoc(doc);
                $scope.displayInfoPopup("Doc Created:\n\n" + Page.getDoc().title + "\nby: " +
                        Page.getDoc().alias + ", " + Page.getDoc().date);
            }, function (err) {
                console.log("Docit: Doc Creation Error: " + err);
            });
        }
    }

    $scope.publishDoc = function () {
        if ($scope.docBody.length < $scope.MIN_BODY_LENGTH) {
            $scope.infoModalText = "Doc's body requires a minimum of " + $scope.MIN_BODY_LENGTH + 
                    "characters. Keep writing! You need at least " + $scope.docBody.length + "more characters.";
            document.getElementById("info-modal").classList.add('open');
        } else {
            var d = Page.getDoc();
            // If user is updating an existing Doc
            if (d) {
                var docData = {
                    'title': $scope.docTitle,
                    'body': $scope.docBody,
                    'published': true
                };
                Doc.update(d._id, docData).then(function (doc) {
                    Page.setDoc(doc);
                    $scope.displayInfoPopup("Doc Updated And Published:\n\n" +
                            Page.getDoc().title + "\nby: " +
                            Page.getDoc().alias + ", " + Page.getDoc().date);
                    $scope.changePage('docview');
                }, function (err) {
                    console.log("Docit: Doc Publish Update Error: " + err);
                });
            }
            // If user is creating a new Doc
            else {
                var docData = {
                    'title': $scope.docTitle,
                    'author': Page.getUser().alias,
                    'body': $scope.docBody,
                    'published': true
                };
                Doc.create(docData).then(function (doc) {
                    Page.setDoc(doc);
                    $scope.displayInfoPopup("Doc Created And Published:\n\n" +
                            Page.getDoc().title + "\nby: " +
                            Page.getDoc().alias + ", " + Page.getDoc().date);
                    $scope.changePage('docview');
                }, function (err) {
                    console.log("Docit: Doc Publish Creation Error: " + err);
                });
            }
        }
    }

    $scope.exportDoc = function () {

    }

    $scope.deleteDoc = function () {
        Doc.delete(Page.getDoc()._id).then(function (doc) {
            User.updateByDoc(Page.getUser()._id, Page.getDoc()._id);
            $scope.infoModalText = "Doc Deleted:\n\n" + Page.getDoc().title + "\nby: " +
                    Page.getDoc().alias + ", " + Page.getDoc().date;
            $scope.changePage('docboard');
            document.getElementById("info-modal").classList.add('open');
        }, function (err) {
            console.log("Docit: Doc Deletion Error: " + err);
        });
    }

    /* Key binding events for aggregate keydown events */
    $scope.keyDownFunc = function ($event) {
        if ($scope.ctrlDown && ($event.keyCode == $scope.cKey)) {
            // 'Ctrl + C pressed'
        } else if ($scope.ctrlDown && ($event.keyCode == $scope.vKey)) {
            // 'Ctrl + V pressed'
        } else if ($scope.ctrlDown && String.fromCharCode($event.which).toLowerCase() == 's') {
            // 'Ctrl + S pressed'
            $event.preventDefault();
            $scope.saveDoc();
        }
    };

});