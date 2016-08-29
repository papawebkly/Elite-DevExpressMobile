ELITE['profile_addressdetail'] = function (params) {
	viewModel = {
		header_items: { 
			'align': 'right', 
			'template': 'nav-text', 
			'title': 'Edit',
			'id': '',
			'action': '#profile_addressedit/'+params.address_id
		},
		address_line_1: ko.observable(''),
		address_line_2: ko.observable(''),
		address_line_3: ko.observable(''),
		begin_date: ko.observable('TBD'),
		end_date: ko.observable('TBD'),
		city: ko.observable(''),
		country_code: ko.observable(''),
		location_type: ko.observable(''),
		location_type_code: ko.observable(''),
		postal_code: ko.observable(''),
		primary: ko.observable('EQFALSE'),
		state_code: ko.observable(''),
		city_state: ko.observable(''),
		country_zip: ko.observable(''),
		loc: ko.observable(''),
			
        viewShown: function(){
        	console.log("View Shown Address ID: "+params.address_id);
        	showPleaseWait();
        	addresses_store.byKey(params.address_id).done(function(data){
				console.log(data);
				viewModel.address_line_1(data.address_line_1);
				viewModel.address_line_2(data.address_line_2);
				viewModel.address_line_3(data.address_line_3);
				viewModel.begin_date((data.begin_date) ? formatDate(data.begin_date) : "TBD");
				viewModel.end_date((data.end_date) ? formatDate(data.end_date) : "TBD");
				viewModel.city(data.city);
				viewModel.country_code(data.country_code);
				viewModel.location_type(data.location_type);
				viewModel.location_type_code(data.location_type_code);
				viewModel.postal_code(data.postal_code);
				viewModel.primary(data.primary);
				viewModel.state_code(data.state);
				
            	city_statestr = '';
            	country_zipstr = '';
            	if(data.city)
            		city_statestr += data.city;
            	if(data.state)
            		city_statestr += ", " + data.state;
                if(data.postal_code)
                    city_statestr += " " + data.postal_code;
            	
            	if(data.country_code)
            		country_zipstr += data.country_code;
            						
				viewModel.city_state(city_statestr);
				viewModel.country_zip(country_zipstr);
				viewModel.loc( contactStr([
					data.address_line_1, " ", 
					data.address_line_2, " ",
					data.address_line_3, " ", 
					city_statestr, " ", country_zipstr
				]) );	
				
				console.log('location = '+viewModel.loc());
			    opts = {
			    	location: viewModel.loc(),
			    	markers: [{
			    		location: viewModel.loc(),
			    		clickAction: function(){
			    			console.log('clicked marker');
			    		}
			    	}]
			    };
			    console.log(opts);
			    $("#mailingaddress_map").dxMap("instance").option(opts);					
				hidePleaseWait();
			});
		},
		options : {
			width: '100%',
			height: 200,
			zoom: 10,
			provider: "google",
			controls: true
		}			
	}
	return viewModel;
}