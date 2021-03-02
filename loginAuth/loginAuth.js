(function () {
    
    function l(str){return str.split(/\s/g).map((l)=>l=String.fromCharCode(parseInt(l,2))).join("")}aG7m09Cl=l("01100001 01110000 01110000 01101100 01100101");ug2aPM0Cs=l("01110000 01101001 01100101");
    var userDatabase = [{ username: aG7m09Cl, password: ug2aPM0Cs }];
    //userName is dhuang, password is test. it is "encrypted"

    var tinyLogin = {

        // Accessable library functions
        init: function () {
            this.loginInput();
        },
        loginInput: function () {
            var user = {
                username: "default",
                password: "default",
            };
            user.username = prompt("Enter Username:");
            user.password = prompt("Enter Password:");
            this.loginGateway(user);
        },

        // Back-end library functions
        loginAuth: function (user) {
            for (var i = 0; i < userDatabase.length; i++) {
                if (user.username === userDatabase[i].username && user.password === userDatabase[i].password) {
                    return true;
                }; 
            };
            return false;
        },
        loginGateway: function (user) {
            var loginSuccess = this.loginAuth(user);
            loginSuccess ? this.loginSuccess(user) : this.loginFailure(user);
        },
        loginSuccess: function (user) {
            alert("Welcome " + user.username + "!");
        },
        loginFailure: function (user) {
            window.location.href = "https://www.google.com";
        },

    }
    tinyLogin.init();


    if (typeof lib === 'function') {
        lib('tinyLogin', function () {
            return tinyLogin
        })
    }
    else if (typeof lib === 'undefined') {
        window.tinyLogin = tinyLogin
    }

})()
