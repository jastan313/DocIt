window.onload = function () {
    var loginToSignupBtn = document.getElementById('login-tosignup-btn');
    var signupToLoginBtn = document.getElementById('signup-tologin-btn');
    var docContainer = document.getElementById('doc-container');
    
    var docitDirBtn = document.getElementById('docit-directory-btn');
    var docitDirectory = document.getElementById('docit-directory');
    var docitDirSaveBtn = document.getElementById('docit-directory-save-btn');
    var docitDirDeleteBtn = document.getElementById('docit-directory-delete-btn');
    var docitDirToDocboardBtn = document.getElementById('docit-directory-todocboard-btn');
    var docitDirLogoutBtn = document.getElementById('docit-directory-logout-btn');

    var docviewDirBtn = document.getElementById('docview-directory-btn');
    var docviewDirectory = document.getElementById('docview-directory');
    var docviewDirEditBtn = document.getElementById('docview-directory-edit-btn');
    var docviewDirToDocboardBtn = document.getElementById('docview-directory-todocboard-btn');
    var docviewDirLogoutBtn = document.getElementById('docview-directory-logout-btn');

    window.addEventListener('click', function (e) {
        if (docitDirBtn)
            docitDirBtn.style.display = "inherit";
        if (docitDirectory)
            docitDirectory.style.display = "none";

        if (docviewDirBtn)
            docviewDirBtn.style.display = "inherit";
        if (docviewDirectory)
            docviewDirectory.style.display = "none";
    });
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
        docitDirBtn.addEventListener('click', function (e) {
            docitDirBtn.style.display = "none";
            docitDirectory.style.display = "inherit";
            e.stopPropagation();
        });
    }
    if (docitDirSaveBtn) {
        docitDirSaveBtn.addEventListener('click', function (e) {
            docitDirBtn.style.display = "inherit";
            docitDirectory.style.display = "none";
            e.stopPropagation();
        });
    }
    if (docitDirDeleteBtn) {
        docitDirSaveBtn.addEventListener('click', function (e) {
            docitDirBtn.style.display = "inherit";
            docitDirectory.style.display = "none";
            e.stopPropagation();
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

    if (docviewDirBtn) {
        docviewDirBtn.addEventListener('click', function (e) {
            docviewDirBtn.style.display = "none";
            docviewDirectory.style.display = "inherit";
            e.stopPropagation();
        });
    }
    if (docviewDirEditBtn) {
        docviewDirEditBtn.addEventListener('click', function (e) {
            docviewDirBtn.style.display = "inherit";
            docviewDirectory.style.display = "none";
            e.stopPropagation();
        });
    }
    if (docviewDirToDocboardBtn) {
        docviewDirToDocboardBtn.addEventListener('click', function () {
            window.location.href = '../views/docit_template.html';
        });
    }
    if (docviewDirLogoutBtn) {
        docviewDirLogoutBtn.addEventListener('click', function () {
            window.location.href = '../views/login_template.html';
        });
    }
}
;