Elite['profile_addressedit'] = function (params) {
	viewModel = {
		lookupLocationTypes: ko.observableArray(),
		lookupStateProvinces: ko.observableArray(),
		lookupCountries: ko.observableArray(),

		header_items: { 
			'align': 'right', 
			'template': 'nav-text', 
			'title': 'Edit',
			'id': 'profileaddress_editbtn',
			'action': setEditable
		},
		updatable: ko.observable(0),
		readonly: ko.observable(true),
		disableStates: ko.observable(true),
				
        update_profileaddress: function() {
        	var address_id = viewModel.address_id();
        	
        	var executable = true;
        	if(!viewModel.location_type_code()){
        		executable = false;
        		msg = "Please select a location type.";
        	}else if(!viewModel.address_line_1()){
        		executable = false;
        		msg = "Please input the address line 1.";
        	}else if(!viewModel.city()){
        		executable = false;
        		msg = "Please input the city.";
        	}else if(!viewModel.state_code()){
        		executable = false;
        		msg = "Please select a state.";
        	}else if(!viewModel.country_code()){
        		executable = false;
        		msg = "Please select a country.";
        	}else if(!viewModel.postal_code()){
        		executable = false;
        		msg = "Please input the postal code.";
        	}
        	if(executable == false){
        		showAlertError(msg);
        		return;
        	}        	
            var processed_data = {
                /*"address_id": ((parseInt(address_id) == 0) ? 3 : address_id), */
                "assignment_id": localStorage.getItem("selected_assignmentid"),
                "address_line_1": viewModel.address_line_1(),
                "address_line_2": viewModel.address_line_2(),
                "address_line_3": viewModel.address_line_3(),
                "location_type_code": viewModel.location_type_code(),
                "begin_date": viewModel.begin_date(),
                "end_date": viewModel.end_date(),
                "primary_address": viewModel.primary(),
                "city": viewModel.city(),
                "state_code": viewModel.state_code(),
                "country_code": viewModel.country_code(),
                "postal_code": viewModel.postal_code()
            };
            //update: PATCH, create: POST
            if(parseInt(address_id) > 0){
            	//update
            	console.log(processed_data);
                processed_data.address_id = address_id;
                addresses_store.update(address_id, processed_data);
            }else{
            	console.log(processed_data);
            	addresses_store.insert(processed_data);
            }              	
        },			
			
		address_line_1: ko.observable(''),
		address_line_2: ko.observable(''),
		address_line_3: ko.observable(''),
		begin_date: ko.observable(''),
		end_date: ko.observable(''),
		city: ko.observable(''),
		country_code: ko.observable(''),
		location_type: ko.observable(''),
		location_type_code: ko.observable(''),
		postal_code: ko.observable(''),
		primary: ko.observable('EQFALSE'),
		primary_text: ko.observable(""),
		state: ko.observable(''),
		state_code: ko.observable(''),

		city_state: ko.observable(''),
		country_zip: ko.observable(''),
		loc: ko.observable(''),
		address_id: ko.observable(''),
		editableState: ko.computed(function() {
	        if(this.readonly == false && this.country_code != null)
	        	return 1;
        	return 0;
	    }),
	    processValueChange: function(){
	    	var country_code = this.country_code();
	    	var stateprovinces_url = API_STATE_PROVINCES + "/search?country_code="+country_code;
	    	console.log(stateprovinces_url);
	    	showPleaseWait();
			$.ajax({
				url: stateprovinces_url,
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
					viewModel.lookupStateProvinces(result);
					
		            if(!viewModel.country_code())
		            	viewModel.disableStates(true);
		            else
		            	viewModel.disableStates(false);
		            
					hidePleaseWait();
				}
			});
	    },
	    viewShowing: function(){
			this.address_line_1('');
			this.address_line_2('');
			this.address_line_3('');
			this.begin_date('');
			this.end_date('');
			this.city('');
			this.country_code('');
			this.location_type('');
			this.location_type_code('');
			this.postal_code('');
			this.primary('EQFALSE');
			this.primary_text("");
			this.state('');
			this.state_code('');

			this.city_state('');
			this.country_zip('');
			this.loc('');
			
			this.disableStates(true);
	    },
        viewShown: function(){
        	end = 0;
        	showPleaseWait();
        	viewModel.lookupStateProvinces('');
        	if(params.address_id == 0){
				all_loaded = 2;
        		//show screen to create a new dependent
        		viewModel.address_id(0);
                viewModel.readonly(false);
                viewModel.updatable(1);
	            $("#profileaddress_editbtn").hide();
        	}else{
                viewModel.readonly(true);
                viewModel.updatable(0);
        		$("#profileaddress_editbtn .dx-button-text").text("Edit");
        		
        		all_loaded = 3;
	        	//show screen to update the dependent
	        	viewModel.address_id(params.address_id);
	        	console.log("View Shown Address ID: "+params.address_id);	        	
				
	        	addresses_store.byKey(params.address_id).done(function(data){
					console.log(data);
					viewModel.address_line_1(data.address_line_1);
					viewModel.address_line_2(data.address_line_2);
					viewModel.address_line_3(data.address_line_3);
					if(data.begin_date)
						viewModel.begin_date(new Date(data.begin_date));
					if(data.end_date)
						viewModel.end_date(new Date(data.end_date));
					viewModel.city(data.city);
					viewModel.country_code(data.country_code);
					viewModel.location_type(data.location_type);
					viewModel.location_type_code(data.location_type_code);
					viewModel.postal_code(data.postal_code);
					viewModel.primary(data.primary);
					viewModel.primary_text((data.primary == 'EQTRUE') ? "Yes" : "No");
					viewModel.state_code(data.state_code);	
					
					if(data.country_code){
						$.ajax({
							url: API_STATE_PROVINCES + "/search?country_code="+data.country_code,
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
				        		viewModel.lookupStateProvinces(result);
				        		end++;
				        		readyStart();
							}
						});
					}else{
						end++;			
						readyStart();					
					}
				});
			}
			$.ajax({
				url: API_LOCATION_TYPES,
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
	        		viewModel.lookupLocationTypes(result);
	        		end++;
	        		readyStart();
				}
			});	
			/*			
			$.ajax({
				url: API_STATE_PROVINCES,
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
	        		viewModel.lookupStateProvinces(result);
	        		end++;
	        		readyStart();
				}
			});*/
			$.ajax({
				url: API_COUNTRIES,
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
	        		viewModel.lookupCountries(result);
	        		end++;
	        		readyStart();
				}
			});			
		}			
	}
    function handlerCompleted(){
    	viewModel.updatable(1)
        setEditable();
        //showNotifySuccess("Saved successfully.");    	
        Elite.app.back();
    }    

	function setEditable(){
        var nav_caption = "Edit";
        if(viewModel.updatable() == 1){
        	// when click "Cancel" in edit mode
            viewModel.readonly(true);
            viewModel.disableStates(true);
            viewModel.updatable(0);
        	nav_caption = "Edit"
        }else{
        	// when click "Edit" in read mode
        	nav_caption = "Cancel"
            viewModel.readonly(false);
            viewModel.updatable(1);   
                
            if(!viewModel.country_code())
            	viewModel.disableStates(true);
            else
            	viewModel.disableStates(false);
        }
        $("#profileaddress_editbtn .dx-button-text").text(nav_caption);
	}
	
	end = 0;
	function readyStart(){
		console.log(end);
		if(end == all_loaded)
			hidePleaseWait();
	}	
	return viewModel;
}