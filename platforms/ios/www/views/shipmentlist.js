Elite['shipmentlist'] = function (params) {
    var viewModel = {	
        viewShowing: function(){
            console.log(' shipments list - view shown');
            $(".layout-header").addClass("changerelocation-header-bg");
			$(".dx-scrollable-content").addClass("changerelocation-body-bg");
            viewModel.shipmentlist_data(new DevExpress.data.DataSource({
                store: shipments_store
            }));
        },
        shipmentlist_data : ko.observableArray()
    }
    return viewModel;
};
