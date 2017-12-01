angular.module('PageService', []).factory('Page', ['$rootScope', '$location', function ($http, $rootScope, $location) {
        var pageObj = {};

        pageObj.page = 'login';
        pageObj.titles = {'login': '|DOCIT| Login',
            'signup': '|DOCIT| Signup',
            'docit': '|DOCIT| Docit',
            'docview': '|DOCIT| Docview',
            'docboard': '|DOCIT| Docboard'};
        pageObj.user = null;
        pageObj.doc = null;
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

        pageObj.getPage = function () {
            return this.page;
        }

        pageObj.getTitle = function () {
            return this.titles[this.page];
        }

        pageObj.setUser = function (user) {
            this.user = user;
            return user;
        }

        pageObj.getUser = function () {
            return this.user;
        }

        pageObj.setDoc = function (doc) {
            if (doc) {
                var date = new Date(doc.date);
                doc.date = date.getMonth() + "/" + date.getDay() + "/" + date.getFullYear();
            }
            this.doc = doc;
            return doc;
        }

        pageObj.getDoc = function () {
            return this.doc;
        }

        return pageObj;
    }]);