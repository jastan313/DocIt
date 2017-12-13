angular.module('MainCtrl', []).controller('MainController', function ($scope, $cookies, $location, Page) {

    $scope.objToString = function (obj, level) {
        for (var key in obj) {
            if (typeof obj[key] === "object") {
                console.log("\t".repeat(level) + key);
                $scope.objToString(obj[key], level + 1);
            } else {
                console.log("\t".repeat(level) + key + " --> " + obj[key]);
            }
        }
    };

    $scope.init = function () {
        $scope.mainCtrl = {};
        $scope.mainCtrl.toFocus = null;
        $scope.mainCtrl.isProcessing = false;
        $scope.mainCtrl.directoryShow = false;
        $scope.mainCtrl.infoModalHeader = "";
        $scope.mainCtrl.infoModalBody = "";
        $scope.mainCtrl.infoModalInput = "";
        $scope.mainCtrl.modelInputShow = false;
        $scope.mainCtrl.pageTitle = "";

        // parameters for docfeed loading
        $scope.mainCtrl.docFeedNumItems = 24; // number of items to load
        $scope.mainCtrl.docFeedTimeLimit = 30; // within the past n days

        document.addEventListener('click', function (e) {
            var target = e.target;
            if (!target.classList.contains('directory-btn')) {
                if ($scope.mainCtrl.directoryShow) {
                    $scope.toggleDirectory();
                    $scope.$apply();
                }
            }
        });

        //$cookies.remove('docitPage');
        //$cookies.remove('docitUser');
        //$cookies.remove('docitDoc');

        // Check if there was a session, navigate accordingly
        var userCookie = $cookies.getObject('docitUser');
        var docCookie = $cookies.getObject('docitDoc');
        var pageCookie = $cookies.get('docitPage');

        if (userCookie) {
            Page.setUser(userCookie);
        }
        if (docCookie) {
            Page.setDoc(docCookie);
        }
        if (userCookie && pageCookie) {
            $scope.changePage(pageCookie);
        } else {
            if (pageCookie === 'signup') {
                $scope.changePage('signup');
            } 
            else {
                $scope.changePage('login');
            }
        }
    };

    // Utility function to change pages
    $scope.changePage = function (page) {
        if (Page.setPage(page)) {

            // Update session info
            $cookies.put('docitPage', Page.getPage());
            var userCookie = $cookies.getObject('docitUser');
            var docCookie = $cookies.getObject('docitDoc');
            if (page === 'login' || page === 'signup') {
                if (userCookie) {
                    $cookies.remove('docitUser');
                }
                if (docCookie) {
                    $cookies.remove('docitDoc');
                }
            } else if (page === 'docboard') {
                if (!Page.getUser()) {
                    $scope.changePage('login');
                }
                $cookies.putObject('docitUser', Page.getUser());
                if (docCookie) {
                    $cookies.remove('docitDoc');
                }
            } else {
                $cookies.putObject('docitUser', Page.getUser());
                $cookies.putObject('docitDoc', Page.getDoc());
            }

            $scope.mainCtrl.pageTitle = Page.getTitle();
            $location.path(Page.getPage());
            $scope.mainCtrl.toFocus = null;
            $scope.mainCtrl.isProcessing = false;
        }
    };

    // Displays the INFO popup with a given info string
    $scope.displayInfoPopup = function (header, body) {
        $scope.mainCtrl.infoModalHeader = "|INFO| " + header + ":";
        $scope.mainCtrl.infoModalBody = body;
        document.getElementById("info-modal").classList.add('open');
    };

    // Event handler for info modal popup
    $scope.checkInfoPopup = function ($event) {
        var target = $event.currentTarget || $event.srcElement;
        // Close modal window when the backdrop is clicked
        if (target.id === ('info-modal') && target == $event.target) {
            $scope.infoModalHeader = "";
            $scope.infoModalBody = "";
            document.getElementById("info-modal").classList.remove('open');
            $scope.mainCtrl.isProcessing = false;
            $scope.mainCtrl.infoModalInputShow = false;
            $scope.mainCtrl.infoModalInput = "";
        }
    };

    // Focuses on tag if there is an tag id set
    $scope.focusTag = function () {
        if ($scope.mainCtrl.toFocus) {
            document.getElementById($scope.mainCtrl.toFocus).focus();
            $scope.mainCtrl.toFocus = null;
        }
    };


    // Toggles directory options shown or not
    $scope.toggleDirectory = function () {
        $scope.mainCtrl.directoryShow = !$scope.mainCtrl.directoryShow;
    }
});