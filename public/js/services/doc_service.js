angular.module('DocService', []).factory('Doc', ['$http', function ($http) {
        return {
            // Call to get all docs
            get: function () {
                return $http.get('/api/docs');
            },

            // Call to get a doc
            get: function (id) {
                return $http.get('/api/docs/' + id);
            },

            // Call to create a new doc
            create: function (docData) {
                return $http.post('/api/docs', docData);
            },

            // Call to update a doc
            update: function (id, docData) {
                return $http.put('/api/docs/' + id, docData);
            },

            // Call to delete a doc
            delete: function (id) {
                return $http.delete('/api/docs/' + id);
            }
        }
    }]);