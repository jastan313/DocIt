angular.module('MainCtrl', []).controller('MainController', function ($scope, $location, Page, Cookie) {

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

        Cookie.clear();

        // Check if there was a session, navigate accordingly
        var userCookie = Cookie.getUser();
        var docCookie = Cookie.getDoc();
        var pageCookie = Cookie.getPage();

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
            Cookie.setDoc(Page.getPage());
            var userCookie = Cookie.getUser();
            var docCookie = Cookie.getDoc();
            if (page === 'login' || page === 'signup') {
                Cookie.removeUser();
                Cookie.removeDoc();
            } else if (page === 'docboard') {
                if (!Page.getUser()) {
                    $scope.changePage('login');
                }
                Cookie.setUser(Page.getUser());
                Cookie.removeDoc();
            } else {
                Cookie.setUser(Page.getUser());
                Cookie.setDoc(Page.getDoc(), 15);
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