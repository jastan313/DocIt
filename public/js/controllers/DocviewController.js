angular.module('DocviewCtrl', []).controller('DocviewController', function ($scope, Page, User, Doc) {
    $scope.init = function () {
        $scope.showAuthorBtns = false;
        $scope.copyText = "";

        $scope.docRating = 0;

        $scope.displayDocview();
    }

    $scope.displayDocview = function () {
        // Get the Doc we are looking at
        var doc = Page.getDoc();
        if (doc && doc.published) {
            // Data bind corresponding Doc data
            $scope.docAlias = doc.author.alias;
            $scope.docDate = doc.date;
            $scope.docTitle = doc.title;
            $scope.docBody = doc.body;
            var user = Page.getUser();
            if (user) {
                // Add Edit button if user is the author of this Doc
                $scope.showAuthorBtns = (doc.author._id === user._id);

                // Check if user has rated this Doc
                for (var i = 0; i < doc.ratings.length; i++) {
                    if (doc.ratings[i].user_id === user._id) {
                        $scope.docRating = doc.ratings[i].rating;
                        break;
                    }
                }
                // Add styling to rating buttons if user has rated
                $scope.updateDocRatingButtons();
            }
        } else {
            $scope.changePage("docboard");
        }
    }

    $scope.updateDocRatingButtons = function () {
        if ($scope.docRating == null || $scope.docRating === 0) {
            // Don't add any button styling since user has not rated Doc yet
        } else if ($scope.docRating > 0) {
            var rateUpBtn = angular.element('#docview-rateup-btn');
            rateUpBtn.addClass('ratedup');
        } else if ($scope.docRating < 0) {
            var rateDownBtn = angular.element('#docview-rateup-btn');
            rateUpBtn.addClass('rateddown');
        }
    }

    $scope.rateUpDoc = function () {
        var newRatings = Page.getDoc().ratings;
        if ($scope.docRating === -1) {
            var userID = Page.getUser()._id;
            for (var i = 0; i < newRatings.length; i++) {
                if (newRatings[i].user_id === userID) {
                    newRatings[i].rating = 1;
                    break;
                }
            }
        } else {
            newRatings.push({'user_id': Page.getUser()._id, 'rating': 1});
        }
        var docData = {'ratings': newRatings};
        Doc.update(Page.getDoc()._id, docData).then(function (response) {
            Page.setDoc(response.data);
            $scope.docRating = 1;
            $scope.displayInfoPopup("Doc Rated Up!");
            $scope.updateDocRatingButtons();
        });

    }

    $scope.rateDownDoc = function () {
        var newRatings = Page.getDoc().ratings;
        if ($scope.docRating === 1) {
            var userID = Page.getUser()._id;
            for (var i = 0; i < newRatings.length; i++) {
                if (newRatings[i].user_id === userID) {
                    newRatings[i].rating = -1;
                    break;
                }
            }
        } else {
            newRatings.push({'user_id': Page.getUser()._id, 'rating': -1});
        }
        var docData = {'ratings': newRatings};
        Doc.update(Page.getDoc()._id, docData).then(function (response) {
            Page.setDoc(response.data);
            $scope.docRating = -1;
            $scope.displayInfoPopup("Doc Rated Down!");
            $scope.updateDocRatingButtons();
        });

    }

    $scope.copyDoc = function () {
        var copyText = $scope.docTitle + "\nby " + $scope.docAlias + ", " + $scope.docDate +
                "\n\n" + $scope.docBody;
        var toCopy = document.getElementById("docview-copytext");
        toCopy.textContent = copyText;
        toCopy.focus();
        toCopy.setSelectionRange(0, toCopy.value.length);
        document.execCommand('copy');
        toCopy.textContent = "";
        $scope.toggleDirectory();
        $scope.displayInfoPopup("Doc Copied", $scope.docTitle + " by " + $scope.docAlias + ", " + $scope.docDate);
    }

    $scope.exportDoc = function () {
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
        $scope.displayInfoPopup("Doc Exported", "File: " + filename);
        $scope.toggleDirectory();
    }

    $scope.deleteDoc = function () {
        if (Page.getDoc().author === Page.getUser()._id) {
            Doc.delete(Page.getDoc()._id).then(function (response) {
                $scope.displayInfoPopup("Doc Deleted",
                        "\"" + Page.getDoc().title + "\" by " +
                        Page.getDoc().alias + ", " + Page.getDoc().date);
                $scope.changePage('docboard');
            });
        }
    }
});