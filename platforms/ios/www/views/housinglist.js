Elite['housinglist'] = function (params) {
	var viewModel = {
		viewShowing: function(){
			console.log(' housings list - view showing');
			$(".layout-header").addClass("changerelocation-header-bg");
            $(".dx-scrollable-content").addClass("changerelocation-body-bg");

			viewModel.housingorders(new DevExpress.data.DataSource({
	    		store: housings_store
			}));
		},
		housingorders : ko.observable()		
	}
	return viewModel;
};
