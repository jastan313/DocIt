angular.module('MainCtrl', []).controller('MainController', function ($scope, $location, Page) {
    $scope.infoModalText = "";
    
    // Utility function to change pages
    $scope.changePage = function (page) {
        if (Page.setPage(page)) {
            $scope.pageTitle = Page.getTitle();
            $location.path(Page.getPage());
        }
    }

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

        /* if (target.hasAttribute('data-toggle') && target.getAttribute('data-toggle') == 'modal') {
            document.getElementById("info-modal").classList.add('open');
        } */

        // Close modal window when the backdrop is clicked
        if (target.classList.contains('modal')) {
            $scope.infoModalText = "";
            document.getElementById("info-modal").classList.remove('open');
        }
    }
    
    $scope.displayInfoPopup = function(info) {
        $scope.infoModalText = "|INFO| " + info;
        document.getElementById("info-modal").classList.add('open');
    }

    $scope.changePage('login');
});