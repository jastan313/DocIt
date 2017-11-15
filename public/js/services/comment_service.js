angular.module('CommentService', []).factory('Comment', ['$http', function ($http) {
        return {
            // Call to get all comments
            get: function () {
                return $http.get('/api/comments');
            },

            // Call to get a comment
            get: function (id) {
                return $http.get('/api/comments/' + id);
            },

            // Call to create a new comment
            create: function (commentData) {
                return $http.post('/api/comments', commentData);
            },

            // Call to update a comment
            update: function (id, commentData) {
                return $http.put('/api/comments/' + id, commentData);
            },

            // Call to delete a comment
            delete: function (id) {
                return $http.delete('/api/comments/' + id);
            }
        }
    }]);