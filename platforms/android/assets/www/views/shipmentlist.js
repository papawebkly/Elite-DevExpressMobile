ELITE['shipmentlist'] = function (params) {
    var viewModel = {	
        viewShowing: function(){
            console.log(' shipments list - view shown');
            viewModel.shipmentlist_data(new DevExpress.data.DataSource({
                store: shipments_store
            }));
        },
        shipmentlist_data : ko.observableArray()
    }
    return viewModel;
};

