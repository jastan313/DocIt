angular.module('DocService', []).factory('Doc', ['$http', function ($http) {
        return {
            // Call to get docs based on user id
            getByUserID: function (id) {
                return $http.get('/api/docs/user/' + id);
            },

            // Call to get docs based on ratings within the past d days, 
            // limited to top num items
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

            // Formats title string by either returning 'Untitled' if input is
            // empty string or truncating title string to maximum show length
            formatTitle: function (title) {
                var TITLE_MAX_SHOW_LEN = 100;
                if (title.length > 0) {
                    return title.length > TITLE_MAX_SHOW_LEN ?
                            title.substring(0, TITLE_MAX_SHOW_LEN) + "..." : title;
                } else {
                    return 'Untitled';
                }
            },

            // Formats date to Month/Date/Year
            formatDate: function (d) {
                var date = new Date(d);
                return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
            },

            // Creates a heading from a title, Alias, and date
            createHeading(title, alias, date) {
                return "\"" + title + "\" by " + alias + ", " + date;
            }
        }
    }]);