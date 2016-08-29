Elite['housing'] = function (params) {
    function gotoHousingMap(){
        var q = viewModel.loc();
        //window.open('maps:q='+q, '_system');
        console.log('go to housing map');
        navigator.geolocation.getCurrentPosition(onNativeHPSuccess, onHousingMapError);
    };

    var viewModel = {
		header_items: { 
			'align': 'right', 
			'id': 'housing_addeventbtn',
			'template': 'nav-calendar', 
			'action': function housings_calendar(){
                var moveIn = new Date(viewModel.move_in());
                var moveOut = new Date(viewModel.move_out());
				if(moveIn == "TBD" || moveOut == "TBD") {
					showAlertError("You can't add the dates into calendar now.");
					return;
				}
				var result = DevExpress.ui.dialog.confirm("Are you sure you want to add the move in and move out dates to your calendar?", "Confirm");
                result.done(function (dialogResult) {
                    var con = dialogResult ? "Confirmed" : "Canceled";
                    if(con == "Confirmed"){
                        // If they say yes, we need to add the dates automatically to the calendar
                        console.log('Yes');
                        var title = viewModel.property_name();
                        var loc = viewModel.loc();
                        var notes = "";
                        console.log("title = " + title);
                        console.log("loc = " + loc);
                        console.log("notes = " + notes);
                        console.log("moveIn = " + moveIn);
                        console.log("moveOut = " + moveOut);
                        //move in
                        //if(moveIn != "TBD") {
	                        window.plugins.calendar.createEvent(title, loc, notes, moveIn, moveOut, function(){
	                            console.log('success adding of move in & out');
				        		showNotifySuccess("The event has been saved successfully!");
	                        }, function(r){
	                        	console.log(r);
				        		showNotifyFailed("Adding of the event has been failed!");
	                        });
                		//}
                    	/*
                        //move out
                        if(moveOut != "TBD") {
	                        window.plugins.calendar.createEvent(title, loc, notes, moveOut, moveOut, function(){
	                            console.log('success adding of move out');
	                        }, function(){
	                            console.log('fail adding of move out');
	                        });
                    	}*/
                    }
                });
			}
		},    	
		property_name: ko.observable('Unknown'),
		address_line_1: ko.observable('Unknown'),
		address_line_2: ko.observable('Unknown'),
		city_country: ko.observable('Unknown'),
		move_in: ko.observable('TBD'),
		move_out: ko.observable('TBD'),
		service_agent_full_name: ko.observable('Unknown'),
		service_agent_company: ko.observable('Unknown'),
		service_agent_email: ko.observable(''), /* 'bristolelite@gmail.com' */
		service_agent_phone: ko.observable(''), /* '(602)952-0355' */
		loc: ko.observable(''),
		housing_id: ko.observable(''),
        lockbox: ko.observable(''),
        gate_code: ko.observable(''),
        mailbox: ko.observable(''),
        property_phone: ko.observable(''),
			
    	viewShowing: function(){
			this.property_name('Unknown');
			this.address_line_1('Unknown');
			this.address_line_2('Unknown');
			this.city_country('Unknown');
			this.move_in('TBD');
			this.move_out('TBD');
			this.service_agent_full_name('Unknown');
			this.service_agent_company('Unknown');
			
			this.service_agent_email('');
			this.service_agent_phone('');
    	},
        viewShown: function(){
			console.log(' - Housing detail' + params.id);
			showPleaseWait();
 			viewModel.housing_id(params.id);
			housings_store.byKey(params.id).done(function(data){				
				console.log(data);
				var calendaricon_visible = (data.start_date || data.end_date) ? true : false;
				//$("#housing_addeventbtn").dxButton("instance").option("visible", calendaricon_visible);
				if(calendaricon_visible)
					$("#housing_addeventbtn").show();
				else
					$("#housing_addeventbtn").hide();
								
				if(data.start_date)
					viewModel.move_in(formatDate(data.start_date));
				if(data.end_date)
					viewModel.move_out(formatDate(data.end_date));
				if(data.property_name)
					viewModel.property_name(data.property_name);
				if(data.address_line_1)
					viewModel.address_line_1(data.address_line_1);
				if(data.address_line_2)
					viewModel.address_line_2(data.address_line_2);
				viewModel.city_country(contactStr([data.city, ", ", data.state, ", ", data.country_code]));
				viewModel.service_agent_full_name(data.service_agent_full_name);
				viewModel.service_agent_company(data.vendor_name);
				if(data.service_agent_email)
					viewModel.service_agent_email(data.service_agent_email);
				if(data.service_agent_phone)
					viewModel.service_agent_phone(data.service_agent_phone);
				
				var hloc = contactStr([data.address_line_1, " ", viewModel.city_country()]);
				viewModel.loc( hloc );
				localStorage.setItem("housing_loc", hloc);
				console.log('map location  =  ' + hloc);
				$("#housing_map").dxMap("instance").option({
					location: hloc,
					markers: [{ location: hloc }]
				});
                if(data.mailbox)
                    viewModel.mailbox(data.mailbox);
                if(data.lockbox)
                    viewModel.lockbox(data.lockbox);
                if(data.gate_code)
                    viewModel.gate_code(data.gate_code);
                if(data.property_phone)
                    viewModel.property_phone(data.property_phone);

                hidePleaseWait();
			});
		},
		emailMe: function(){
	        sendEmail(this.service_agent_email());
	    },
	    callMe: function(){
	    	window.location.href='tel:' + this.service_agent_phone();
	    },
		options : {
			clickAction: gotoHousingMap,
			width: '100%',
			height: 150,
			zoom: 12,
			provider: "google",
			mapType: "roadmap"/*,
			markers: []*/
		}
	};
    return viewModel;
};

function onHousingMapSuccess(position) {
	console.log('-- success --');
    console.log(position);
    console.log([position.coords.latitude, position.coords.longitude]);
    $("#housing_map").dxMap("instance").option({
        location: [position.coords.latitude, position.coords.longitude]
    });
    //window.open("http://maps.apple.com/maps?q="+position.coords.latitude+","+position.coords.longitude, '_system');
}
function onNativeHPSuccess(position){
    //window.open("http://maps.apple.com/maps?q="+position.coords.latitude+","+position.coords.longitude, '_system');
    var daddr = localStorage.getItem("housing_loc");
    var saddr = position.coords.latitude+","+position.coords.longitude;
    console.log("http://maps.apple.com/maps?daddr=" + daddr + "&saddr=" + saddr);
    window.open("http://maps.apple.com/maps?daddr=" + daddr + "&saddr=" + saddr, "_system");
}
// onError Callback receives a PositionError object
function onHousingMapError(error) {
	console.log('-- error --');
}
