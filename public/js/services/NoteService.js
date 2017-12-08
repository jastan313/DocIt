angular.module('NoteService', []).factory('Note', ['$http', function ($http) {
        return {
            // Call to get a note based on doc id
            get: function (id) {
                return $http.get('/api/notes/doc/' + id);
            },

            // Call to create a new note
            create: function (noteData) {
                return $http.post('/api/notes', noteData);
            }
        }
    }]);