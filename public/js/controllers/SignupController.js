angular.module('SignupCtrl', []).controller('SignupControlller', function ($scope, Page, User) {
    $scope.submit = function () {
        var emailRegex = new RegExp('^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$');
        var aliasRegex = new RegExp('^[A-Za-z0-9]{6,15}$');
        var passwordRegex = new RegExp('^[A-Za-z0-9@!#\$\^%&*()+=\-\[\]\\\';,\.\/\{\}\|\":<>\? ]{6,}$');
        if ($scope.formEmail.match(emailRegex) &&
                $scope.formAlias.match(aliasRegex) &&
                $scope.formPassword.match(passwordRegex) &&
                $scope.formPassword === $scope.formPasswordConfirm) {
            User.getByAlias($scope.formAlias).then(function (user) {
                if (user == 'null') {
                    User.getByAlias($scope.formEmail).then(function (user) {
                        if (user == 'null') {
                            var userData = {
                                'alias': $scope.formAlias,
                                'email': $scope.formEmail,
                                'password': $scope.password
                            };
                            User.create(userData).then(function (data) {
                                Page.setUserID(data["id"]);
                                $parent.changePage('docboard');
                            }, function (err) {
                                console.log("Signup User Creation Error: " + err);
                            });
                        } else {
                            console.log("Signup Email Taken Error.");
                        }
                    }, function (err) {
                        console.log("Signup Email Submit Error:" + err);
                    });
                } else {
                    console.log("Signup Alias Taken Error.");
                }

            }, function (err) {
                console.log("Signup Alias Submit Error:" + err);
            });
        } else {
            console.log("Signup Validation Error.");
        }
    }
});