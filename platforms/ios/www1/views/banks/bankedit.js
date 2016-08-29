ELITE['bankedit'] = function (params) {
	viewModel = {
    	bankLocations: ko.observableArray(),		
    	accept: function() {
    		
        	var executable = true;
        	var msg = '';
        	if(!this.account_name()){
        		executable = false;
        		msg = "Please input a bank name.";
        	}else if(!this.bank_location_code()){
        		executable = false;
        		msg = "Please select a bank location.";
        	}else if(!this.intermediary()){
        		executable = false;
        		msg = "Please select a intermediary.";
        	}
        	if(executable == false){
        		showAlertError(msg);
        		return;
        	}    		
        	
         	localStorage.setItem("account_name", this.account_name());
         	localStorage.setItem("bank_location_code", this.bank_location_code());
         	localStorage.setItem("bank_location", this.bank_location());
         	localStorage.setItem("intermediary", this.intermediary());
        	ELITE.app.navigate("bankedit2/0");
        },			
			
		bank_location: ko.observable(''),
		bank_location_code: ko.observable(''),
		intermediary: ko.observable(''),
		account_name: ko.observable(''),
			
		viewShowing: function(){
			this.bank_location('');
			this.bank_location_code('');
			this.intermediary('');
			this.account_name('');			
		},
        viewShown: function(opt){
        	end = 0;
        	console.log('bankedit - view shown');
        	console.log(opt);
        	if(opt.direction == "forward"){
	        	showPleaseWait();   
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
		        		hidePleaseWait();   							
					}
				}); 	        	 	
        	}
		}			
	}
	
	end = 0;
	function readyStart(){
		console.log(end);
		if(end == 4)
			hidePleaseWait();
	}
	
	return viewModel;
}