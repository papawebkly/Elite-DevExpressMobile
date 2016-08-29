Elite['shipment'] = function (params) {
	var viewModel = {
		header_items : { 
			'align': 'right', 
			'id': 'shipment_addeventbtn',
			'template': 'nav-calendar', 
			'action': function shipment_calendar(){
				//no use for now
				//console.log(' shipment_calendar ');
			}
		},
		tabs : [
            { text: "Requested"},
            { text: "Scheduled"},
            { text: "Actual"}
        ],
        selectedTab : ko.observable(0),
        primary_shipment : ko.observable(''), 
        shipment_type : ko.observable(''), 
        destination_city : ko.observable(''), 
        departure_city : ko.observable(''), 
        requested_survey : ko.observable(''), 
        scheduled_survey : ko.observable(''), 
        actual_survey : ko.observable(''), 
        requested_pack : ko.observable(''), 
        scheduled_pack_start : ko.observable(''), 
        actual_pack_start : ko.observable(''), 
        scheduled_pack_end : ko.observable(''), 
        actual_pack_end : ko.observable(''), 
        requested_load : ko.observable(''), 
        scheduled_load : ko.observable(''), 
        actual_load : ko.observable(''), 
        scheduled_load_end : ko.observable(''), 
        actual_load_end : ko.observable(''), 
        requested_delivery : ko.observable(''), 
        scheduled_delivery : ko.observable(''), 
        actual_delivery : ko.observable(''), 
        scheduled_delivery_end : ko.observable(''), 
        actual_delivery_end : ko.observable(''), 

		// Computed Properties
        shipment_route : ko.observable(''), 

		// Need to add to API
        move_coordinator_full_name : ko.observable('Unknown'),
        move_coordinator_email : ko.observable('')/*'bristolelite@gmail.com'*/,
        move_coordinator_phone : ko.observable('')/*'(602)952-0355'*/,
		vendor_name : ko.observable(''),

		//  Need to format & compute
        scheduled_pack_range : ko.observable(''), 
        scheduled_load_range : ko.observable(''), 
        scheduled_delivery_range : ko.observable(''), 
        actual_pack_range : ko.observable(''), 
        actual_load_range : ko.observable(''), 
        actual_delivery_range : ko.observable(''), 
        
        title: ko.observable('Shipment'),
		emailMe : function () {
            sendEmail(this.move_coordinator_email());
        },
		callMe: function(){
			window.location.href='tel:' + this.move_coordinator_phone();
		},
        viewShown: function(){
        	this.move_coordinator_full_name('Unknown');
        	this.move_coordinator_email('');
        	this.move_coordinator_phone('');
        	
        	console.log("View Shown Shipement ID: "+params.id);
        	showPleaseWait();
        	shipments_store.byKey(params.id).done(function(data){				
				console.log(data);
                viewModel.title(data.shipment_type);
				viewModel.shipment_type(data.shipment_type);
				viewModel.requested_survey(formatDate(data.requested_survey));
				viewModel.requested_pack(formatDate(data.requested_pack));
				viewModel.requested_load(formatDate(data.requested_load));
				viewModel.requested_delivery(formatDate(data.requested_delivery));
				
				viewModel.scheduled_survey(formatDate(data.scheduled_survey));
				viewModel.scheduled_pack_range(dateConcat(data.scheduled_pack_start, data.scheduled_pack_end));
				viewModel.scheduled_load_range(dateConcat(data.scheduled_load, data.scheduled_load_end));
				viewModel.scheduled_delivery_range(dateConcat(data.scheduled_delivery, data.scheduled_delivery_end));
				
				viewModel.actual_survey(formatDate(data.actual_survey));
				viewModel.actual_pack_range(dateConcat(data.actual_pack_start, data.actual_pack_end));
				viewModel.actual_load_range(dateConcat(data.actual_load, data.actual_load_end));
				viewModel.actual_delivery_range(dateConcat(data.actual_delivery, data.actual_delivery_end));
			    
				if(data.vendor_contact_full_name)
					viewModel.move_coordinator_full_name(data.vendor_contact_full_name);
				if(data.vendor_contact_email)
					viewModel.move_coordinator_email(data.vendor_contact_email);
				if(data.vendor_contact_phone)
					viewModel.move_coordinator_phone(data.vendor_contact_phone);
				viewModel.vendor_name(data.vendor_name);
				hidePleaseWait();
			});
        }   	
	};
    return viewModel;
};

