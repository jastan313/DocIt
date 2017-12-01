angular.module('DocService', []).factory('Doc', ['$http', function ($http) {
        return {
            // Call to get all docs
            get: function () {
                return $http.get('/api/docs');
            },

            // Call to get docs based on user id
            getByUserID: function (id) {
                return $http.get('/api/docs/user/' + id);
            },

            // Call to get docs based on ratings, limited to top num items
            getByRating: function (num) {
                return $http.get('/api/docs/items/' + num);
            },

            // Call to get docs based on ratings within the past d days, limited to top num items
            getByRatingAndTime: function (num, d) {
                return $http.get('/api/docs/items/' + num + "/days/" + d);
            },

            // Call to get a specific doc
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
            },

            formatDoc: function (doc) {
                if (doc) {
                    var date = new Date(doc.date);
                    doc.date = date.getMonth() + "/" + date.getDay() + "/" + date.getFullYear();
                }
                return doc;
            }
        }
    }]);