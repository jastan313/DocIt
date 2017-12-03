angular.module('SignupCtrl', []).controller('SignupController', function ($scope, Page, User) {
    // Controller initialize
    $scope.init = function () {
        $scope.formEmail = '';
        $scope.formAlias = '';
        $scope.formPassword = '';
        $scope.formPasswordConfirm = '';
    }

    // Submit signup inputs to attempt signup
    $scope.signupSubmit = function () {
        
        // Check if signup is already processing
        if (!$scope.mainCtrl.isProcessing) {
            $scope.mainCtrl.isProcessing = true;
            
            // Regexes to test credential validation
            var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            var aliasRegex = /^[A-Za-z0-9]{6,15}$/;
            var passwordRegex = /^[A-Za-z0-9$-/:-?{-~!"^_`\[\] ]{6,}$/;
            var emailFlag = emailRegex.test($scope.formEmail);
            var aliasFlag = aliasRegex.test($scope.formAlias);
            var passwordFlag = passwordRegex.test($scope.formPassword);
            var passwordMatchFlag = $scope.formPassword === $scope.formPasswordConfirm;
            
            // If form inputs validate
            if (emailFlag && aliasFlag && passwordFlag && passwordMatchFlag) {
                // Attempt to create new user with input data
                var userData = {
                    'alias': $scope.formAlias,
                    'email': $scope.formEmail,
                    'password': $scope.formPassword
                };
                User.create(userData).then(function (response) {
                    var user = response.data;
                    
                    // If there was an error while attempting to create a new user,
                    // compile a message, and display info
                    if (user.errors) {
                        var header = "";
                        var body = "";
                        
                        // If the email was already taken, add info to message
                        if (user.email_error) {
                            header += "Email";
                            body += "Unforunately, there is an existing account with the email address |" + $scope.formEmail + "|.\
                            Please signup using a different email or login to your existing account if this is your email.";
                            $scope.mainCtrl.toFocus = "signup-email";
                        }
                        
                        // If the Alias was already taken, add info to message
                        if (user.alias_error) {
                            var aliasBody = "Unforunately, there is an existing account with the Alias |" + $scope.formAlias + "|.\
                            Please signup using a different Alias or login to your existing account if this is your Alias.";
                            header += header.length !== 0 ? "/Alias" : "Alias";
                            body += body.length !== 0 ? "\n\n" + aliasBody : aliasBody;
                            $scope.mainCtrl.toFocus = "signup-alias";
                        }
                        header += " Taken";
                        $scope.displayInfoPopup(header, body);
                    } 
                    
                    // If creating user was successful, set the user, display
                    // welcome info, and navigate to Docboard
                    else {
                        Page.setUser(user);
                        $scope.displayInfoPopup("Account Signup and Welcome", "Your account has been successfully created.\n\n\
                        Hi, " + Page.getUser().alias + "! Welcome to |DOCIT|, a document-based web \
                        application where writers are encouraged to brainstorm, write, and publish any type \
                        of creative, text-based work anonymously. You may create new Docs, edit drafts until \n\
                        you are satisfied, and publish their finalized form for public viewing and rating.\n\n\
                        |DOCBOARD|: Here is your main hub where you will find two sections, the Doc Archive \
                        and the Doc Feed.\n\nThe Doc Archive is a list of all your saved Docs as well as the option \
                        to start a new Doc draft. Creating a new Doc or selecting an existing Doc that has yet to \
                        be published will direct you to |DOCIT|. Selecting a published Doc will direct you to \
                        |DOCVIEW|.\n\nThe Doc Feed will show you recently published Docs by you and fellow writers, \
                        sorted by highest rating. Selecting any Doc in the Doc Feed will direct you to |DOCVIEW|.\n\n\
                        |DOCIT|: Using Docit, you will have the option to view, edit, save, export, and publish your \
                        Docs.\n\n|DOCVIEW|: Using Docview, you will be able to view and rate published-only Docs.");
                        $scope.changePage('docboard');
                    }
                });
            }
            
            // If form input(s) did not validate, display validation info
            else {
                if (!emailFlag) {
                    $scope.mainCtrl.toFocus = "signup-email";
                    $scope.displayInfoPopup("Email Validation:",
                            "The provided email is not valid. Please enter a valid email.");
                } else if (!aliasFlag) {
                    $scope.mainCtrl.toFocus = "signup-alias";
                    $scope.displayInfoPopup("Alias Validation:",
                            "The provided Alias is not valid. Please enter an Alias with \
                    the following criteria:\n\
                    + Alphanumeric characters [A-Z, a-z, 0-9] allowed.\n\
                    + Minimum character length: Six (6).\n\
                    + Maximum character length: Fifteen (15).");
                } else if (!passwordFlag) {
                    $scope.mainCtrl.toFocus = "signup-password";
                    $scope.displayInfoPopup("Password Validation:",
                            "The provided password is not valid. Please enter a password with \
                    the following criteria:\n\
                    + Alphanumeric characters [A-Z, a-z, 0-9] allowed.\n\
                    + Special characters [~!@#$%^&*()_+[]{}|=-:;\"\'/?><., ] allowed.\n\
                    + Minimum character length: Six (6).");
                } else if (!passwordMatchFlag) {
                    $scope.mainCtrl.toFocus = "signup-password-confirm";
                    $scope.displayInfoPopup("Password Validation:",
                            "The provided passwords do not match. Please confirm and verify the two passwords.");
                } else {
                    $scope.mainCtrl.toFocus = "signup-email";
                    $scope.displayInfoPopup("Form Validation:",
                            "Oops, |DOCIT| couldn't figure out why the form did not pass validation.");
                }
            }
        }
    }
});