angular.module('MainCtrl', []).controller('MainController', function ($scope, $location, Page) {
    $scope.mainObj = {};
    $scope.mainObj.toFocus = null;
    $scope.mainObj.isProccessing = false;
    $scope.mainObj.directoryShow = false;
    $scope.objToString = function (obj, level) {
        for (var key in obj) {
            if (typeof obj[key] === "object") {
                console.log("\t".repeat(level) + key);
                $scope.objToString(obj[key], level + 1);
            } else {
                console.log("\t".repeat(level) + key + " --> " + obj[key]);
            }
        }
    }

    $scope.infoModalHeader = "";
    $scope.infoModalBody = "";
    $scope.pageTitle = "";

    $scope.init = function () {
        document.addEventListener('click', function (e) {
            var target = e.target;
            if (!target.classList.contains('directory-btn')) {
                if ($scope.mainObj.directoryShow) {
                    $scope.toggleDirectory();
                    $scope.$apply();
                }
            }
        });
        $scope.changePage('login');
    }

    // Utility function to change pages
    $scope.changePage = function (page) {
        if (Page.setPage(page)) {
            $scope.pageTitle = Page.getTitle();
            $location.path(Page.getPage());
            $scope.mainObj.toFocus = null;
            $scope.mainObj.isProcessing = false;
        }
    }

    // Displays the INFO popup with a given info string
    $scope.displayInfoPopup = function (header, body) {
        $scope.infoModalHeader = "|INFO| " + header + ":";
        $scope.infoModalBody = body;
        document.getElementById("info-modal").classList.add('open');
    }

    // Event handler for info modal popup
    $scope.checkInfoPopup = function ($event) {
        var target = $event.currentTarget || $event.srcElement;

        // Close modal window when the backdrop is clicked
        if (target.classList.contains('modal')) {
            $scope.infoModalHeader = "";
            $scope.infoModalBody = "";
            document.getElementById("info-modal").classList.remove('open');
            if ($scope.mainObj.toFocus) {
                document.getElementById($scope.mainObj.toFocus).focus();
                $scope.mainObj.toFocus = null;

            }
            $scope.mainObj.isProcessing = false;
        }
    }

    // Toggles directory options shown or not
    $scope.toggleDirectory = function () {
        $scope.mainObj.directoryShow = !$scope.mainObj.directoryShow;
    }
});