window.ELITE = window.ELITE || {};
$(function() {
    ELITE.app = new DevExpress.framework.html.HtmlApplication({
        namespace: ELITE,
        commandMapping: ELITE.config.commandMapping,
        layoutSet: DevExpress.framework.html.layoutSets[ELITE.config.layoutSet],
        navigation: ELITE.config.navigation
    });
  	

    // Sets Target Platform for Application to iOS
    DevExpress.devices.current({
        phone: true,
        platform: 'ios'
    });
    // NOTE: turn on ios7 theme
    /*var devices = DevExpress.devices;
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
    }*/

	ELITE.app.router.register(":view", { view: "login"});
    ELITE.app.router.register("shipment/:id", { view: "shipment", id: undefined });
    ELITE.app.router.register("housing/:id", { view: "housing", id: undefined });
	ELITE.app.router.register("profile_dependentsdetail/:dependent_id", { view: "profile_dependentsdetail", dependent_id: undefined });
	ELITE.app.router.register("profile_contactdetail/:contact_id", { view: "profile_contactdetail", contact_id: undefined });
	ELITE.app.router.register("profile_addressdetail/:address_id", { view: "profile_addressdetail", address_id: undefined });
	ELITE.app.router.register("profile_addressedit/:address_id", { view: "profile_addressedit", address_id: undefined });
	ELITE.app.router.register("expensereportdetail_notsubmitted/:id", { view: "expensereportdetail_notsubmitted", id: undefined });
	ELITE.app.router.register("expensereportdetail_submitted/:voucher_id", { view: "expensereportdetail_submitted", voucher_id: undefined });
	ELITE.app.router.register("expenseitemdetail/:id", { view: "expenseitemdetail", id: undefined });
	ELITE.app.router.register("expenseitemcapture/:id", { view: "expenseitemcapture", id: undefined });
	
	ELITE.app.router.register("bankdetail/:bank_id", { view: "bankdetail", bank_id: undefined });
	ELITE.app.router.register("bankedit/:bank_id", { view: "bankedit", bank_id: undefined });
	ELITE.app.router.register("bankedit2/:bank_account_id", { view: "bankedit2", bank_account_id: undefined });
	
	ELITE.app.router.register("givefeedback/:opt", { view: "givefeedback", opt: undefined });
	ELITE.app.router.register("experiencedetail/:id", { view: "experiencedetail", id: undefined });
	ELITE.app.router.register("experienceedit/:id", { view: "experienceedit", id: undefined });
	
	ELITE.app.router.register("homepurchasedetail/:id", { view: "homepurchasedetail", id: undefined });
	ELITE.app.router.register("hoepurchasedetail_notedetail/:id", { view: "hoepurchasedetail_notedetail", id: undefined });
	ELITE.app.router.register("homeshowingadd/:id", { view: "homeshowingadd", id: undefined });

//    ELITE.app.navigate();
    ELITE.app.on("navigating", function(args) {
    	if(args.uri != "login"){
           if(!localStorage.getItem("elite_email")){
               //ELITE.app.navigate('login', { root: true });
           }
       }
   	});
	/*
	ELITE.app.on("viewShown", function(args) {
        if($(".dx-button-back").length){
        	$(".dx-icon-menu.dx-icon").hide(); 
        }    	
	});
	*/
    ELITE.app.on("viewRendered", function(args) {
    	console.log('view rendered');
        //var viewModel = args.model;
        var imageURI = localStorage.getItem('profile_photo');
        console.log('imageURI = ' + imageURI);
        if(imageURI && $.trim(imageURI) != ""){
            //viewModel.profile_photo(imageURI);
            $("#nav_profile_photo").attr('src', imageURI);
        }
    });

});

