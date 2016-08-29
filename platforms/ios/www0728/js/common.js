/*function onDeviceReady(){
    localStorage.setItem("skip_login", 0);
    StatusBar.styleDefault();
    if(localStorage.getItem("auth_token")){
        localStorage.setItem("skip_login", 1);
    
        if(localStorage.getItem("selected_assignmentid")){
            console.log('skip to home');
            Elite.app.navigate('home', { root: true });
        }else{
            console.log('skip to changerelocation');
            Elite.app.navigate('changerelocation', { root: true });
        }
    }else{
        console.log('go to login page');
        Elite.app.navigate('login', { root: true });
    }
}
*/

var SelOption = function(value, text) {
    this.optValue = value;
    this.optText = text;
}

function formatErrorMessage(jqXHR, exception) {
	if (jqXHR.status == 401 && exception == "Unauthorized"){
		hidePleaseWait();
		logout();
		return;
	}else if (jqXHR.status === 0) {
        return ('Not connected.\nPlease verify your network connection.');
    } else if (jqXHR.status == 404) {
        return ('The requested page not found. [404]');
    } else if (jqXHR.status == 500) {
        return ('Internal Server Error [500].');
    } else if (exception === 'parsererror') {
        return ('Requested JSON parse failed.');
    } else if (exception === 'timeout') {
        return ('Time out error.');
    } else if (exception === 'abort') {
        return ('Ajax request aborted.');
    } else {
        return ('Uncaught Error.\n' + jqXHR.responseText);
    }
}

function validate_neighborhoodscout(){
	
	//var today = moment(new Date()).format("YYYY-MM-DD");
	var user = localStorage.getItem("elite_email");
	//var cleartext = today + " " + user + " " + NS_PARTNER_KEY;
	//console.log("  cleartext: " + cleartext);
	//var fingerprint = md5(cleartext)
	//console.log("fingerprint: " + fingerprint);

	//var url = URL_NEIGHBORHOODSCOUT +"?user="+user+"&fingerprint="+fingerprint+"&partner_name="+NS_PARTNER_NAME;
	var url = URL_NEIGHBORHOODSCOUT +"?email="+user
	console.log(url);
	go_url(url);
}

function validate_culture(){
    var url = URL_CULTURE
//    console.log(url);
    go_url(url);
}

function sendEmail(email){
    console.log('--- send email ---');
    window.plugin.email.open({ to: [email] });
    //EmailComposer.show({to: email});
}

function dateConcat(str1, str2){
	if(str1 && str2){ 
		return formatDate(str1) + " - " + formatDate(str2);
	}
	
	return (formatDate(str1)) ? formatDate(str1) : formatDate(str2);
}

function formatDate(date) {
	if(!date)
		return '';
    var d1 = Date.parse(date);
    var d = new Date(d1);
    var curr_date = d.getDate();
    if (curr_date.toString().length == 1) {
        curr_date = "0" + curr_date;
    }
    var curr_month = d.getMonth();
    curr_month++;
    if (curr_month.toString().length == 1) {
        curr_month = "0" + curr_month;
    }
    var curr_year = d.getFullYear();
    var ret = curr_month + "/" + curr_date + "/" + curr_year;
    return ret;
}

function contactStr(str_arr){
	var ret = "";
	for(i=0; i<str_arr.length; i++){
		if(str_arr[i])
			ret += str_arr[i];
	}
	return ret;
}

function showPleaseWait(){
    if (!$.isFunction($("#loadPanelContainer").dxLoadPanel))
        return;	
	//$("#loadPanelContainer").dxLoadPanel("instance").show();
}
function hidePleaseWait(){
    if (!$.isFunction($("#loadPanelContainer").dxLoadPanel))
        return;	
    //$("#loadPanelContainer").dxLoadPanel("instance").hide();
}

