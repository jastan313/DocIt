window.onload = function () {
    var loginNavBtn = document.getElementById('login-navigation-btn');
    var signupNavBtn = document.getElementById('signup-navigation-btn');
    if (loginNavBtn) {
        loginNavBtn.addEventListener('click', function () {
            window.location.href = '../views/signup_template.html';
        });
    }
    if (signupNavBtn) {
        signupNavBtn.addEventListener('click', function () {
            window.location.href = '../views/login_template.html';
        });
    }
}
;