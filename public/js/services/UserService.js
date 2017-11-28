angular.module('UserService', []).factory('User', ['$http', function ($http) {
        return {
            // Call to get all users
            get: function () {
                return $http.get('/api/users');
            },

            // Call to get a user by id
            get: function (id) {
                return $http.get('/api/users/' + id);
            },

            // Call to get a user by alias
            getByAlias: function (alias) {
                return $http.get('/api/users/alias/' + alias);
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
            
            // Call to update a user to remove doc reference
            updateByDoc: function (uid, did) {
                return $http.put('/api/users/' + uid + 'docs/' + did);
            },

            // Call to delete a user
            delete: function (id) {
                return $http.delete('/api/users/' + id);
            }
        }
    }]);