function goPolicy(){
    console.log('go policy');
    window.open(API_PRIVACY_POLICY, '_system', 'location=yes, enableViewportScale=no');
}
function logout(){
	xuser_email = "";
	xuser_token = "";
    localStorage.setItem("auth_token", "");
    localStorage.setItem("first_name", "");
    localStorage.setItem("last_name", "");
    localStorage.setItem("employee_id", "");
	localStorage.setItem("elite_email", "");
	localStorage.setItem("elite_pwd", "");
    localStorage.setItem("selected_assignmentid", "");
    localStorage.setItem("selected_assignment", "");
    
	API_EMPOLOYEES = API_ROOT + "employees/EMPLOYEE_ID";
	API_ASSIGNMENTS = API_ROOT + "assignments/ASSIGNMENT_ID/";

	API_AUTHORIZED_SERVICES = API_ASSIGNMENTS + "authorized_services";
	API_COORDINATOR = API_ASSIGNMENTS + "coordinators";
	API_SHIPMENTS = API_ASSIGNMENTS + "shipments";
	API_HOUSINGS = API_ASSIGNMENTS + "housings";

	/* profile */
	API_PROFILE_SPOUSES = API_ASSIGNMENTS + "spouses";
	API_PROFILE_DEPENDENTS = API_ASSIGNMENTS + "dependents";
	API_PROFILE_CONTACTS = API_ASSIGNMENTS + "contacts";
	API_PROFILE_ADDRESSES = API_ASSIGNMENTS + "addresses";
	API_EXPENSES = API_ASSIGNMENTS + "expenses";
	API_EXPENSE_VOUCHERS = API_ASSIGNMENTS + "expense_vouchers";
	API_EXPENSE_REPORTS = API_ASSIGNMENTS + "expenses";
	API_EXPENSE_ITEMS = API_ASSIGNMENTS + "expense_items";

	API_EXPENSE_REPORTS_SUBMITTED = API_ASSIGNMENTS + "assignment_expense_reports";
	API_EXPENSE_REPORTS_NOTSUBMITTED = API_ASSIGNMENTS + "expense_reports";
	API_EXPENSE_REPORTS_NOTSUBMITTED_SHOW = API_ROOT + "expense_reports";

	API_EXPENSE_CATEGORIES = API_ASSIGNMENTS + "expense_categories";
	API_EXPENSE_ACCOUNTS = API_ASSIGNMENTS + "expense_accounts";

	/* bank */
	API_BANK_ACCOUNTS = API_ASSIGNMENTS + "bank_accounts";
	API_BANK_ACCOUNT_LOCATIONS = API_ROOT + "bank_account_locations";
	API_BANK_ACCOUNT_TYPES = API_ROOT + "bank_account_types";

	/* Experiences */
	API_EXPERIENCES = API_ASSIGNMENTS + "experiences";
	API_EXPERIENCE_CATEGORIES = API_ROOT + "experience_categories";

	/* Home Sale & Purchase */
	API_HOMESALES = API_ASSIGNMENTS + "home_sales";	
	API_HOMESHOWINGS = API_ASSIGNMENTS + "home_showings";
	API_HOMESHOWINGS_DETAIL = API_ROOT + "home_showings";

    $(".dx-slideout.dx-widget").dxSlideOut("instance").option("swipeEnabled", false);
    
    Elite.app.clearState();
	Elite.app.navigate('login', { root: true });
    
}

function go_forgotpwd(){
	go_url(API_FORGOTPWD);
}
function go_url(url){
	window.open(url, '_system', 'location=yes, enableViewportScale=yes');
}

function set_menus(assignment_id, go_home){
	showPleaseWait();
	var api_authorize_menu = API_AUTHORIZED_SERVICES.replace("ASSIGNMENT_ID", assignment_id);
    
    xuser_email = localStorage.getItem("elite_email");
    xuser_token = localStorage.getItem("auth_token");	
	$.ajax({
		url: api_authorize_menu,
		type: 'GET',
		contentType : 'application/json',
		headers: {
		   'X-User-Email' : xuser_email,
		   'X-User-Token' : xuser_token
		},
		error: function(jqXHR, textStatus, errorThrown){
			formatErrorMessage(jqXHR, errorThrown);
		},
		success: function(result){
			hidePleaseWait();
    		console.log(result);
    		
    		if(result && result.length > 0){
    			if(result[0].home_sale == 0){
    				$("#navmenu_homesale").hide();
    			}else{
    				$("#navmenu_homesale").show();
    			}
    			if(result[0].home_purchase == 0){
    				$("#navmenu_homepurchase").hide();
    			}else{
    				$("#navmenu_homepurchase").show();
    			}
    			if(result[0].expenses == 0){
    				$("#navmenu_expensereports").hide();
    				$("#navmenu_receipts").hide();
    				$("#homenav_camerabtn").hide();
    			}else{
    				$("#navmenu_expensereports").show();
    				$("#navmenu_receipts").show();
    				$("#homenav_camerabtn").show();
    			}
    			if(result[0].move_management == 0){
    				$("#navmenu_shipment").hide();
    			}else{
    				$("#navmenu_shipment").show();
    			}
    			if(result[0].temp_housing == 0){
    				$("#navmenu_housing").hide();
    			}else{
    				$("#navmenu_housing").show();
    			}
                if (result[0].to_country != 'USA'){
                    $("#navmenu_culture").show();
                }else{
                    $("#navmenu_culture").hide();
                }
                if (result[0].to_country == 'USA'){
                    $("#navmenu_scout").show();
                }else{
                    $("#navmenu_scout").hide();
                }
           }
	   		if(go_home){
	   			Elite.app.navigate('home', { root: true });
	   		} 	
		}
	});
}
function onOffline(){
	console.log('*** Offline Mode ***');
	if(!$.isFunction($("#offlinePanelContainer").dxLoadPanel))
		return;
	$("#offlinePanelContainer").dxLoadPanel("instance").show();	
	
	//android
	//DevExpress.ui.dialog.alert('Elite Mobile requires an internet connection. Please check for connectivity.', 'Confirm');
	//navigator.app.exitApp(); 
}
function onOnline(){
	console.log('*** Online Mode ***');
	if(!$.isFunction($("#offlinePanelContainer").dxLoadPanel))
		return;
	$("#offlinePanelContainer").dxLoadPanel("instance").hide();	
}


function showNotifySuccess(msg){
	DevExpress.ui.notify(msg, 'success', 3000);
}
function showNotifyFailed(msg){
	DevExpress.ui.notify(msg, 'error', 3000);
}
function showAlertError(msg){
	DevExpress.ui.dialog.alert(msg, 'Error');
}