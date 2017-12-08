angular.module('NoteService', []).factory('Note', ['$http', function ($http) {
        return {
            // Call to get all notes
            get: function () {
                return $http.get('/api/notes');
            },

            // Call to get a note
            get: function (id) {
                return $http.get('/api/notes/' + id);
            },

            // Call to create a new note
            create: function (noteData) {
                return $http.post('/api/notes', noteData);
            },

            // Call to update a note
            update: function (id, noteData) {
                return $http.put('/api/notes/' + id, noteData);
            },

            // Call to delete a note
            delete: function (id) {
                return $http.delete('/api/notes/' + id);
            }
        }
    }]);