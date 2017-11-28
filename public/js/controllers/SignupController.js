angular.module('SignupCtrl', []).controller('SignupController', function ($scope, Page, User) {
    $scope.signupSubmit = function () {
        var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var aliasRegex = /^[A-Za-z0-9]{6,15}$/;
        var passwordRegex = /^[A-Za-z0-9$-/:-?{-~!"^_`\[\] ]{6,}$/;
        var emailFlag = emailRegex.test($scope.formEmail);
        var aliasFlag = aliasRegex.test($scope.formAlias);
        var passwordFlag = passwordRegex.test($scope.formPassword);
        var passwordMatchFlag = $scope.formPassword === $scope.formPasswordConfirm;
        if (emailFlag && aliasFlag && passwordFlag && passwordMatchFlag) {
            return;
            User.getByAlias($scope.formAlias).then(function (user) {
                if (user == null) {
                    User.getByAlias($scope.formEmail).then(function (user) {
                        if (user == null) {
                            var userData = {
                                'alias': $scope.formAlias,
                                'email': $scope.formEmail,
                                'password': $scope.password
                            };
                            User.create(userData).then(function (data) {
                                Page.setUser(data);
                                $scope.changePage('docboard');
                            }, function (err) {
                                console.log("Signup: User Creation Error: " + err);
                            });
                        } else {
                            console.log("Signup: Email Taken Error.");
                        }
                    }, function (err) {
                        console.log("Signup: Email Submit Error:" + err);
                    });
                } else {
                    console.log("Signup: Alias Taken Error.");
                }

            }, function (err) {
                console.log("Signup: Alias Submit Error:" + err);
            });
        } else {
            if(!emailFlag) {
                $scope.mainObj.toFocus = "signup-email";
                $scope.displayInfoPopup("Validation Error",
                    "The email you have entered is not valid. Please enter a valid email.");
            }
            else if(!aliasFlag) {
                $scope.mainObj.toFocus = "signup-alias";
                $scope.displayInfoPopup("Validation Error",
                    "The Alias you have entered is not valid. Please enter an Alias with \
                    the following criteria:\n\
                    + Alphanumeric characters [A-Z, a-z, 0-9] allowed.\n\
                    + Minimum character length: Six (6).\n\
                    + Maximum character length: Fifteen (15).");
            }
            else if(!passwordFlag) {
                $scope.mainObj.toFocus = "signup-password";
                $scope.displayInfoPopup("Validation Error",
                    "The password you have entered is not valid. Please enter a password with \
                    the following criteria:\n\
                    + Alphanumeric characters [A-Z, a-z, 0-9] allowed.\n\
                    + Special characters [~!@#$%^&*()_+[]{}|=-:;\"\'/?><., ] allowed.\n\
                    + Minimum character length: Six (6).");
            }
            else if(!passwordMatchFlag) {
                $scope.mainObj.toFocus = "signup-password-confirm";
                $scope.displayInfoPopup("Validation Error:",
                    "The passwords you have entered do not match. Please confirm and verify the two passwords.");
            }
            else {
                $scope.mainObj.toFocus = "signup-email";
                $scope.displayInfoPopup("Validation Error:",
                "Oops, |DOCIT| couldn't figure out why the form fields pass validation.");
            }
        }
    }
});