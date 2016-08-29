ELITE['housinglist'] = function (params) {
	var viewModel = {
		viewShowing: function(){
			console.log(' housings list - view showing');
			viewModel.housingorders(new DevExpress.data.DataSource({
	    		store: housings_store
			}));
		},
		housingorders : ko.observable()		
	}
	return viewModel;
};

