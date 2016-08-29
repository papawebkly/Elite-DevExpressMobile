Elite['homeshowingadd'] = function (params) {
    var viewModel = {
    	/*
		header_items: { 
			'align': 'right', 
			'template': 'nav-text', 
			'title': 'Edit',
			'id': 'howshowingadd_editbtn',
			'action': setEditable
		},*/	
		lookupStateProvinces: ko.observableArray(),
		lookupCountries: ko.observableArray(),
		nickname: ko.observable(''),
		address_line_1: ko.observable(''),
		address_line_2: ko.observable(''),
		city: ko.observable(''),
		state_code: ko.observable(''),
		country_code: ko.observable(''),
		postal_code: ko.observable(''),
		rating: ko.observable(0),
		price: ko.observable(0),
			
		title: ko.observable('HomeShowing'),
		updatable: ko.observable(1),
        readonly: ko.observable(false),
        disableStates: ko.observable(true),
        	
        homeshowing_id: ko.observable(0),
		add_homeshowing: function(){
			//ELITE.app.back();
			assignment_id = localStorage.getItem("selected_assignmentid");
			var executable = true;
			if(!viewModel.nickname()){
        		executable = false;
        		msg = "Please input the Nickname.";
        	}else if(!viewModel.address_line_1()){
        		executable = false;
        		msg = "Please input the Address Line.";
        	}else if(!viewModel.city()){
        		executable = false;
        		msg = "Please input the city.";
        	}else if(!viewModel.state_code()){
        		executable = false;
        		msg = "Please select a state.";
        	}else if(!viewModel.country_code()){
        		executable = false;
        		msg = "Please select a country.";
        	}
        	if(executable == false){
        		showAlertError(msg);
        		return;
        	}	
        				
			var processed_data = {
				assignment_id: assignment_id,
				nickname: viewModel.nickname(),
				address_line_1: viewModel.address_line_1(),
				address_line_2: viewModel.address_line_2(),
				city: viewModel.city(),
				state_code: viewModel.state_code(),
				country_code: viewModel.country_code(),
				postal_code: viewModel.postal_code(),
				rating: $('#homeshowingadd_rateit').rateit('value'),
				price: viewModel.price(),
			};
			console.log(processed_data);
			//return;
			var homeshowing_id = viewModel.homeshowing_id();
			if(parseInt(homeshowing_id) > 0){
				homeshowing_store.update(homeshowing_id, processed_data)
			}else{
				homeshowing_store.insert(processed_data)
			}
		},
		viewShowing: function(){

			var homeshowing_id = 0;
			this.nickname('');
			this.address_line_1('');
			this.address_line_2('');
			this.city('');
			this.state_code('');
			this.country_code('');
			this.postal_code('');
            this.rating(0);
            this.price(0);
            this.disableStates(true);
            this.lookupStateProvinces([]);
            this.lookupCountries([]);
            
        	if(params.id == 0){
        		viewModel.title('Add Property');
        	}else{
        		viewModel.title('Edit Property');
        		homeshowing_id = localStorage.getItem('homeshowing_id');
        		console.log(homeshowing_id);
				homeshowing_store.byKey(homeshowing_id).done(function(row){
					data = row.home_showing;
					console.log(data);
					viewModel.nickname(data.nickname);
					viewModel.address_line_1(data.address_line_1);
					viewModel.address_line_2(data.address_line_2);
					viewModel.city(data.city);
					viewModel.state_code(data.state_code);
					viewModel.country_code(data.country_code);
					viewModel.postal_code(data.postal_code);
					viewModel.rating(data.rating);
					viewModel.price(data.price);
					$('#homeshowingadd_rating .rateit').rateit({'starwidth': 32, 'starheight':32});
				});        		
        	}
        	viewModel.homeshowing_id(homeshowing_id);
		},
		processValueChange: function(){
        	showPleaseWait();
        	var country_code = this.country_code();
			$.ajax({
				url: API_STATE_PROVINCES + "/search?country_code="+country_code,
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
        viewShown: function(){
        	if(params.id == 0){
        		$('#homeshowingadd_rating .rateit').rateit({'starwidth': 32, 'starheight':32});
        		$('#homeshowingadd_rating .rateit').rateit('reset');
        	}
        	var total_loaded = 1;        	
        	end = 0;
        	showPleaseWait();
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
	        		readyStart(total_loaded);
				}
			});	*/			
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
                   hidePleaseWait();
				},
				success: function(result){
	        		viewModel.lookupCountries(result);
	        		end++;
	        		readyStart(total_loaded);
				}
			});
		}
        	
	};
	end = 0;
	function readyStart(total_loaded){
		console.log(end);
		if(end == total_loaded)
			hidePleaseWait();
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
        $("#howshowingadd_editbtn .dx-button-text").text(nav_caption);    	
	} 
    return viewModel;
}