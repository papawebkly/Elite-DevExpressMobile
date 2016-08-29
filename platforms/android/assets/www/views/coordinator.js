ELITE['coordinator'] = function (params) {
    var viewModel = {
		header_items: { 
			'align': 'right', 
			'id': 'coordinator_addbtn',
			'template': 'nav-addcontact', 
			'action': function(){
                viewModel.addContacts();
			}
		},
        full_name: ko.observable(''),
        email: ko.observable(''),
        phone: ko.observable(''),
        mobile: ko.observable(''),
        fax: ko.observable(''),
        after_hours: ko.observable(''),
        address_line_1: ko.observable(''),
        address_line_2: ko.observable(''),
        address_city_state_zip: ko.observable(''),
        city: ko.observable(''),
        postal_code: ko.observable(''),
        country_code: ko.observable(''),
        region: ko.observable(''),
        	
        callPhone: function() {
        	//var phone_number = this.phone().replace(/[^\d]/g,'');
            window.location.href='tel:' + this.phone();
        },
        callMobile: function() {
        	//var mobile_number = this.mobile().replace(/[^\d]/g,'');
        	window.location.href='tel:' + this.mobile();
        },
        emailMe: function() {
            sendEmail(this.email());
        },
        sendNewMsg: function(){
            sendEmail(this.email());
        },
        pullDownActionFunction: function(actionOptions){
			var user_email = localStorage.getItem("elite_email");
			var user_token = localStorage.getItem("auth_token");        	
			console.log(API_EMPOLOYEES);
            $.ajax({
	            url: API_EMPOLOYEES,
	            type: 'GET',
	            contentType : 'application/json',
        		headers: {
        			'X-User-Email' : user_email,
					'X-User-Token' : user_token
				},
				error: function(jqXHR, textStatus, errorThrown){
					formatErrorMessage(jqXHR, errorThrown);
				},
	            success: function(result, textStatus, jqXhr) {
	            	console.log('--success--');
	            	console.log(result.assignments);
	            	
					var assignment_id = localStorage.getItem("selected_assignmentid");
					if(result.assignments.length){
						$.each(result.assignments, function(index, row){
							if(row.id == assignment_id){
								localStorage.setItem("selected_assignment", JSON.stringify(row));
								return false;
							}
						});
					}	            	
		            var assignment = localStorage.getItem("selected_assignment");
		            var data = $.parseJSON(assignment).coordinator;
		            console.log(assignment);		            
		            viewModel.updateData(data);		            	
		            actionOptions.component.release();			
	            }
			});			    					    		
        },
        addContacts: function(){
            console.log('add contacts');
            // specify contact search criteria
            var options = new ContactFindOptions();
            // find contacts
            options.filter = this.email();
            console.log(navigator.contacts);
            navigator.contacts.find(["emails"], viewModel.onContactFindSuccess, viewModel.onContactFindError, options);
        },
	    onContactFindSuccess: function(contacts) {
	        // success callback
            console.log('contact find success');
	        if(contacts && contacts.length){
	            console.log('The contact already exists');
	            var con = DevExpress.ui.dialog.confirm("The contact already exists, Do you want to update?", "Confirm");
                con.done(function (dialogResult) {
                    if(dialogResult){
                        //update
                        console.log('remove contact');
                        contacts[0].remove(); //remove current contact
                    }
                    viewModel.addNewContact();
                    return;
                });
	        }else{
                console.log('call add new contact');
                viewModel.addNewContact();
            }
        },
	    onContactFindError: function(contactError) {
	        // error callback
            console.log('ERROR - onContactFindError!');
            viewModel.addNewContact();
	    },
        addNewContact: function(){
            console.log('add new contact');
            // create
            console.log(this.full_name());
            var full_name = this.full_name();
            var contact = navigator.contacts.create({"displayName": full_name});
            
            var temp = full_name.split(' ');
            contact.note = "Bristol Mobility Advisor";
            contact.nickname = full_name;                 // specify both to support all devices
            
            var name = new ContactName();
            name.givenName = temp[0];
            name.familyName = temp[1];
            contact.name = name;
            
            var phoneNumbers = [];
            phoneNumbers[0] = new ContactField('work', this.phone(), false);
            phoneNumbers[1] = new ContactField('mobile', this.mobile(), true); // preferred number
            contact.phoneNumbers = phoneNumbers;
            
            contact.emails = [new ContactField('work', this.email(), true)];
            contact.addresses = [new ContactAddress(
                true,
                "work",
                null,
                this.address_line_1(),
                this.address_line_2(),
				this.city(),
                this.region(),
                this.postal_code(),
                this.country_code()
            )];
            // save
            contact.save(onSaveContactSuccess, onSaveContactError);
        },
        viewShowing: function(){
        	//initializaition
			viewModel.full_name('');
            viewModel.email('');
            viewModel.phone('');
            viewModel.mobile('');
            viewModel.fax('');
            viewModel.address_line_1('');
            viewModel.address_line_2('');
            viewModel.address_city_state_zip('');
            
            viewModel.city('');
            viewModel.postal_code('');
            viewModel.country_code('');
            viewModel.region('');
        },
        updateData: function(data){
			if(data.full_name)
            	viewModel.full_name(data.full_name);
            if(data.email)
            	viewModel.email(data.email);
            if(data.phone)
            	viewModel.phone(data.phone);
            if(data.mobile)
            	viewModel.mobile(data.mobile);
            if(data.fax)
            	viewModel.fax(data.fax);
            if(data.address_line_1)
            	viewModel.address_line_1(data.address_line_1);
            if(data.address_line_2)
            	viewModel.address_line_2(data.address_line_2);
            if(data.city || data.state || data.postal_code)
            	viewModel.address_city_state_zip(contactStr(Array(data.city, ", ", data.state, " ", data.postal_code)));
            
            if(data.city)
            	viewModel.city(data.city);
            if(data.postal_code)
            	viewModel.postal_code(data.postal_code);
            if(data.country_2char_code)
            	viewModel.country_code(data.country_2char_code);
            if(data.state)
            	viewModel.region(data.state);
        },
        viewShown: function(){
            console.log('-------------------------------------------------------------');
            console.log('assignment id = ' +localStorage.getItem("selected_assignmentid"));
            console.log('token = ' + localStorage.getItem("auth_token"));
            console.log('employee id = ' + localStorage.getItem('employee_id'));
            
			//showPleaseWait();
			var user_email = localStorage.getItem("elite_email");
			var user_token = localStorage.getItem("auth_token");
            
            console.log(API_COORDINATOR);
            var assignment = localStorage.getItem("selected_assignment");
            var data = $.parseJSON(assignment).coordinator;
            console.log(assignment);
            
			viewModel.updateData(data);
            /*
			$.ajax({
				url: API_COORDINATOR + "/1",
				dataType: 'json',
				processData: false,
				contentType : 'application/json',
				headers: {
					'X-User-Email': user_email,
					'X-User-Token': user_token
				},
				error: function(jqXHR, textStatus, errorThrown){
					formatErrorMessage(jqXHR, errorThrown);
				},
				success: function(data) {
					console.log(data);
                    //viewModel.first_name(data.first_name);
                    //viewModel.last_name(data.last_name);
		            viewModel.full_name(data.full_name);
		            viewModel.email(data.email);
		            viewModel.phone(data.phone);
		            viewModel.mobile(data.mobile);
		            viewModel.fax(data.fax);
		            viewModel.address_line_1(data.address_line_1);
		            viewModel.address_line_2(data.address_line_2);
		            viewModel.address_city_state_zip(data.city + " " + data.postal_code);
		            
                    viewModel.city(data.city);
                    viewModel.postal_code(data.postal_code);
                    viewModel.country_code(data.country_code);
                    viewModel.region(data.state_province_code);
		            hidePleaseWait();
				},
				error: function(data, textStatus, jqXHR) {
					hidePleaseWait();
					var error_msg = formatErrorMessage(data, jqXHR);
					showAlertError(error_msg);
				}
			});  */
        }
    };

    return viewModel;	
};

function onSaveContactSuccess(){
    showNotifySuccess("The contact has saved successfully.");
}
function onSaveContactError(){
    showNotifyFailed("Adding the contact failed!.");

}

