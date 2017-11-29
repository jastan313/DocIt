angular.module('LoginCtrl', []).controller('LoginController', function ($scope, Page, User, Email) {
    $scope.formAlias = 'jastan313';
    $scope.formPassword = 'asdasd';

    $scope.loginSubmit = function () {
        var aliasRegex = /^[A-Za-z0-9]{6,15}$/;
        var passwordRegex = /^[A-Za-z0-9$-/:-?{-~!"^_`\[\] ]{6,}$/;
        var aliasFlag = aliasRegex.test($scope.formAlias);
        var passwordFlag = passwordRegex.test($scope.formPassword);
        if (aliasFlag && passwordFlag) {
            User.getByAlias($scope.formAlias).then(function (response) {
                var data = response.data.length === 0 ? null : response.data;
                if (data) {
                    var user = data['0'];
                    if ($scope.formPassword === user.password) {
                        console.log('password match');
                        var userData = {"login_attempts": '0'};
                        User.update(user._id, userData).then(function (response) {
                            $scope.objToString(response.data);
                            Page.setUser(response.data);
                            //$scope.changePage('docboard');
                        });
                    } else {
                        var loginAttempts = (user.login_attempts + 1) === 5 ? '0' : user.login_attempts + 1;
                        var userData = {"login_attempts": loginAttempts};
                        console.log('password not match');
                        User.update(user._id, userData).then(function (response) {
                            var u = response.data;
                            $scope.objToString(u, 0);
                            if (u.login_attempts === 0) {
                                var emailData = {
                                    "from": "|DOCIT| <donotreply@docit.com>",
                                    "to": u.email,
                                    "subject": "|DOCIT| Account Recovery",
                                    "text": "Hello " + u.email + ",\n\n" +
                                            "You have recently attempted multiple logins to |DOCIT| using the wrong credentials. " +
                                            "Fortunately enough, we are able to provide you with your current Alias and password. " +
                                            "Please try to remember your credentials this time:\n\n" +
                                            "Alias: " + u.alias + "\nPassword: " + u.password +
                                            ".\n\nHave a great day and best of luck to your creative writing,\n|DOCIT|"
                                };
                                Email.create(emailData).then(function (response) {
                                    console.log("email sent?");
                                    $scope.displayInfoPopup("Account Recovery",
                                        "The provided Alias and password do not match. Due to  too many unsuccessful login attempts, an email has been sent to |"
                                        + u.alias + "|\'s email address to recover the account. Please check your email for further help.");
                                });
                            } else {
                                $scope.displayInfoPopup("Account Credentials Do Not Match",
                                    "The provided Alias and password do not match. Please verify and enter your credentials again.\nNumber of attempts: (" 
                                    + loginAttempts + "/5).\n\nNote: Upon reaching five (5) unsuccessful attempts, an account recovery email will be sent.");
                            }
                        });
                    }
                } else {
                    $scope.displayInfoPopup("Alias Does Not Exist",
                            "The provided Alias is not associated with any existing account. Please signup by clicking the \"Create\" button.");
                }
            });
        } else {
            if (!aliasFlag) {
                $scope.mainObj.toFocus = "login-alias";
                $scope.displayInfoPopup("Alias Validation",
                        "The Alias you have entered is not valid. Please enter your Alias which \
                    follows this criteria:\n\
                    + Alphanumeric characters [A-Z, a-z, 0-9].\n\
                    + Minimum character length: Six (6).\n\
                    + Maximum character length: Fifteen (15).");
            } else if (!passwordFlag) {
                $scope.mainObj.toFocus = "login-password";
                $scope.displayInfoPopup("Password Validation",
                        "The password you have entered is not valid. Please enter your password \
                    follows this criteria:\n\
                    + Alphanumeric characters [A-Z, a-z, 0-9] allowed.\n\
                    + Special characters [~!@#$%^&*()_+[]{}|=-:;\"\'/?><., ] allowed.\n\
                    + Minimum character length: Six (6).");
            } else {
                $scope.displayInfoPopup("Form Validation",
                        "Oops, |DOCIT| couldn't figure out why the form did not pass validation.");
            }
        }
    }
});