angular.module('UserService', []).factory('User', ['$http', function ($http) {
        return {
            // Call to get all users
            get: function () {
                return $http.get('/api/users');
            },

            // Call to get a user
            get: function (id) {
                return $http.get('/api/users/' + id);
            },

            // Call to create a new user
            create: function (userData) {
                return $http.post('/api/users', userData);
            },

            // Call to update a user
            update: function (id, userData) {
                return $http.put('/api/users/' + id, userData);
            },

            // Call to delete a user
            delete: function (id) {
                return $http.delete('/api/users/' + id);
            }
        }
    }]);