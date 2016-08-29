ELITE['bankedit2'] = function (params) {
	all_loaded = 4;
	viewModel = {
		bank_account_id: ko.observable(0),
    	bankLocations: ko.observableArray(),		
    	accountLocations: ko.observableArray(),
    	accountTypes: ko.observableArray(),
    	currencies: ko.observableArray(),
        nextStep: function() {
        	console.log(this.selectedTabIndex());
         	console.log(this.currency_code());
         	console.log(this.currency());
         	if(this.canGoTab(this.selectedTabIndex(), 0) == false)
         		return;
         	var next = this.selectedTabIndex() + 1;
			this.selectedTabIndex(next);
        },	
        canGoTab: function(cur_tabindex, on_final){
        	var executable = true;
        	var msg = '';
        	switch(cur_tabindex){
        		case 0:
		        	if(!this.account_number()){
		        		executable = false;
		        		msg = "Please input the account number.";
		        	}else if(!this.name_onaccount()){
		        		executable = false;
		        		msg = "Please input the name on account.";
		        	}else if(!this.currency_code()){
		        		executable = false;
		        		msg = "Please select a currency.";
		        	}else if(!this.account_type_code()){
		        		executable = false;
		        		msg = "Please select a type.";
		        	}else if(!this.account_location_code()){
		        		executable = false;
		        		msg = "Please select a location.";
		        	}else if(!this.used_for()){
		        		executable = false;
		        		msg = "Please input the used for.";
		        	}
        			break;
        		case 1:
        			if(!this.final_account_name()){
		        		executable = false;
		        		msg = "Please input the bank name.";
		        	}else if((this.final_bank_location_code() == 'USA' || this.final_bank_location_code() == 'CAN') && !this.final_aba_routingno()){
		        		executable = false;
		        		msg = "Please select a ABA routing #.";
		        	}else if((this.final_bank_location_code() != 'USA' && this.final_bank_location_code() != 'CAN') && !this.final_swift_code()){
		        		executable = false;
		        		msg = "Please input the swift code.";
		        	}else if((this.final_bank_location_code() != 'USA' && this.final_bank_location_code() != 'CAN') && !this.final_iban()){
		        		executable = false;
		        		msg = "Please input the IBAN.";
		        	}else if(!this.final_bank_location_code()){
		        		executable = false;
		        		msg = "Please select a bank location.";
		        	}
        			break;
        		case 2:
        			//console.log('intermediary = ' + this.intermediary());
	        		if(this.intermediary() == 'yes'){
	        			if(!this.int_account_name()){
			        		executable = false;
			        		msg = "Please input the bank name.";
			        	}else if((this.final_bank_location_code() == 'USA' || this.final_bank_location_code() == 'CAN') && !this.int_aba_routingno()){
			        		executable = false;
			        		msg = "Please select a ABA routing #.";
			        	}else if((this.final_bank_location_code() != 'USA' && this.final_bank_location_code() != 'CAN') && !this.int_swift_code()){
			        		executable = false;
			        		msg = "Please input the swift code.";
			        	}else if((this.final_bank_location_code() != 'USA' && this.final_bank_location_code() != 'CAN') && !this.int_iban()){
			        		executable = false;
			        		msg = "Please input the IBAN.";
			        	}else if(!this.int_bank_location_code()){
			        		executable = false;
			        		msg = "Please select a bank location.";
			        	}
			        }
        			break;
        	}
        	if(executable == false){
        		//console.log('original index = ' + this.selectedTabIndex());
        		//console.log('current index = ' + cur_tabindex);
        		if(on_final == 1){
        			this.selectedTabIndex(cur_tabindex);
        		}
        		showAlertError(msg);
        	} 
        	return executable;
        },
        saveBankAccount: function(){
        	if(!this.canGoTab(0, 1) || !this.canGoTab(1, 1) || !this.canGoTab(2, 1)){
        		return;
        	}
        	var processed_data = {
                /*"assignment_id": 1,*/
				primary_account: null, 
				account_location_code: viewModel.account_location_code(),
				account_type_code: viewModel.account_type_code(), 
				used_for: viewModel.used_for(), 
				bank_name: viewModel.final_account_name(),  
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
            var bank_account_id = viewModel.bank_account_id();
            //processed_data.bank_account_id = bank_account_id;
            
   			processed_data = {"bank_account" : processed_data};
            if(parseInt(bank_account_id) > 0){
            	//update
                bank_store.update(bank_account_id, processed_data);
            }else{
            	bank_store.insert(processed_data);
            }            
        },
		selectedTabIndex: ko.observable(0),
		account_number: ko.observable(''),
		name_onaccount: ko.observable(''),
		account_type: ko.observable(''),
		account_type_code: ko.observable(''),
		account_location: ko.observable(''),
		account_location_code: ko.observable(''),
		currency: ko.observable(''),
		currency_code: ko.observable(''),
		used_for: ko.observable(''),
		
		final_account_name: ko.observable(''),
		final_aba_routingno: ko.observable(''),
		final_swift_code: ko.observable(''),
		final_iban: ko.observable(''),
		final_bank_location: ko.observable(''),
		final_bank_location_code: ko.observable(''),
			
		int_account_name: ko.observable(''),
		int_aba_routingno: ko.observable(''),
		int_swift_code: ko.observable(''),
		int_iban: ko.observable(''),
		int_bank_location: ko.observable(''),
		int_bank_location_code: ko.observable(''),
			
		primary_account: ko.observable(''),	
		intermediary: ko.observable("no"),
		bankTabs: ko.observableArray(),
		totalSteps: ko.observable('3'),

		updatable: ko.observable(0),
		readonly: ko.observable(true),
		title: ko.observable(""),
		header_items: { 
			'align': 'right', 
			'template': 'nav-text', 
			'title': 'Edit',
			'id': 'bankaccount_editbtn',
			'action': setEditable
		},
		itemSelectAction: function(){
			//console.log(viewModel.selectedTabIndex());
			var cur_tabindex = viewModel.selectedTabIndex();
			//canGoTab(cur_tabindex);
		},
		viewShowing: function(){
			this.account_number('');
			this.name_onaccount('');
			this.account_type('');
			this.account_type_code('');
			this.account_location('');
			this.account_location_code('');
			this.currency('');
			this.currency_code('');
			this.used_for('');
			
			this.final_account_name('');
			this.final_aba_routingno('');
			this.final_swift_code('');
			this.final_iban('');
			this.final_bank_location('');
			this.final_bank_location_code('');
				
			this.int_account_name('');
			this.int_aba_routingno('');
			this.int_swift_code('');
			this.int_iban('');
			this.int_bank_location('');
			this.int_bank_location_code('');
				
			this.primary_account('');	
		},
        viewShown: function(){
        	viewModel.selectedTabIndex(0);
        	viewModel.bank_account_id(params.bank_account_id);
        	end = 0;
        	console.log('bankedit - view shown');
        	if(params.bank_account_id == 0){
        		this.title("Create Bank Account");
        		viewModel.readonly(false);
                viewModel.updatable(1);                
	            $("#bankaccount_editbtn").hide();  
	            
	         	this.final_account_name(localStorage.getItem("account_name"));
	         	this.final_bank_location_code(localStorage.getItem("bank_location_code"));
	         	this.final_bank_location(localStorage.getItem("bank_location"));
	         	if(localStorage.getItem("intermediary") == "yes"){
	         		this.int_account_name(localStorage.getItem("account_name"));
	         		this.int_bank_location_code(localStorage.getItem("bank_location_code"));
	         		this.int_bank_location(localStorage.getItem("bank_location"));
	        	}
	         	this.intermediary(localStorage.getItem("intermediary"));
	         	all_loaded = 4;
	         	
        	}else{
        		this.readonly(true);
        		this.updatable(1);
        		setEditable();
        		$("#bankaccount_editbtn").show()
        		this.title("Bank Account");
        		//update
        		all_loaded = 5;
        		var vm = this;
	        	bank_store.byKey(params.bank_account_id).done(function(data){
		        	vm.primary_account(data.primary_account);
					vm.account_location_code(data.account_location_code);
					vm.account_type_code(data.account_type_code);
					vm.used_for(data.used_for);
					vm.int_account_name(data.bank_name); 
					vm.int_swift_code(data.int_bank_swift_bic_code); 
					vm.int_aba_routingno(data.int_bank_aba_route_code); 
					vm.int_iban(data.int_bank_iban); 
					vm.int_bank_location_code(data.int_bank_access_country_code);
											
					vm.account_number(data.final_bank_account_number); 
					vm.name_onaccount(data.final_bank_name_on_account); 
					vm.final_account_name(data.final_bank_name); 
					vm.final_swift_code(data.final_bank_swift_bic_code); 
					vm.final_aba_routingno(data.final_bank_aba_route_code);
					vm.final_iban(data.final_bank_iban); 
					vm.final_bank_location_code(data.final_bank_address_country_code); 
					vm.currency_code(data.account_currency);
		        	/*    		
			    	display_account_number = "";
	            	if(data.final_bank_account_number){
	            		display_account_number = "++-" + data.final_bank_account_number.substring(6);
	            	}
			        account_number = ko.observable(display_account_number);
			        account_name = ko.observable(data.final_bank_name);
			        */
			        if(data.int_bank_name){
			        	console.log('---- ' + data.int_bank_name + ' ----');
			        	vm.intermediary("yes");
			        }
					console.log(data);
					end++;
					readyStart();					
				});        		
        	}
        	        	
         	console.log(localStorage.getItem("bank_location_code"));
         	console.log(localStorage.getItem("bank_location")); 
         	
         	if(/*(this.final_bank_location_code() == "USA" || this.final_bank_location_code() == "CAN") && */this.intermediary() != "yes"){
		        viewModel.totalSteps('2');
			    viewModel.bankTabs([
		        	{ text: "Account" },
					{ text: "Bank" }
				]);
			}else{
				viewModel.totalSteps('3');
		        viewModel.bankTabs([
		        	{ text: "Account" },
					{ text: "Bank" },
					{ text: "Intermediary" }
				]);				
			}
			
        	showPleaseWait();
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
	        		viewModel.bankLocations(result);
	        		end++;
	        		readyStart();   							
				}
			}); 												        	
		}			
	}
	
	end = 0;
	function readyStart(){
		console.log(end);
		if(end == all_loaded)
        {
			hidePleaseWait();
            viewModel.updatable(1);
            viewModel.selectedTabIndex(1);
            viewModel.selectedTabIndex(0);
        }
	}
    function setEditable(){
        var nav_caption = "Edit";
        if(viewModel.updatable() == 1){
        	// when click "Cancel" in edit mode
            viewModel.readonly(true);
            viewModel.updatable(0);
        	nav_caption = "Edit"
        	viewModel.title("Bank Account");
        }else{
        	// when click "Edit" in read mode
        	nav_caption = "Cancel"
            viewModel.readonly(false);
            viewModel.updatable(1);    
            viewModel.title("Edit Bank Account");            
        }
        $("#bankaccount_editbtn .dx-button-text").text(nav_caption);    	
	} 	
	return viewModel;
}