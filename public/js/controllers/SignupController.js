angular.module('SignupCtrl', []).controller('SignupController', function ($scope, Page, User) {
    $scope.formEmail = 'test1@test.com';
    $scope.formAlias = 'testtest1';
    $scope.formPassword = 'testtest1';
    $scope.formPasswordConfirm = 'testtest1';

    $scope.signupSubmit = function () {
        var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var aliasRegex = /^[A-Za-z0-9]{6,15}$/;
        var passwordRegex = /^[A-Za-z0-9$-/:-?{-~!"^_`\[\] ]{6,}$/;
        var emailFlag = emailRegex.test($scope.formEmail);
        var aliasFlag = aliasRegex.test($scope.formAlias);
        var passwordFlag = passwordRegex.test($scope.formPassword);
        var passwordMatchFlag = $scope.formPassword === $scope.formPasswordConfirm;
        if (emailFlag && aliasFlag && passwordFlag && passwordMatchFlag) {
            User.getByEmail($scope.formEmail).then(function (response) {
                var emailTaken = Array.isArray(response.data) ? null : response.data;
                if (!emailTaken) {
                    User.getByAlias($scope.formAlias).then(function (response) {
                        var aliasTaken = Array.isArray(response.data) ? null : response.data;
                        if (!aliasTaken) {
                            var userData = {
                                'alias': $scope.formAlias,
                                'email': $scope.formEmail,
                                'password': $scope.formPassword
                            };
                            User.create(userData).then(function (response) {
                                var user = Array.isArray(response.data) ? null : response.data;
                                console.log(user);
                                $scope.objToString(user, 0);
                                if (user) {
                                    Page.setUser(user);
                                    $scope.changePage('docboard');
                                }
                            }, function (err) {
                                console.log("Signup: User Creation Error: " + err);
                            });
                        } else {
                            $scope.mainObj.toFocus = "signup-alias";
                            $scope.displayInfoPopup("Alias Taken Error",
                                    "Unforunately, there is an existing account with the Alias |" + $scope.formAlias + "|.\
                                    Please signup using a different Alias or login to your existing account if this is your Alias.");
                        }
                    }, function (err) {
                        console.log("Signup: Email Submit Error:" + err);
                    });
                } else {
                    $scope.mainObj.toFocus = "signup-email";
                    $scope.displayInfoPopup("Email Address Taken Error",
                            "Unforunately, there is an existing account with the email address |" + $scope.formEmail + "|.\
                                    Please signup using a different email or login to your existing account if this is your email.");
                }

            }, function (err) {
                console.log("Signup: Alias Submit Error:" + err);
            });
        } else {
            if (!emailFlag) {
                $scope.mainObj.toFocus = "signup-email";
                $scope.displayInfoPopup("Email Validation Error",
                        "The email you have entered is not valid. Please enter a valid email.");
            } else if (!aliasFlag) {
                $scope.mainObj.toFocus = "signup-alias";
                $scope.displayInfoPopup("Alias Validation Error",
                        "The Alias you have entered is not valid. Please enter an Alias with \
                    the following criteria:\n\
                    + Alphanumeric characters [A-Z, a-z, 0-9] allowed.\n\
                    + Minimum character length: Six (6).\n\
                    + Maximum character length: Fifteen (15).");
            } else if (!passwordFlag) {
                $scope.mainObj.toFocus = "signup-password";
                $scope.displayInfoPopup("Password Validation Error",
                        "The password you have entered is not valid. Please enter a password with \
                    the following criteria:\n\
                    + Alphanumeric characters [A-Z, a-z, 0-9] allowed.\n\
                    + Special characters [~!@#$%^&*()_+[]{}|=-:;\"\'/?><., ] allowed.\n\
                    + Minimum character length: Six (6).");
            } else if (!passwordMatchFlag) {
                $scope.mainObj.toFocus = "signup-password-confirm";
                $scope.displayInfoPopup("Password Validation Error",
                        "The passwords you have entered do not match. Please confirm and verify the two passwords.");
            } else {
                $scope.mainObj.toFocus = "signup-email";
                $scope.displayInfoPopup("Form Validation Error",
                        "Oops, |DOCIT| couldn't figure out why the form did not pass validation.");
            }
        }
    }
});