angular.module('PageService', []).factory('Page', ['$rootScope', '$location', function ($http, $rootScope, $location) {
        var pageObj = {};

        pageObj.page = 'login';
        pageObj.titles = {'login': '|DOCIT| Login',
            'signup': '|DOCIT| Signup',
            'docit': '|DOCIT| Docit',
            'docview': '|DOCIT| Docview',
            'docboard': '|DOCIT| Docboard'};

        pageObj.setPage = function (page) {
            if (this.titles[page]) {
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

        return pageObj;
    }]);