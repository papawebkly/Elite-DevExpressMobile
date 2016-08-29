Elite['homesale'] = function (params) {
    var viewModel = {
		seller_name: ko.observable(''),
		agent_title: ko.observable('Your Home Sale Agent'),
		agent_email: ko.observable(''),
		agent_phone: ko.observable(''),
		agent_company: ko.observable(''),
			
		seller_address: ko.observable(''),
        current_list: ko.observable(''),
        days_onmarket: ko.observable(''),
        address_line_1: ko.observable(''),
        address_line_2: ko.observable(''),
		city: ko.observable(''),
		state: ko.observable(''),
		postal_code: ko.observable(''),
		city_state_postal: ko.observable(''),
        nodata: ko.observable(false),

		emailHomesaleAgent : function () {
            sendEmail(this.agent_email());
        },
		callHomesaleAgent: function(){
			window.location.href='tel:' + this.agent_phone();
		},
        viewShowing: function(){
		    this.current_list("");
		    this.days_onmarket("");
        },	
		viewShown: function(){
        	showPleaseWait();
			$.ajax({
				url: API_HOMESALES,
				dataType: 'json',
        		headers: {
        			'X-User-Email' : xuser_email,
					'X-User-Token' : xuser_token
				},					
				error: function(jqXHR, textStatus, errorThrown){
					formatErrorMessage(jqXHR, errorThrown);
				},
				success: function(data) {
					console.log(data);
					hidePleaseWait();
					if(data.length > 0){
                        viewModel.nodata(false);
						var row = data[0];
						viewModel.seller_name(row.agent_name);
						viewModel.agent_title(row.agent_title);
						viewModel.agent_email(row.agent_email);
						viewModel.agent_phone(row.agent_phone);
						viewModel.agent_company(row.agent_company);
						
                   viewModel.current_list((row.list_price) ? ((parseFloat(row.list_price).toFixed(0))) : '');// + " " + row.list_price_currency) : '');
						viewModel.days_onmarket((row.days_on_market) ? row.days_on_market : '');
						//viewModel.seller_address(row.address_line_1);
						
						if(row.address_line_1)
							viewModel.address_line_1(row.address_line_1);
						if(row.address_line_2)
							viewModel.address_line_2(row.address_line_2);
						
						var city_state_postal = '';
                        if(row.address_city) {
							viewModel.city(row.address_city);
                           	city_state_postal += row.address_city;
                        }
                        if(row.state) {
							viewModel.state(row.state);
                            city_state_postal += ", " + row.state;
                        }
                        if(row.postal_code) {
                            viewModel.postal_code(row.postal_code);
                            city_state_postal += " " + row.postal_code;
                        }
                        viewModel.city_state_postal(city_state_postal);
                        
						var loc = row.address_line_1;
						if(row.address_line_2)
							loc += " " + row.address_line_2
						if(row.address_city)
							loc += " " + row.address_city;
						if(row.state)
							loc += " " + row.state;
						if(row.postal_code)
							loc += " " + row.postal_code;
						
						console.log(loc);
					    $("#realstate_map").dxMap("instance").option({
					        location: loc,
					        markers: [{ location: loc }]
					    });						    
					}else{
                       viewModel.nodata(true);
                   }
				}
			});
        	
        }
	};	
	map_options = {
		location: "",
		width: '100%',
		height: 150,
		zoom: 6,
		provider: "google",
		mapType: "roadmap",
		markers: []
	};	
	return viewModel;

}

