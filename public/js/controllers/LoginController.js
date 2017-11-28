angular.module('LoginCtrl', []).controller('LoginController', function ($scope, Page, User, Email) {
    $scope.loginSubmit = function () {
        var aliasRegex = /^[A-Za-z0-9]{6,15}$/;
        var passwordRegex = /^[A-Za-z0-9$-/:-?{-~!"^_`\[\] ]{6,}$/;
        var aliasFlag = aliasRegex.test($scope.formAlias);
        var passwordFlag = passwordRegex.test($scope.formPassword);
        if (aliasFlag && passwordFlag) {
            User.getByAlias($scope.formAlias).then(function (user) {
                if (user != null) {
                    if ($scope.formPassword === user.password) {
                        var userData = {"login_attempts": 0};
                        User.update(user._id, userData).then(function (user) {
                            Page.setUser(user);
                            $scope.changePage('docboard');
                        }, function (err) {
                            console.log("Login: User Update Error:" + err);
                        });
                    } else {
                        var loginAttempts = (user.login_attempts + 1) % 5;
                        var userData = {"login_attempts": loginAttempts};
                        User.update(user._id, userData).then(function (user) {
                            if (loginAttempts === 0) {
                                var emailData = {
                                    "from": "|DOCIT| <donotreply@docit.com>",
                                    "to": user.email,
                                    "subject": "|DOCIT| Account Recovery",
                                    "text": "Hello " + user.email + ",\n\n" +
                                            "You have recently attempted multiple logins to |DOCIT| using the wrong credentials. " +
                                            "Fortunately enough, we are able to provide you with your current Alias and password. " +
                                            "Please try to remember your credentials this time:\n\n" +
                                            "Alias: " + user.alias + "\nPassword: " + user.password +
                                            ".\n\nHave a great day and best of luck to your creative writing,\n|DOCIT|"
                                };
                                Email.create(emailData).then(function (email) {
                                    $scope.displayInfoPopup("Login Alias and password did not match. An email has been sent to " +
                                            user.alias + "\'s email address |" + "| to recover the account.");
                                }, function (err) {
                                    console.log("Login: Recovery Email Error: " + err);
                                });

                            } else {
                                $scope.displayInfoPopup("Login Alias and password did not match.\nNumber of attempts: " +
                                        loginAttempts + ".\n\nNote: Upon reaching five unsuccessful attempts, a recovery email will be sent.");
                            }

                        }, function (err) {
                            console.log("Login: User Update Error:" + err);
                        });
                    }
                } else {
                    $scope.displayInfoPopup("Login Alias does not exist. Please signup by clicking the \"Create\" button.");
                }
            }, function (err) {
                console.log("Login: User Get Error:" + err);
            });
        } else {
            if (!aliasFlag) {
                $scope.mainObj.toFocus = "login-alias";
                $scope.displayInfoPopup("Alias Validation Error",
                        "The Alias you have entered is not valid. Please enter your Alias which \
                    follows this criteria:\n\
                    + Alphanumeric characters [A-Z, a-z, 0-9].\n\
                    + Minimum character length: Six (6).\n\
                    + Maximum character length: Fifteen (15).");
            } else if (!passwordFlag) {
                $scope.mainObj.toFocus = "login-password";
                $scope.displayInfoPopup("Password Validation Error",
                        "The password you have entered is not valid. Please enter your password \
                    follows this criteria:\n\
                    + Alphanumeric characters [A-Z, a-z, 0-9] allowed.\n\
                    + Special characters [~!@#$%^&*()_+[]{}|=-:;\"\'/?><., ] allowed.\n\
                    + Minimum character length: Six (6).");
            } else {
                $scope.displayInfoPopup("Form Validation Error",
                        "Oops, |DOCIT| couldn't figure out why the form did not pass validation.");
            }
        }
    }
});