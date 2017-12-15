angular.module('DocnotesCtrl', []).controller('DocnotesController', function ($scope, Page, Doc, Note) {
    // Controller initialize, display Doc header and Docnotes feed
    $scope.init = function () {
        $scope.mainCtrl.directoryShow = false;
        $scope.MIN_BODY_LENGTH = 10;
        $scope.docnotesFeed = [];

        $scope.displayDocnotes();
    }

    // Display Doc header with Doc data
    $scope.displayDocnotes = function () {
        var doc = Page.getDoc();

        // If Doc is set and published, display Doc's data
        if (doc && doc.published) {
            // Data bind corresponding to the Doc's data
            $scope.docTitle = doc.title;
            $scope.docAlias = doc.author.alias;
            $scope.docDate = Doc.formatDate(doc.date);
            $scope.docRating = doc.rating;
            var ratingElement = document.getElementById("docnotes-rating");
            ratingElement.className = "doc-rating";
            if (doc.rating > 0) {
                $scope.docRating = "+" + doc.rating;
                ratingElement.classList.add("positive");
            } else if (doc.rating < 0) {
                ratingElement.classList.add("negative");
            }
            $scope.noteAlias = Page.getUser().alias;
            var tempDate = new Date();
            $scope.noteDate = Doc.formatDate(tempDate);
            document.getElementById("docnotes-createnote").innerText = "";

            // Get Docnotes feed
            $scope.getDocnotesFeed();
        }

        // If Doc not set, navigate back to Docboard
        else {
            $scope.changePage('docboard');
        }
    }

    // Populate Docnotes Feed with Doc's notes
    $scope.getDocnotesFeed = function () {
        var doc = Page.getDoc();

        // If Doc is set, get Doc's notes
        if (doc && doc.published) {
            Note.get(doc._id).then(function (response) {
                $scope.docnotesFeed = [];
                var notes = response.data;

                // For each note, add formatted note to Docnotes Feed
                for (var i = 0; i < notes.length; i++) {
                    var note = notes[i];
                    $scope.docnotesFeed.push({
                        alias: note.author.alias,
                        date: Doc.formatDate(doc.date),
                        body: note.body
                    });
                }
            });
        }
    }

    // Submit a new note
    $scope.submitNote = function () {
        // If note submit is not processing
        if (!$scope.mainCtrl.isProcessing) {
            $scope.mainCtrl.isProcessing = true;
            var noteBody = document.getElementById("docnotes-createnote").innerText;

            // If note's body data is less than the minimum
            // required length, display requirement info
            if (noteBody.length < $scope.MIN_BODY_LENGTH) {
                var requiredCharacters = $scope.MIN_BODY_LENGTH - noteBody.length;
                $scope.displayInfoPopup("Note Minimum Character Length",
                        "Note's body requires a minimum of " + $scope.MIN_BODY_LENGTH +
                        " characters. Keep writing! You need at least " +
                        requiredCharacters + " more " +
                        (requiredCharacters > 1 ? "characters." : "character."));
            }

            // If note's body data meets the minimum required length, submit the note
            else {
                Doc.get(Page.getDoc()._id).then(function (response) {
                    if (response.data) {
                        Page.setDoc(response.data);
                        var noteData = {
                            author: Page.getUser()._id,
                            doc: Page.getDoc()._id,
                            body: noteBody
                        };
                        Note.create(noteData).then(function (response) {
                            // If note create successful, set the new Doc,
                            // refresh Docnotes view, and display create info
                            if (response.data) {
                                $scope.displayDocnotes();
                                $scope.displayInfoPopup("Note Submitted",
                                        "Doc: " + Doc.createHeading(Doc.formatTitle(Page.getDoc().title),
                                                Page.getUser().alias, Doc.formatDate(Page.getDoc().date))
                                        + "\n\nNote: " + noteBody);
                                document.getElementById("docnotes-createnote").innerText = "";
                            }
                        });
                    } else {
                        // If Doc was already deleted, display info,
                        // and navigate to docboard
                        $scope.displayInfoPopup("Doc Missing",
                                "Oops, it looks the Doc you tried to write a note for does not exist anymore.");
                        $scope.changePage('docboard');
                    }
                });

            }
        }
    }
});