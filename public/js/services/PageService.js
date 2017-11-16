app.factory("PageService", function () {
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
            return 1;
        }
        return 0;
    }
    pageObj.getPage = function () {
        return this.page;
    }
    
    pageObj.getTitle = function() {
        return this.titles[this.page];
    }
    
    pageObj.changePage = function (scope, location, page) {
        if (this.titles[page]) {
            scope.page = page;
            scope.title = titles[page];
            location.path('/' + page);
            return 1;
        }
        return 0;
    };
    
    return pageObj;
});