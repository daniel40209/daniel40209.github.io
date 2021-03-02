// var sidebarHandler = {
//     openNav: function() {
//         document.getElementById("sidebar").style.width="26%";
//         document.getElementById("mainweb").style.marginLeft="26%";
//     },
//     closeNav: function() {
//         document.getElementById("sidebar").style.width="0%";
//         document.getElementById("mainweb").style.marginLeft="0%";
//     }
// }

(function () {
    var sidebar = {
        init: function () {
            // this.sidebarHtml();
            this.createSidebarOpen();
            this.eventListener();
            this.localStorageInit();
        },
        createSidebarOpen: function () {
            var mainweb = document.querySelector("div.mainweb");
            var sidebarOpen = document.createElement("button");
            sidebarOpen.className = "sidebarOpen";
            mainweb.appendChild(sidebarOpen);
        },
        openNav: function () {
            document.querySelector("div.sidebar").style.width = "26%";
            document.querySelector("div.mainweb").style.marginLeft = "26%";
            this.store("open", true);
        },
        closeNav: function () {
            document.querySelector("div.sidebar").style.width = "0%";
            document.querySelector("div.mainweb").style.marginLeft = "0%";
            this.store("open", false);
        },
        eventListener: function () {
            var sidebarOpen = document.querySelector("button.sidebarOpen");
            var sidebarClose = document.querySelector("div.sidebarClose");
            sidebarOpen.addEventListener("mouseover", function () { this.openNav() }.bind(this));
            sidebarClose.addEventListener("click", function () { this.closeNav() }.bind(this));
        },
        store: function (namespace, data) {
            if (arguments.length > 1) {
                return localStorage.setItem(namespace, data);
            } else {
                var store = localStorage.getItem(namespace);
                return store
            }
        },
        localStorageInit: function () {
            var checker = this.store("open");
            if (checker === "true") {
                this.openNav();
            } else {
                this.closeNav();
            }
        },
        //Inject everything on html thats copy and pasted. More organized.
        // sidebarHtml: function () {
        //     var sideBar = documnet.createElement('div');

        // }
    }
    sidebar.init();
})()
