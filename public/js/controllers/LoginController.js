angular.module('LoginCtrl', []).controller('LoginControlller', function ($scope, Page, User, Email) {
    $scope.loginSubmit = function () {
        var aliasRegex = new RegExp('^[A-Za-z0-9]{6,15}$');
        var passwordRegex = new RegExp('^[A-Za-z0-9@!#\$\^%&*()+=\-\[\]\\\';,\.\/\{\}\|\":<>\? ]{6,}$');
        if ($scope.formAlias.match(aliasRegex) && $scope.formPassword.match(passwordRegex)) {
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
                                    "to": user.email,
                                    "subject": "|DOCIT| Account Recovery",
                                    "text": "Hello " + user.alias + ",\n\n" +
                                            "You have recently attempted to login to |DOCIT| using the wrong credentials. " +
                                            "Fortunately enough, we are able to provide you with your current Alias and password. " +
                                            "Please try to remember your credentials this time."
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
            $scope.displayInfoPopup("Login credentials not valid. Please try again.");
        }
    }
});