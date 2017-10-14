angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider
                // home page
                .when('/', {
                    templateUrl: 'views/home.html',
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

                // doc page that will use the DocController
                .when('/doc', {
                    templateUrl: 'views/doc.html',
                    controller: 'DocController'
                });
        $locationProvider.html5Mode(true);
    }]);