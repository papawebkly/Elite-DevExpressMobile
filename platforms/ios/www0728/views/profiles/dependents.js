Elite['profile_dependents'] = function (params) {
	var viewModel = {
		header_items: { 
			'align': 'right', 
			'id': 'dependents_addbtn',
			'template': 'nav-addcontact', 
			'action': '#profile_dependentsdetail/0'
		},
		viewShowing: function(){
			console.log(' dependents list - view shown');
			viewModel.dependentslist_data(new DevExpress.data.DataSource({
	    		store: dependents_store
			}));
		},
		dependentslist_data : ko.observable()
	};
	return viewModel;
}