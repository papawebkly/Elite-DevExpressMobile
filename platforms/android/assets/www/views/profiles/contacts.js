ELITE['profile_contacts'] = function (params) {
	var viewModel = {
		header_items: { 
			'align': 'right', 
			'id': 'profilecontact_addbtn',
			'template': 'nav-addcontact', 
			'action': '#profile_contactdetail/0'
		},
		viewShowing: function(){
			console.log(' contacts list - view shown');
			viewModel.contactslist_data(new DevExpress.data.DataSource({
	    		store: contacts_store
			}));
		},
		contactslist_data : ko.observable()		
	};		
	
	return viewModel;
}