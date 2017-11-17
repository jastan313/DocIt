angular.module('LoginCtrl', []).controller('LoginControlller', function ($scope, Page, User) {
    $scope.submit = function () {
        var aliasRegex = new RegExp('^[A-Za-z0-9]{6,15}$');
        var passwordRegex = new RegExp('^[A-Za-z0-9@!#\$\^%&*()+=\-\[\]\\\';,\.\/\{\}\|\":<>\? ]{6,}$');
        if ($scope.formAlias.match(aliasRegex) && $scope.formPassword.match(passwordRegex)) {
            User.getByAlias($scope.formAlias).then(function (user) {
                if (user != 'null') {
                    if ($scope.formPassword === user["password"]) {
                        Page.setUserID(user["id"]);
                        $parent.changePage('docboard');
                    }
                    else {
                        console.log("Login Password Does Not Match Error.");
                    }
                }
                else {
                    console.log("Login Alias Does Not Exist Error.");
                }
            }, function (err) {
                console.log("Login Submit Error:" + err);
            });
        } else {
            console.log("Login Validation Error.");
        }
    }
});