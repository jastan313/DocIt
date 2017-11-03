window.onload = function () {
    var loginToSignupBtn = document.getElementById('login-tosignup-btn');
    var signupToLoginBtn = document.getElementById('signup-tologin-btn');
    var docitDirBtn = document.getElementById('docit-directory-btn');
    var docitDirectory = document.getElementById('docit-directory');
    var docitDirSaveBtn = document.getElementById('docit-directory-save-btn');
    var docitDirToDocboardBtn = document.getElementById('docit-directory-todocboard-btn');
    var docitDirLogoutBtn = document.getElementById('docit-directory-logout-btn');
    if (loginToSignupBtn) {
        loginToSignupBtn.addEventListener('click', function () {
            window.location.href = '../views/signup_template.html';
        });
    }
    if (signupToLoginBtn) {
        signupToLoginBtn.addEventListener('click', function () {
            window.location.href = '../views/login_template.html';
        });
    }
    if (docitDirBtn) {
        docitDirBtn.addEventListener('click', function () {
            docitDirBtn.style.display = "none";
            docitDirectory.style.display = "inherit";
        });
    }
    if (docitDirSaveBtn) {
        docitDirSaveBtn.addEventListener('click', function () {
            docitDirBtn.style.display = "inherit";
            docitDirectory.style.display = "none";
        });
    }
    if (docitDirToDocboardBtn) {
        docitDirToDocboardBtn.addEventListener('click', function () {
            window.location.href = '../views/docboard_template.html';
        });
    }
    if (docitDirLogoutBtn) {
        docitDirLogoutBtn.addEventListener('click', function () {
            window.location.href = '../views/login_template.html';
        });
    }
}
;