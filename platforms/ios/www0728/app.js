window.Elite = window.Elite || {};
$(function() {
    // Uncomment the line below to disable platform-specific look and feel and to use the Generic theme for all devices
    // DevExpress.devices.current({ platform: "generic" });

    document.addEventListener("deviceready", onDeviceReady, false);
    Elite.app = new DevExpress.framework.html.HtmlApplication({
        namespace: Elite,
        commandMapping: Elite.config.commandMapping,
        layoutSet: DevExpress.framework.html.layoutSets[Elite.config.layoutSet],
        navigation: getNavigationItems(),
        templatesVersion: "4"
    });

  // Sets Target Platform for Application to iOS
  DevExpress.devices.current({
        phone: true,
        platform: 'ios'
    });
  
  // NOTE: turn on ios7 theme
  var devices = DevExpress.devices;
  if(devices.current().platform === "ios") {
        $(".dx-viewport")
        //.removeClass("dx-theme-ios")
  
        .addClass("dx-theme-ios")
        .addClass("dx-theme-ios7")
        .removeClass("dx-version-major-5")
        .addClass("dx-version-major-7")
        .addClass("dx-theme-generic");
  }else if(devices.current().platform === "android") {
        $(".dx-viewport")
        .removeClass("dx-color-scheme-holo-dark")
        .removeClass("dx-version-major-5")
        .removeClass("dx-version-major-5")
        .addClass("dx-theme-ios")
        .addClass("dx-theme-ios7")
        .addClass("dx-version-major-7")
  }
  
  //Elite.app.router.register(":view/:id", { view: "Home", id: undefined });
  Elite.app.router.register(":view", { view: "login"});
  Elite.app.router.register("shipment/:id", { view: "shipment", id: undefined });
  Elite.app.router.register("housing/:id", { view: "housing", id: undefined });
  Elite.app.router.register("profile_dependentsdetail/:dependent_id", { view: "profile_dependentsdetail", dependent_id: undefined });
  Elite.app.router.register("profile_contactdetail/:contact_id", { view: "profile_contactdetail", contact_id: undefined });
  Elite.app.router.register("profile_addressdetail/:address_id", { view: "profile_addressdetail", address_id: undefined });
  Elite.app.router.register("profile_addressedit/:address_id", { view: "profile_addressedit", address_id: undefined });
  Elite.app.router.register("expensereportdetail_notsubmitted/:id", { view: "expensereportdetail_notsubmitted", id: undefined });
  Elite.app.router.register("expensereportdetail_submitted/:voucher_id", { view: "expensereportdetail_submitted", voucher_id: undefined });
  Elite.app.router.register("expenseitemdetail/:id", { view: "expenseitemdetail", id: undefined });
  Elite.app.router.register("expenseitemcapture/:id", { view: "expenseitemcapture", id: undefined });
  
  Elite.app.router.register("bankdetail/:bank_id", { view: "bankdetail", bank_id: undefined });
  Elite.app.router.register("bankedit/:bank_id", { view: "bankedit", bank_id: undefined });
  Elite.app.router.register("bankedit2/:bank_account_id", { view: "bankedit2", bank_account_id: undefined });
  
  Elite.app.router.register("givefeedback/:opt", { view: "givefeedback", opt: undefined });
  Elite.app.router.register("experiencedetail/:id", { view: "experiencedetail", id: undefined });
  Elite.app.router.register("experienceedit/:id", { view: "experienceedit", id: undefined });
  
  Elite.app.router.register("homepurchasedetail/:id", { view: "homepurchasedetail", id: undefined });
  Elite.app.router.register("hoepurchasedetail_notedetail/:id", { view: "hoepurchasedetail_notedetail", id: undefined });
  Elite.app.router.register("homeshowingadd/:id", { view: "homeshowingadd", id: undefined });
  
    if(DevExpress.devices.real().platform === "win") {
        $("body").css("background-color", "#000");
    }

    function showMenu(e) {
        Elite.app.off("viewShown", showMenu);
  alert(e.viewInfo.viewName);
        if (e.viewInfo.viewName !== "login")
            return;

        setTimeout(function() {
            $(".nav-button").trigger("dxclick");
        }, 1000);
    }
    
    function getNavigationItems() {
        if (DevExpress.devices.current().platform === "win") {
            Elite.config.navigation.push({
                "title": "Panorama",
                "onExecute": "#Panorama",
                "icon": "panorama"
            },
            {
                "title": "Pivot",
                "onExecute": "#Pivot",
                "icon": "pivot"
            });
        } else {
            Elite.config.navigation.splice(5, 0, {
                "title": "Navigation",
                "onExecute": "#Navigation",
                "icon": "arrowright"
            });
        }
        return Elite.config.navigation;
    }

    function exitApp() {
        switch(DevExpress.devices.current().platform) {
            case "android":
                navigator.app.exitApp();
                break;
            case "win":
                MSApp.terminateApp('');
                break;
        }
    }

    function onDeviceReady() {
        if (window.devextremeaddon != null) {
            window.devextremeaddon.setup();
        }
  
        localStorage.setItem("skip_login", 0);
        if(localStorage.getItem("auth_token")){
            localStorage.setItem("skip_login", 1);
  alert("1");
            if(localStorage.getItem("selected_assignmentid")){
                console.log('skip to home');
                Elite.app.navigate('home', { root: true });
            }else{
                console.log('skip to changerelocation');
                Elite.app.navigate('changerelocation', { root: true });
            }
        }else{
  alert("2");

            console.log('go to login page');
            Elite.app.navigate('login', { root: true });
        }
  
  
        navigator.splashscreen.hide();
    }

    function onBackButton() {
        DevExpress.processHardwareBackButton();
    }

    //Elite.app.on("viewShown", showMenu);
    Elite.app.navigate('login', { root: true });
});
