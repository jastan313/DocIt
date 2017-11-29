angular.module('MainCtrl', []).controller('MainController', function ($scope, $location, $window, Page) {
    $scope.mainObj = {};
    $scope.mainObj.toFocus = null;
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

    // Utility bindings to track Ctrl + (Keyboard key) pressed.
    $scope.ctrlDown = false;
    $scope.ctrlKey = 17, $scope.vKey = 86, $scope.cKey = 67;
    angular.element($window).bind("keyup", function ($event) {
        if ($event.keyCode == $scope.ctrlKey)
            $scope.ctrlDown = false;
        $scope.$apply();
    });
    angular.element($window).bind("keydown", function ($event) {
        if ($event.keyCode == $scope.ctrlKey)
            $scope.ctrlDown = true;
        $scope.$apply();
    });

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
        }
    }

    // Utility function to change pages
    $scope.changePage = function (page) {
        if (Page.setPage(page)) {
            $scope.pageTitle = Page.getTitle();
            $location.path(Page.getPage());
        }
    }

    // Displays the INFO popup with a given info string
    $scope.displayInfoPopup = function (header, body) {
        $scope.infoModalHeader = "|INFO| " + header + ":";
        $scope.infoModalBody = body;
        document.getElementById("info-modal").classList.add('open');
    }

    $scope.changePage('signup');
});