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

        pageObj.getUserID = function () {
            return this.user;
        }

        pageObj.setDoc = function (doc) {
            this.doc = doc;
            return doc;
        }

        pageObj.getDoc = function () {
            return this.doc;
        }

        pageObj.insertAfter = function (target, element) {
            var ele = angular.element(element);
            var tar = document.querySelector("#" + target);
            if (targetElement) {
                tar.parentNode.insertBefore(ele, tar.nextSibling);
                return newElement;
            } else {
                return null;
            }
        }

        return pageObj;
    }]);