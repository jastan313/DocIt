angular.module('PageService', []).factory('Page', ['$rootScope', '$location', function ($http, $rootScope, $location) {
        // Page object which carries page relevant information,
        // the current user, and current Doc (the Doc the user is
        // looking at) if set
        var pageObj = {};
        pageObj.page = 'login';
        pageObj.titles = {'login': '|DOCIT| Login',
            'signup': '|DOCIT| Signup',
            'docit': '|DOCIT| Docit',
            'docview': '|DOCIT| Docview',
            'docboard': '|DOCIT| Docboard',
            'docnotes': '|DOCIT| Docnotes'};
        pageObj.user = null;
        pageObj.doc = null;

        // Sets the current page; resets user and/or Doc
        // if applicable
        pageObj.setPage = function (page) {
            if (this.titles[page]) {
                if (page === 'login' || page === 'signup') {
                    this.user = null;
                    this.doc = null;
                } else if (page === 'docboard') {
                    this.doc = null;
                }
                this.page = page;
                return page;
            }
            return null;
        }

        // Returns the current page
        pageObj.getPage = function () {
            return this.page;
        }

        // Returns the title for the current Page
        pageObj.getTitle = function () {
            return this.titles[this.page];
        }

        // Set the current user
        pageObj.setUser = function (user) {
            this.user = user;
            return user;
        }

        // Return the current user
        pageObj.getUser = function () {
            return this.user;
        }

        // Set the current Doc
        pageObj.setDoc = function (doc) {
            this.doc = doc;
            return doc;
        }

        // Return the current Doc
        pageObj.getDoc = function () {
            return this.doc;
        }

        return pageObj;
    }]);