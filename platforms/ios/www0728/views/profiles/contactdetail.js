Elite['profile_contactdetail'] = function (params) {
    var viewModel = {
    	lookupLocationTypes: ko.observableArray(),
    	lookupContactTypes: ko.observableArray(),
		header_items: { 
			'align': 'right', 
			'template': 'nav-text', 
			'title': 'Edit',
			'id': 'profilecontact_editbtn',
			'action': setEditable
		},
		updatable: ko.observable(0),
		begin_date: ko.observable(''),
        end_date: ko.observable(''),
        location_type: ko.observable(''),
        location_type_code: ko.observable(''),
        contact_type: ko.observable(''),
        contact_type_code: ko.observable(''),
        primary: ko.observable('EQFALSE'),
        primary_text: ko.observable(""),
        number_address: ko.observable(''),
        contact_id: ko.observable(1),
        update_profilecontact: function() {
        	var executable = true;
        	var msg = '';
        	if(!viewModel.contact_type_code()){
        		executable = false;
        		msg = "Please select a type.";
        	}else if(!viewModel.number_address()){
        		executable = false;
        		msg = "Please select a value.";
        	}else if(!viewModel.location_type_code()){
        		executable = false;
        		msg = "Please select a location.";
        	}
        	if(executable == false){
        		showAlertError(msg);
        		return;
        	}
        	
        	var contact_id = viewModel.contact_id();
            var processed_data = {
                /*"contact_id": ((parseInt(contact_id) == 0) ? 1 : contact_id),*/
                "assignment_id": localStorage.getItem("selected_assignmentid"),
                "begin_date": viewModel.begin_date(),
                "end_date": viewModel.end_date(),
                "location_type_code": viewModel.location_type_code(),
                "contact_type_code": viewModel.contact_type_code(),
                "number_address": viewModel.number_address(),
                "primary": viewModel.primary()
            };
            //update: PATCH, create: POST
			if(parseInt(contact_id) > 0){
            	//update
                processed_data.contact_id = contact_id;
                console.log('update');
                contacts_store.update(contact_id, processed_data).done(function(){
                	console.log('completed update');
                	Elite.app.back();
                });
            }else{
            	contacts_store.insert(processed_data).done(function(){
            		Elite.app.back();
            	});
            }            
        },
        readonly: ko.observable(true),
        viewShowing: function(){
			this.contact_type('');
        	this.contact_type_code('');
        	this.number_address('');
			this.location_type('');
			this.location_type_code('');
			this.begin_date('');
	        this.end_date('');
	        this.primary('EQFALSE');
	        this.primary_text("");
	        
            viewModel.readonly(true);
            viewModel.updatable(0);
        },
        viewShown: function(){
        	showPleaseWait();
        	end = 0;
        	if(params.contact_id == 0){
        		//show screen to create a new dependent
	        	all_loaded = 2;
        		viewModel.contact_id(0);
                viewModel.readonly(false);
                viewModel.updatable(1);                
	            $("#profilecontact_editbtn").hide();        		
        	}else{        	
        		$("#profilecontact_editbtn .dx-button-text").text("Edit");
	        	all_loaded = 3;
	        	viewModel.contact_id(params.contact_id);
	        	console.log("View Shown Contact ID: "+params.contact_id);
	        	contacts_store.byKey(params.contact_id).done(function(data){
					console.log(data);
					viewModel.contact_type(data.contact_type);
					viewModel.contact_type_code(data.contact_type_code);
					if(data.begin_date)
						viewModel.begin_date(new Date(data.begin_date));
					if(data.end_date)
						viewModel.end_date(new Date(data.end_date));
					viewModel.location_type(data.location_type);
					viewModel.location_type_code(data.location_type_code);
					
					var primary_value = data.primary;
					if(data.primary == true)
						primary_value = 'EQTRUE';
					else if(data.primary == false)
						primary_value = 'EQFALSE';
							
					viewModel.primary(primary_value);
					viewModel.primary_text((data.primary == true) ? "Yes" : "No");
					console.log('primary_text = ' + viewModel.primary_text());
					viewModel.number_address(data.number_address);
					
					end++;
					readyStart();
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
			$.ajax({
				url: API_CONTACT_TYPES,
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
	        		viewModel.lookupContactTypes(result);
	        		end++;
	        		readyStart(); 							
				}
			});	     	
		}
        	
	};
	end = 0;
	function readyStart(){
		console.log(end);
		if(end == all_loaded)
			hidePleaseWait();
	}
    function handlerCompleted(){
    	viewModel.updatable(1)
        setEditable();
        showNotifySuccess("Saved successfully.");
    }    
	function setEditable(){
        var nav_caption = "Edit";
        if(viewModel.updatable() == 1){
        	// when click "Cancel" in edit mode
            viewModel.readonly(true);
            viewModel.updatable(0);
        	nav_caption = "Edit"
        }else{
        	// when click "Edit" in read mode
        	nav_caption = "Cancel"
            viewModel.readonly(false);
            viewModel.updatable(1);                
        }
        $("#profilecontact_editbtn .dx-button-text").text(nav_caption);
	}
    return viewModel;
}