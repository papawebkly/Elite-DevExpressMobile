Elite.home = function(params) {
    var viewModel = {
		header_items: { 
			'align': 'right', 
			'template': 'nav-camera', 
			'action': '#expenseitemcapture/0'
		},/*
		galleryData: [
			{'title': 'How is your relocation going?'},
			{'title': 'Under Progress'},
			{'title': 'Under Progress'},
			{'title': 'Under Progress'},
			{'title': 'Under Progress'},
			{'title': 'Under Progress'}
		],*/
		coordinator: [{
			full_name: ko.observable(''),
            country_city:ko.observable(''),
		}],
		expenses_list: [
			/*{
				'expense_name': 'San Jose Cafe',
				'expense_price': '$12.99'
			},
			{
				'expense_name': 'San Francisco Yellow',
				'expense_price': '$100.00'
			},
			{
				'expense_name': 'Mission Temporary',
				'expense_price': '$565.00'
			}*/
		],
        expenseitemslist_data : ko.observable(),
        viewShown: function(){
            $(".dx-icon-menu.dx-icon").show(); 
            $(".dx-slideout.dx-widget").dxSlideOut("instance").option("swipeEnabled", true);
            
            set_menus(localStorage.getItem("selected_assignmentid"), 0);

            if(localStorage.getItem("skip_login") == 1){
            	localStorage.setItem("skip_login", 0);
            }
        },
        viewShowing: function(){
        	console.log('Home - viewshowing');
            $(".dx-active-view").removeClass("login-bg-page");
            $(".layout-header").addClass("changerelocation-header-bg");
            $(".dx-scrollable-content").addClass("changerelocation-body-bg");
        	/* ---- test code ---- */
			/*
        		localStorage.setItem("elite_email", "ckline@bristolglobal.com");
        		localStorage.setItem("auth_token", "p-11YHTkWcU1dy8kBLaF");
        		localStorage.setItem("selected_assignmentid", 15783);
        		localStorage.setItem('employee_id', 31726);
        		var assignment_data = {"id":15783,"employee_id":31726,"relocation_policy_id":731,"coordinator_id":434,"company_id":101,"assignment_status":"Active","to_city":"Tarpon Springs","to_country":"USA","to_location":"Tarpon Springs, USA","from_city":"Highlands Ranch","from_country":"USA","from_location":"Highlands Ranch, USA","authorized_services":{"assignment_id":15783,"home_sale":1,"home_purchase":1,"expenses":1,"move_management":1,"temp_housing":1},"coordinator":{"id":434,"full_name":"Micheal Henderson, CRP","email":"MHenderson@bristolglobal.com","phone":"920-884-1033","mobile":null,"fax":"920-661-9333","address_line_1":"445 Cardinal Lane, Suite 102","address_line_2":null,"city":"Green Bay","state_province_code":"US-WI","postal_code":"54313","state":"WI","country_2char_code":"US"}};
        		localStorage.setItem("selected_assignment", JSON.stringify(assignment_data));
             */
				
        	/* ----------------------------------------------------------*/
        	
        	
            xuser_email = localStorage.getItem("elite_email");
            xuser_token = localStorage.getItem("auth_token");
            
            var assignment = localStorage.getItem("selected_assignment");
            console.log(assignment);
            assignment = $.parseJSON(assignment);
            viewModel.coordinator[0].full_name((assignment.coordinator)?assignment.coordinator.full_name:'');
            localStorage.setItem("full_name", assignment.coordinator.full_name);

            viewModel.coordinator[0].country_city((assignment.coordinator)?assignment.coordinator.city + ", "+assignment.coordinator.country_2char_code:'');
            
            API_ASSIGNMENTS = API_ASSIGNMENTS.replace("ASSIGNMENT_ID", localStorage.getItem("selected_assignmentid"));
            API_COORDINATOR = API_COORDINATOR.replace("ASSIGNMENT_ID", localStorage.getItem("selected_assignmentid"));
            API_SHIPMENTS = API_SHIPMENTS.replace("ASSIGNMENT_ID", localStorage.getItem("selected_assignmentid"));
            API_HOUSINGS = API_HOUSINGS.replace("ASSIGNMENT_ID", localStorage.getItem("selected_assignmentid"));
            API_PROFILE_SPOUSES = API_PROFILE_SPOUSES.replace("ASSIGNMENT_ID", localStorage.getItem("selected_assignmentid"));
            API_PROFILE_DEPENDENTS = API_PROFILE_DEPENDENTS.replace("ASSIGNMENT_ID", localStorage.getItem("selected_assignmentid"));
            API_PROFILE_CONTACTS = API_PROFILE_CONTACTS.replace("ASSIGNMENT_ID", localStorage.getItem("selected_assignmentid"));
            API_PROFILE_ADDRESSES = API_PROFILE_ADDRESSES.replace("ASSIGNMENT_ID", localStorage.getItem("selected_assignmentid"));
            API_EXPENSES = API_EXPENSES.replace("ASSIGNMENT_ID", localStorage.getItem("selected_assignmentid"));
            API_EXPENSE_VOUCHERS = API_EXPENSE_VOUCHERS.replace("ASSIGNMENT_ID", localStorage.getItem("selected_assignmentid"));
            API_EXPENSE_REPORTS = API_EXPENSE_REPORTS.replace("ASSIGNMENT_ID", localStorage.getItem("selected_assignmentid"));
            API_EXPENSE_ITEMS = API_EXPENSE_ITEMS.replace("ASSIGNMENT_ID", localStorage.getItem("selected_assignmentid"));
            API_EXPENSE_REPORTS_SUBMITTED = API_EXPENSE_REPORTS_SUBMITTED.replace("ASSIGNMENT_ID", localStorage.getItem("selected_assignmentid"));
            API_EXPENSE_REPORTS_NOTSUBMITTED = API_EXPENSE_REPORTS_NOTSUBMITTED.replace("ASSIGNMENT_ID", localStorage.getItem("selected_assignmentid"));
            
            API_EXPENSE_CATEGORIES = API_EXPENSE_CATEGORIES.replace("ASSIGNMENT_ID", localStorage.getItem("selected_assignmentid"));
            API_EXPENSE_ACCOUNTS = API_EXPENSE_ACCOUNTS.replace("ASSIGNMENT_ID", localStorage.getItem("selected_assignmentid"));
            
            API_BANK_ACCOUNTS = API_BANK_ACCOUNTS.replace("ASSIGNMENT_ID", localStorage.getItem("selected_assignmentid"));
            API_EXPERIENCES = API_EXPERIENCES.replace("ASSIGNMENT_ID", localStorage.getItem("selected_assignmentid"));
            API_HOMESHOWINGS = API_HOMESHOWINGS.replace("ASSIGNMENT_ID", localStorage.getItem("selected_assignmentid"));
                        
            API_HOMESALES = API_HOMESALES.replace("ASSIGNMENT_ID", localStorage.getItem("selected_assignmentid"));
            API_SPOUSE_RELATIONSHIPS = API_SPOUSE_RELATIONSHIPS.replace("ASSIGNMENT_ID", localStorage.getItem("selected_assignmentid"));
            console.log("ASSIGNMENT_ID = " + localStorage.getItem("selected_assignmentid"));
            console.log(localStorage.getItem("auth_token"));
            console.log('API_AUTHORIZED_SERVICES = ' + API_AUTHORIZED_SERVICES);
            viewModel.expenseitemslist_data(new DevExpress.data.DataSource({
                store: expenseitems_store
            }));
            hidePleaseWait();
        }
    };
    return viewModel;
};			

function add_new_expenses(){
	console.log('add new');
}

function onGetPhotoSuccess(imageData) {
    console.log('on get photo success');
    var image = document.getElementById('');
    $("#coordinator_photo").attr('src', '');
    $(".coordinator-avatar").addClass("purple-border");
    $("#coordinator_photo").attr('src', "data:image/jpeg;base64," + imageData);
}

function onGetPhotoFail(message) {
    console.log('Failed because: ' + message);
}