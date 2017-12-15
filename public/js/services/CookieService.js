angular.module('CookieService', []).factory('Cookie', ['$cookies', function ($cookies) {
        var cookieObj = {};

        // Get Docit's User from session
        cookieObj.getUser = function () {
            return $cookies.getObject('docitUser');
        };

        // Get Docit's Doc from session
        cookieObj.getDoc = function () {
            return $cookies.getObject('docitDoc');
        };

        // Get Docit's Page from session
        cookieObj.getPage = function () {
            return $cookies.get('docitPage');
        };

        // Set Docit's User to session with expiration date if applicable
        cookieObj.setUser = function (user, duration) {
            if (duration) {
                var expireDate = new Date();
                expireDate.setMinutes(expireDate.getMinutes() + duration);
                $cookies.putObject('docitUser', {expires: expireDate});
            }
            $cookies.putObject('docitUser', user);
        };

        // Set Docit's Doc to session with expiration date if applicable
        cookieObj.setDoc = function (doc, duration) {
            if (duration) {
                var expireDate = new Date();
                expireDate.setMinutes(expireDate.getMinutes() + duration);
                $cookies.putObject('docitDoc', {expires: expireDate});
            }
            $cookies.putObject('docitDoc', doc);
        };

        // Set Docit's Page to session with expiration date if applicable
        cookieObj.setPage = function (page, duration) {
            if (duration) {
                var expireDate = new Date();
                expireDate.setSeconds(expireDate.setSeconds() + duration);
                $cookies.put('docitPage', {expires: expireDate});
            }
            $cookies.put('docitPage', page);
        };

        // Remove Docit's User from session if it exists
        cookieObj.removeUser = function () {
            if ($cookies.getObject('docitUser')) {
                $cookies.remove('docitUser');
            }
        };

        // Remove Docit's Doc from session if it exists
        cookieObj.removeDoc = function () {
            if ($cookies.getObject('docitDoc')) {
                $cookies.remove('docitDoc');
            }
        };
       
        // Remove Docit's Page from session if it exists
        cookieObj.removePage = function () {
            if ($cookies.getObject('docitPage')) {
                $cookies.remove('docitPage');
            }
        };

        // Remove all Docit cookies
        cookieObj.clear = function () {
            this.removeUser();
            this.removeDoc();
            this.removePage();
        };

        return cookieObj;
    }]);