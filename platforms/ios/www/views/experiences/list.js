Elite['experienceslist'] = function (params) {
	viewModel = {
		header_items: { 
			'align': 'right', 
			'id': 'experience_addbtn',
			'template': 'nav-addcontact', 
			'action': '#experienceedit/0'
		},
			
		viewShowing: function(){
			$(".layout-header").addClass("changerelocation-header-bg");
			$(".dx-scrollable-content").addClass("changerelocation-body-bg");
		
			console.log(' experiences list - view shown');
			viewModel.experiencesslist_data(new DevExpress.data.DataSource({
	    		store: experiences_store
			}));
		},
		experiencesslist_data : ko.observable()
	};
	
	return viewModel;
}