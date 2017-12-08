angular.module('UserService', []).factory('User', ['$http', function ($http) {
        return {
            // Call to get a user by alias
            getByAlias: function (alias, password) {
                return $http.get('/api/users/alias/' + alias + "/password/" + password);
            },

            // Call to get a user by email
            getByEmail: function (email) {
                return $http.get('/api/users/email/' + email);
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