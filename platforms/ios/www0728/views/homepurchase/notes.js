Elite['hoepurchasedetail_notes'] = function (params) {
	var viewModel = {
		header_items: { 
			'align': 'right', 
			'id': 'profilecontact_addbtn',
			'template': 'nav-addcontact', 
			'action': '#hoepurchasedetail_notedetail/0'
		},
		noteslist_data: ko.observable(),
		viewShowing: function(){
			console.log(' contacts list - view shown');
			viewModel.noteslist_data(new DevExpress.data.DataSource({
	    		store: homeshowingnotes_store
			}));
		},
		goBack: function(){
			var homeshowing_id = localStorage.getItem('homeshowing_id');
			console.log(' *** backToHomePurchaseDetail : ' + homeshowing_id);
			Elite.app.navigate('homepurchasedetail/' + homeshowing_id, {direction: 'backward'});
		}
	};		
	
	return viewModel;
}