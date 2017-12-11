angular.module('NoteService', []).factory('Note', ['$http', function ($http) {
        return {
            // Call to get a note based on doc id
            get: function (id) {
                return $http.get('/api/notes/doc/' + id);
            },
            
            // Call to get a note count based on doc id
            getCount: function (id) {
                return $http.get('/api/notes/doc/' + id + "/count");
            },

            // Call to create a new note
            create: function (noteData) {
                return $http.post('/api/notes', noteData);
            },
            
            // Call to delete all notes based on doc id
            delete: function(id) {
                return $http.delete('/api/notes/doc/' + id);
            }
        }
    }]);