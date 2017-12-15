angular.module('CookieService', []).factory('Cookie', ['$cookies', function ($cookies) {
        var cookieObj = {};

        cookieObj.getUser = function () {
            return $cookies.getObject('docitUser');
        };

        cookieObj.getDoc = function () {
            return $cookies.getObject('docitDoc');
        };

        cookieObj.getPage = function () {
            return $cookies.get('docitPage');
        };

        cookieObj.setUser = function (user, duration) {
            if (duration) {
                var expireDate = new Date();
                expireDate.setMinutes(expireDate.getMinutes() + duration);
                $cookies.putObject('docitUser', {'expires': expireDate});
            }
            $cookies.putObject('docitUser', user);
        };

        cookieObj.setDoc = function (doc, duration) {
            if (duration) {
                var expireDate = new Date();
                expireDate.setMinutes(expireDate.getMinutes() + duration);
                $cookies.putObject('docitDoc', {'expires': expireDate});
            }
            $cookies.putObject('docitDoc', doc);
        };

        cookieObj.setPage = function (page, duration) {
            if (duration) {
                var expireDate = new Date();
                expireDate.setMinutes(expireDate.getMinutes() + duration);
                $cookies.put('docitPage', {'expires': expireDate});
            }
            $cookies.put('docitPage', page);
        };

        cookieObj.removeUser = function () {
            if ($cookies.getObject('docitUser')) {
                $cookies.remove('docitUser');
            }
        };

        cookieObj.removeDoc = function () {
            if ($cookies.getObject('docitDoc')) {
                $cookies.remove('docitDoc');
            }
        };

        cookieObj.removePage = function () {
            if ($cookies.getObject('docitPage')) {
                $cookies.remove('docitPage');
            }
        };

        cookieObj.clear = function () {
            this.removeUser();
            this.removeDoc();
            this.removePage();
        };

        return cookieObj;
    }]);