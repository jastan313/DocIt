angular.module('DocitCtrl', []).controller('DocitControlller', function ($scope, Page, User, Doc) {
    $scope.showAuthorBtns = false;
    $scope.copyText = "";

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

            // Add Copy and Save buttons if user has not published Doc yet
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
        }
        finally {
            $scope.copyText = "";
        }
    }

    $scope.saveDoc = function () {

    }

    $scope.publishDoc = function () {

    }

    $scope.exportDoc = function () {

    }

    $scope.deleteDoc = function () {

    }

    $scope.keyDownFunc = function ($event) {
        if ($scope.ctrlDown && ($event.keyCode == $scope.cKey)) {
            // alert('Ctrl + C pressed');
        } else if ($scope.ctrlDown && ($event.keyCode == $scope.vKey)) {
            // alert('Ctrl + V pressed');
        } else if ($scope.ctrlDown && String.fromCharCode($event.which).toLowerCase() == 's') {
            $event.preventDefault();
            $scope.saveDoc();
            // alert('Ctrl + S pressed');
        }
    };

});