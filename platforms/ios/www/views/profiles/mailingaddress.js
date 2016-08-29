Elite['profile_addresses'] = function (params) {
	var viewModel = {
		header_items: { 
			'align': 'right', 
			'id': 'address_addbtn',
			'template': 'nav-addcontact', 
			'action': '#profile_addressedit/0'
		},
		
		viewShowing: function(){
			console.log(' addresses list - view shown');
			viewModel.addresseslist_data(new DevExpress.data.DataSource({
	    		store: addresses_store
			}));
		},
		addresseslist_data : ko.observableArray([])
	};	
    	
	return viewModel;
}