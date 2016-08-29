ELITE['bankdetail'] = function (params) {
    var viewModel = {
    	accountLocations: ko.observableArray(),
    	accountTypes: ko.observableArray(),
    	currencies: ko.observableArray(),
    		
		bank_account_id: ko.observable(),
		primary_account: ko.observable(''),
		account_location: ko.observable(''),
		account_location_code: ko.observable(''),
		account_type: ko.observable(''),
		account_type_code: ko.observable(''),
		used_for: ko.observable(''),
		int_account_name: ko.observable(''),
		int_swift_code: ko.observable(''),
		int_aba_routingno: ko.observable(''),
		int_iban: ko.observable(''),
		int_bank_location_code: ko.observable(''),
								
		account_number: ko.observable(''),
		name_onaccount: ko.observable(''),
		final_account_name: ko.observable(''),
		final_swift_code: ko.observable(''),
		final_aba_routingno: ko.observable(''),
		final_iban: ko.observable(''),
		final_bank_location_code: ko.observable(''),
		currency: ko.observable(''),
		currency_code: ko.observable(''),
		
		updatable: ko.observable(0),
		readonly: ko.observable(true),
			
		header_items: { 
			'align': 'right', 
			'template': 'nav-text', 
			'title': 'Edit',
			'id': 'bankaccount_editbtn',
			'action': setEditable
		},		
		
        viewShown: function(){
        	end = 0;
        	console.log(params);
        	console.log("View Shown Bank Account ID: "+params.bank_id);
        	showPleaseWait();
        	viewModel.bank_account_id(params.bank_id);
        	bank_store.byKey(params.bank_id).done(function(data){
				$.ajax({
					url: API_BANK_ACCOUNT_LOCATIONS,
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
		        		viewModel.accountLocations(result);
		        		end++;
		        		readyStart();   							
					}
				}); 
				$.ajax({
					url: API_BANK_ACCOUNT_TYPES,
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
		        		viewModel.accountTypes(result);
		        		end++;
		        		readyStart();   							
					}
				}); 
				$.ajax({
					url: API_CURRENCIES,
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
		        		viewModel.currencies(result);
		        		end++;
		        		readyStart();   							
					}
				}); 	
	        	
				viewModel.primary_account(data.primary_account);
				viewModel.account_location_code(data.account_location_code);
				viewModel.account_type_code(data.account_type_code);
				viewModel.used_for(data.used_for);
				viewModel.int_account_name(data.bank_name); 
				viewModel.int_swift_code(data.int_bank_swift_bic_code); 
				viewModel.int_aba_routingno(data.int_bank_aba_route_code); 
				viewModel.int_iban(data.int_bank_iban); 
				viewModel.int_bank_location_code(data.int_bank_access_country_code);
										
				viewModel.account_number(data.final_bank_account_number); 
				viewModel.name_onaccount(data.final_bank_name_on_account); 
				viewModel.final_account_name(data.final_bank_name); 
				viewModel.final_swift_code(data.final_bank_swift_bic_code); 
				viewModel.final_aba_routingno(data.final_bank_aba_route_code);
				viewModel.final_iban(data.final_bank_iban); 
				viewModel.final_bank_location_code(data.final_bank_address_country_code); 
				viewModel.currency_code(data.account_currency);
	        	/*    		
		    	display_account_number = "";
            	if(data.final_bank_account_number){
            		display_account_number = "++-" + data.final_bank_account_number.substring(6);
            	}
		        account_number = ko.observable(display_account_number);
		        account_name = ko.observable(data.final_bank_name);
		        */
				console.log(data);
			});
        },
        updateBankAccount: function(){
        	var bank_account_id = parseInt(viewModel.bank_account_id());
            var processed_data = {
            	bank_account_id: bank_account_id,
                assignment_id: 1,
				primary_account: null, 
				account_location_code: viewModel.account_location_code(),
				account_type_code: viewModel.account_type_code(), 
				used_for: viewModel.used_for(), 
				bank_name: viewModel.int_account_name(),  
				int_bank_swift_bic_code: viewModel.int_swift_code(),  
				int_bank_aba_route_code: viewModel.int_aba_routingno(),  
				int_bank_iban: viewModel.int_iban(),  
				int_bank_access_country_code: viewModel.int_bank_location_code(), 
					
				final_bank_account_number: viewModel.account_number(),  
				final_bank_name_on_account: viewModel.name_onaccount(),  
				final_bank_name: viewModel.final_account_name(),  
				final_bank_swift_bic_code: viewModel.final_swift_code(),  
				final_bank_aba_route_code: viewModel.final_aba_routingno(), 
				final_bank_iban: viewModel.final_iban(),  
				final_bank_address_country_code: viewModel.final_bank_location_code(),  
				account_currency: viewModel.currency_code()
            };
            console.log(processed_data);
			//update
            processed_data.bank_account_id = bank_account_id;
            bank_store.update(bank_account_id, processed_data);
        },
        removeBankAccount: function(){
        	var bank_account_id = parseInt(viewModel.bank_account_id());
        	bank_store.remove(bank_account_id).done(function(){
        		ELITE.app.back();
        	});
        },
    };
	end = 0;
	function readyStart(){
		console.log(end);
		if(end == 3)
			hidePleaseWait();
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
        $("#bankaccount_editbtn .dx-button-text").text(nav_caption);    	
	}   
		 
    return viewModel;
};

