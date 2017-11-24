angular.module('DocitCtrl', []).controller('DocitControlller', function ($scope, Page, User, Doc) {
    $scope.showAuthorBtns = false;
    $scope.copyText = "";
    $scope.MIN_BODY_LENGTH = 50;
    $scope.displayDocit = function () {
        // Get the Doc we are looking at
        var doc = Page.getDoc();
        if (doc) {
            // Data bind corresponding Doc data
            $scope.docAlias = doc.user.alias;
            $scope.docDate = doc.date.getMonth() +
                    "/" + doc.date.getDate() +
                    "/" + doc.date.getFullYear();
            $scope.docTitle = doc.title;
            $scope.docBody = doc.body;

            // Show Copy and Save buttons if user has not published Doc yet
            $scope.showAuthorBtns = !doc.published;
        } else {
            $scope.changePage("docboard");
        }
    }

    $scope.copyDoc = function () {
        $scope.copyText = $scope.docTitle + "\nby " + $scope.docAlias + ", " + $scope.docDate +
                "\n\n" + $scope.docBody;
        var toCopy = document.getElementById("docit-copytext");
        try {
            document.execCommand('copy');
        } catch (err) {
            alert("Docit: Copy Doc Error: " + err);
        } finally {
            $scope.copyText = "";
        }
    }

    $scope.saveDoc = function () {
        var d = Page.getDoc();
        $scope.docTitle = $scope.docTitle.length > 0 ? $scope.docTitle : "Untitled";
        // If user is updating an existing Doc
        if (d) {
            var docData = {
                'title': $scope.docTitle,
                'body': $scope.docBody
            };
            Doc.update(d._id, docData).then(function (doc) {
                Page.setDoc(doc);
                $scope.displayInfoPopup("Doc Updated:\n\n" + Page.getDoc().title + "\nby: " +
                        Page.getDoc().alias + ", " + Page.getDoc().date);
            }, function (err) {
                console.log("Docit: Doc Update Error: " + err);
            });
        }
        // If user is creating a new Doc
        else {
            var docData = {
                'title': $scope.docTitle,
                'author': Page.getUser().alias,
                'body': $scope.docBody
            };
            Doc.create(docData).then(function (doc) {
                Page.setDoc(doc);
                $scope.displayInfoPopup("Doc Created:\n\n" + Page.getDoc().title + "\nby: " +
                        Page.getDoc().alias + ", " + Page.getDoc().date);
            }, function (err) {
                console.log("Docit: Doc Creation Error: " + err);
            });
        }
    }

    $scope.publishDoc = function () {
        if ($scope.docBody.length < $scope.MIN_BODY_LENGTH) {
            $scope.infoModalText = "Doc's body requires a minimum of " + $scope.MIN_BODY_LENGTH +
                    "characters. Keep writing! You need at least " + $scope.docBody.length + "more characters.";
            document.getElementById("info-modal").classList.add('open');
        } else {
            var d = Page.getDoc();
            // If user is updating an existing Doc
            if (d) {
                var docData = {
                    'title': $scope.docTitle,
                    'body': $scope.docBody,
                    'published': true
                };
                Doc.update(d._id, docData).then(function (doc) {
                    Page.setDoc(doc);
                    $scope.displayInfoPopup("Doc Updated And Published:\n\n" +
                            Page.getDoc().title + "\nby: " +
                            Page.getDoc().alias + ", " + Page.getDoc().date);
                    $scope.changePage('docview');
                }, function (err) {
                    console.log("Docit: Doc Publish Update Error: " + err);
                });
            }
            // If user is creating a new Doc
            else {
                var docData = {
                    'title': $scope.docTitle,
                    'author': Page.getUser().alias,
                    'body': $scope.docBody,
                    'published': true
                };
                Doc.create(docData).then(function (doc) {
                    Page.setDoc(doc);
                    $scope.displayInfoPopup("Doc Created And Published:\n\n" +
                            Page.getDoc().title + "\nby: " +
                            Page.getDoc().alias + ", " + Page.getDoc().date);
                    $scope.changePage('docview');
                }, function (err) {
                    console.log("Docit: Doc Publish Creation Error: " + err);
                });
            }
        }
    }

    $scope.exportDoc = function () {
        // Client-side file saver with custom filenames
        var saveAs=saveAs||function(e){"use strict";if(typeof e==="undefined"||typeof navigator!=="undefined"&&/MSIE [1-9]\./.test(navigator.userAgent)){return}var t=e.document,n=function(){return e.URL||e.webkitURL||e},r=t.createElementNS("http://www.w3.org/1999/xhtml","a"),o="download"in r,a=function(e){var t=new MouseEvent("click");e.dispatchEvent(t)},i=/constructor/i.test(e.HTMLElement)||e.safari,f=/CriOS\/[\d]+/.test(navigator.userAgent),u=function(t){(e.setImmediate||e.setTimeout)(function(){throw t},0)},s="application/octet-stream",d=1e3*40,c=function(e){var t=function(){if(typeof e==="string"){n().revokeObjectURL(e)}else{e.remove()}};setTimeout(t,d)},l=function(e,t,n){t=[].concat(t);var r=t.length;while(r--){var o=e["on"+t[r]];if(typeof o==="function"){try{o.call(e,n||e)}catch(a){u(a)}}}},p=function(e){if(/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)){return new Blob([String.fromCharCode(65279),e],{type:e.type})}return e},v=function(t,u,d){if(!d){t=p(t)}var v=this,w=t.type,m=w===s,y,h=function(){l(v,"writestart progress write writeend".split(" "))},S=function(){if((f||m&&i)&&e.FileReader){var r=new FileReader;r.onloadend=function(){var t=f?r.result:r.result.replace(/^data:[^;]*;/,"data:attachment/file;");var n=e.open(t,"_blank");if(!n)e.location.href=t;t=undefined;v.readyState=v.DONE;h()};r.readAsDataURL(t);v.readyState=v.INIT;return}if(!y){y=n().createObjectURL(t)}if(m){e.location.href=y}else{var o=e.open(y,"_blank");if(!o){e.location.href=y}}v.readyState=v.DONE;h();c(y)};v.readyState=v.INIT;if(o){y=n().createObjectURL(t);setTimeout(function(){r.href=y;r.download=u;a(r);h();c(y);v.readyState=v.DONE});return}S()},w=v.prototype,m=function(e,t,n){return new v(e,t||e.name||"download",n)};if(typeof navigator!=="undefined"&&navigator.msSaveOrOpenBlob){return function(e,t,n){t=t||e.name||"download";if(!n){e=p(e)}return navigator.msSaveOrOpenBlob(e,t)}}w.abort=function(){};w.readyState=w.INIT=0;w.WRITING=1;w.DONE=2;w.error=w.onwritestart=w.onprogress=w.onwrite=w.onabort=w.onerror=w.onwriteend=null;return m}(typeof self!=="undefined"&&self||typeof window!=="undefined"&&window||this.content);if(typeof module!=="undefined"&&module.exports){module.exports.saveAs=saveAs}else if(typeof define!=="undefined"&&define!==null&&define.amd!==null){define("FileSaver.js",function(){return saveAs})};
        var filename = $scope.docTitle.replace(/[\s+\t\n\\/:\"*?<>|]/g, '') + ".txt";
        var data = $scope.docTitle + "\nby: " + $scope.docAlias
                + ", " + Page.getDoc().date;
        var blob = new Blob([data], {type: "text/plain;charset=utf-8"});
        saveAs(blob, filename);
        $scope.displayInfoPopup("Doc Exported: " + filename + "Note: Exporting does not save the Doc.");
    }

    $scope.deleteDoc = function () {
        Doc.delete(Page.getDoc()._id).then(function (doc) {
            User.updateByDoc(Page.getUser()._id, Page.getDoc()._id);
            $scope.displayInfoPopup("Doc Deleted:\n\n" + Page.getDoc().title + "\nby: " +
                    Page.getDoc().alias + ", " + Page.getDoc().date);
            document.getElementById("info-modal").classList.add('open');
        }, function (err) {
            console.log("Docit: Doc Deletion Error: " + err);
        });
    }

    /* Key binding events for aggregate keydown events */
    $scope.keyDownFunc = function ($event) {
        if ($scope.ctrlDown && ($event.keyCode == $scope.cKey)) {
            // 'Ctrl + C pressed'
        } else if ($scope.ctrlDown && ($event.keyCode == $scope.vKey)) {
            // 'Ctrl + V pressed'
        } else if ($scope.ctrlDown && String.fromCharCode($event.which).toLowerCase() == 's') {
            // 'Ctrl + S pressed'
            $event.preventDefault();
            $scope.saveDoc();
        }
    };

});