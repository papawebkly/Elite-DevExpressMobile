Elite['banklist'] = function (params) {
    var viewModel = {
		header_items: { 
			'align': 'right', 
			'id': 'bank_addbtn',
			'template': 'nav-addcontact', 
			'action': '#bankedit/0'
		},		
		viewShowing: function(){
			console.log(' bank list - view shown');
			viewModel.accountbankslist_data(new DevExpress.data.DataSource({
	    		store: bank_store
			}));
		},
		accountbankslist_data : ko.observable()
    }

    return viewModel;
};

