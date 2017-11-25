angular.module('EmailService', []).factory('Email', ['$http', function ($http) {
        return {
            // Call to send email
            create: function (emailData) {
                return $http.post('/email', emailData);
            }
        }
    }]);