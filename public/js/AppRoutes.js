angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider
                // home page
                .when('/', {
                    templateUrl: '/views/index.html',
                    controller: 'MainController'
                })

                // signup page that will use the SignupController
                .when('/signup', {
                    templateUrl: 'views/signup.html',
                    controller: 'SignupController'
                })

                // login page that will use the LoginController
                .when('/login', {
                    templateUrl: 'views/login.html',
                    controller: 'LoginController'
                })

                // docboard page that will use the DocboardController
                .when('/docboard', {
                    templateUrl: 'views/docboard.html',
                    controller: 'DocboardController'
                })

                // docit page that will use the DocController
                .when('/docit', {
                    templateUrl: 'views/docit.html',
                    controller: 'DocitController'
                })

                // docview page that will use the DocController
                .when('/docview', {
                    templateUrl: 'views/docview.html',
                    controller: 'DocviewController'
                })

                // docview page that will use the DocController
                .when('/docnotes', {
                    templateUrl: 'views/docnotes.html',
                    controller: 'DocnotesController'
                })

                .otherwise({redirect: '/'});
        $locationProvider.html5Mode(true);
    }]);