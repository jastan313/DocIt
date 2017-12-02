angular.module('DocitCtrl', []).controller('DocitController', function ($scope, Page, User, Doc) {
    $scope.init = function () {
        $scope.MIN_BODY_LENGTH = 50;
        $scope.mainCtrl.directoryShow = false;
        $scope.showAuthorBtns = true;
        $scope.copyText = "";

        $scope.docAlias = Page.getUser().alias;
        var tempDate = new Date();
        $scope.docDate = tempDate.getMonth() + 1 +
                "/" + tempDate.getDate() +
                "/" + tempDate.getFullYear();
        $scope.docTitle = "Untitled";
        $scope.docBody = "";

        $scope.displayDocit();
    }

    $scope.displayDocit = function () {
        // Get the Doc we are looking at
        var doc = Page.getDoc();
        if (doc) {
            // Data bind corresponding Doc data
            $scope.docDate = doc.date;
            $scope.docTitle = doc.title;
            $scope.docBody = doc.body;

            // Show Copy and Save buttons if user has not published Doc yet
            $scope.showAuthorBtns = !doc.published;
        }
    }

    $scope.copyDoc = function () {
        var copyText = "\"" + $scope.docTitle + "\" by " + $scope.docAlias + ", " + $scope.docDate +
                "\n\n" + $scope.docBody;
        var toCopy = document.getElementById("docit-copytext");
        toCopy.textContent = copyText;
        toCopy.focus();
        toCopy.setSelectionRange(0, toCopy.value.length);
        document.execCommand('copy');
        toCopy.textContent = "";
        $scope.toggleDirectory();
        $scope.displayInfoPopup("Doc Copied",
                "\"" + $scope.docTitle + "\" by " + $scope.docAlias + ", " + $scope.docDate);
    }

    $scope.saveDoc = function () {
        if (!$scope.mainCtrl.isProcessing) {
            $scope.mainCtrl.isProcessing = true;
            var d = Page.getDoc();
            $scope.docTitle = $scope.docTitle.length > 0 ? $scope.docTitle : "Untitled";
            // If user is updating an existing Doc
            if (d) {
                var docData = {
                    'title': $scope.docTitle,
                    'body': $scope.docBody
                };
                Doc.update(d._id, docData).then(function (response) {
                    if (response.data) {
                        Page.setDoc(response.data);
                        $scope.displayInfoPopup("Doc Updated",
                                "\"" + $scope.docTitle.length > 25 ?
                                $scope.docTitle.substring(0, 25) + "..." :
                                $scope.docTitle + "\" by " +
                                $scope.docAlias + ", " + Page.getDoc().date);
                        $scope.displayDocit();
                    } else {
                        $scope.displayInfoPopup("Doc Missing",
                                "Oops, it looks the Doc you were viewing does not exist anymore.");
                        $scope.changePage('docboard');
                    }
                });
            }
            // If user is creating a new Doc
            else {
                var docData = {
                    'title': $scope.docTitle,
                    'author': Page.getUser()._id,
                    'body': $scope.docBody
                };
                Doc.create(docData).then(function (response) {
                    if (response.data) {
                        Page.setDoc(response.data);
                        $scope.displayInfoPopup("Doc Created",
                                "\"" + $scope.docTitle.length > 25 ?
                                $scope.docTitle.substring(0, 25) + "..." :
                                $scope.docTitle + "\" by " +
                                $scope.docAlias + ", " + Page.getDoc().date);
                        $scope.displayDocit();
                    } else {
                        $scope.displayInfoPopup("Doc Missing",
                                "Oops, it looks the Doc you were viewing does not exist anymore.");
                        $scope.changePage('docboard');
                    }
                });
            }
            $scope.toggleDirectory();
        }
    }

    $scope.publishDoc = function () {
        if (!$scope.mainCtrl.isProcessing) {
            $scope.mainCtrl.isProcessing = true;
            if ($scope.docBody.length < $scope.MIN_BODY_LENGTH) {
                $scope.displayInfoPopup("Doc Minimum Character Length",
                        "Doc's body requires a minimum of " + $scope.MIN_BODY_LENGTH +
                        "characters. Keep writing! You need at least " + $scope.docBody.length + "more characters.");
            } else {
                var d = Page.getDoc();
                // If user is updating an existing Doc
                if (d) {
                    var docData = {
                        'title': $scope.docTitle,
                        'body': $scope.docBody,
                        'published': true
                    };
                    Doc.update(d._id, docData).then(function (response) {
                        if (response.data) {
                            Page.setDoc(response.data);
                            $scope.displayInfoPopup("Doc Updated And Published",
                                    "\"" + $scope.docTitle.length > 25 ?
                                    $scope.docTitle.substring(0, 25) + "..." :
                                    $scope.docTitle + "\" by " +
                                    $scope.docAlias + ", " + Page.getDoc().date);
                            $scope.objToString(response.data, 0);
                            $scope.changePage('docview');
                        } else {
                            $scope.displayInfoPopup("Doc Missing",
                                    "Oops, it looks the Doc you were viewing does not exist anymore.");
                            $scope.changePage('docboard');
                        }
                    });
                }
                // If user is creating a new Doc
                else {
                    var docData = {
                        'title': $scope.docTitle,
                        'author': Page.getUser()._id,
                        'body': $scope.docBody,
                        'published': true
                    };
                    Doc.create(docData).then(function (response) {
                        if (response.data) {
                            Page.setDoc(response.data);
                            $scope.displayInfoPopup("Doc Created And Published",
                                    "\"" + $scope.docTitle.length > 25 ?
                                    $scope.docTitle.substring(0, 25) + "..." :
                                    $scope.docTitle + "\" by " +
                                    $scope.docAlias + ", " + Page.getDoc().date);
                            $scope.objToString(response.data, 0);
                            $scope.changePage('docview');
                        } else {
                            $scope.displayInfoPopup("Doc Missing",
                                    "Oops, it looks the Doc you were viewing does not exist anymore.");
                            $scope.changePage('docboard');
                        }
                    });
                }
            }
            $scope.toggleDirectory();
        }
    }

    $scope.exportDoc = function () {
        if (!$scope.mainCtrl.isProcessing) {
            $scope.mainCtrl.isProcessing = true;
            // Client-side file saver with custom filenames
            var saveAs = saveAs || function (e) {
                "use strict";
                if (typeof e === "undefined" || typeof navigator !== "undefined" && /MSIE [1-9]\./.test(navigator.userAgent)) {
                    return
                }
                var t = e.document, n = function () {
                    return e.URL || e.webkitURL || e
                }, r = t.createElementNS("http://www.w3.org/1999/xhtml", "a"), o = "download"in r, a = function (e) {
                    var t = new MouseEvent("click");
                    e.dispatchEvent(t)
                }, i = /constructor/i.test(e.HTMLElement) || e.safari, f = /CriOS\/[\d]+/.test(navigator.userAgent), u = function (t) {
                    (e.setImmediate || e.setTimeout)(function () {
                        throw t
                    }, 0)
                }, s = "application/octet-stream", d = 1e3 * 40, c = function (e) {
                    var t = function () {
                        if (typeof e === "string") {
                            n().revokeObjectURL(e)
                        } else {
                            e.remove()
                        }
                    };
                    setTimeout(t, d)
                }, l = function (e, t, n) {
                    t = [].concat(t);
                    var r = t.length;
                    while (r--) {
                        var o = e["on" + t[r]];
                        if (typeof o === "function") {
                            try {
                                o.call(e, n || e)
                            } catch (a) {
                                u(a)
                            }
                        }
                    }
                }, p = function (e) {
                    if (/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)) {
                        return new Blob([String.fromCharCode(65279), e], {type: e.type})
                    }
                    return e
                }, v = function (t, u, d) {
                    if (!d) {
                        t = p(t)
                    }
                    var v = this, w = t.type, m = w === s, y, h = function () {
                        l(v, "writestart progress write writeend".split(" "))
                    }, S = function () {
                        if ((f || m && i) && e.FileReader) {
                            var r = new FileReader;
                            r.onloadend = function () {
                                var t = f ? r.result : r.result.replace(/^data:[^;]*;/, "data:attachment/file;");
                                var n = e.open(t, "_blank");
                                if (!n)
                                    e.location.href = t;
                                t = undefined;
                                v.readyState = v.DONE;
                                h()
                            };
                            r.readAsDataURL(t);
                            v.readyState = v.INIT;
                            return
                        }
                        if (!y) {
                            y = n().createObjectURL(t)
                        }
                        if (m) {
                            e.location.href = y
                        } else {
                            var o = e.open(y, "_blank");
                            if (!o) {
                                e.location.href = y
                            }
                        }
                        v.readyState = v.DONE;
                        h();
                        c(y)
                    };
                    v.readyState = v.INIT;
                    if (o) {
                        y = n().createObjectURL(t);
                        setTimeout(function () {
                            r.href = y;
                            r.download = u;
                            a(r);
                            h();
                            c(y);
                            v.readyState = v.DONE
                        });
                        return
                    }
                    S()
                }, w = v.prototype, m = function (e, t, n) {
                    return new v(e, t || e.name || "download", n)
                };
                if (typeof navigator !== "undefined" && navigator.msSaveOrOpenBlob) {
                    return function (e, t, n) {
                        t = t || e.name || "download";
                        if (!n) {
                            e = p(e)
                        }
                        return navigator.msSaveOrOpenBlob(e, t)
                    }
                }
                w.abort = function () {};
                w.readyState = w.INIT = 0;
                w.WRITING = 1;
                w.DONE = 2;
                w.error = w.onwritestart = w.onprogress = w.onwrite = w.onabort = w.onerror = w.onwriteend = null;
                return m
            }(typeof self !== "undefined" && self || typeof window !== "undefined" && window || this.content);
            if (typeof module !== "undefined" && module.exports) {
                module.exports.saveAs = saveAs
            } else if (typeof define !== "undefined" && define !== null && define.amd !== null) {
                define("FileSaver.js", function () {
                    return saveAs
                })
            }
            ;
            var filename = $scope.docTitle.replace(/[\s+\t\n\\/:\"*?<>|]/g, '') + ".txt";
            var data = "\"" + $scope.docTitle + "\" by " + $scope.docAlias
                    + ", " + $scope.docDate + "\n" + $scope.docBody;
            var blob = new Blob([data.replace(/([^\r])\n/g, "$1\r\n")], {type: "text/plain;charset=utf-8"});
            saveAs(blob, filename);
            $scope.displayInfoPopup("Doc Exported",
                    "File: " + filename + "\n\nNote: Exporting does not save the Doc.");
            $scope.toggleDirectory();
        }
    }

    $scope.deleteDoc = function () {
        if (!$scope.mainCtrl.isProcessing) {
            $scope.mainCtrl.isProcessing = true;
            var doc = Page.getDoc();
            if (doc) {
                Doc.delete(Page.getDoc()._id).then(function (response) {
                    if (response.data) {
                        $scope.displayInfoPopup("Doc Deleted",
                                "\"" + $scope.docTitle.length > 25 ?
                                $scope.docTitle.substring(0, 25) + "..." :
                                $scope.docTitle + "\" by " +
                                $scope.docAlias + ", " + $scope.docDate);
                        $scope.changePage('docboard');
                    }
                    else {
                        $scope.displayInfoPopup("Doc Missing",
                                "Oops, it looks the Doc you were viewing does not exist anymore.");
                        $scope.changePage('docboard');
                    }
                });
            } else {
                $scope.docTitle = $scope.docTitle.length > 0 ? $scope.docTitle : "Untitled";
                $scope.displayInfoPopup("Doc Draft Discarded",
                        "\"" + $scope.docTitle.length > 25 ?
                        $scope.docTitle.substring(0, 25) + "..." :
                        $scope.docTitle + "\" by " +
                        $scope.docAlias + ", " + $scope.docDate);
                $scope.changePage('docboard');
            }
        }
    }
});