ELITE['homepurchase'] = function (params) {
    var viewModel = {
		header_items: {
			'align': 'right', 
			'template': 'nav-addcontact', 
			'action': '#homeshowingadd/0',
			'id': 'homepurchase_addbtn'
		},
		buyer_name: ko.observable('Robert Realtor'),
		buyer_address: ko.observable('ReMax Soutwest'),		
        properties_list : ko.observable(),
        
		contentReady: function(){
			console.log(' content ready ');
			$('.rateit').rateit({'starwidth': 32, 'starheight':32});
		},
		viewShowing: function(){
		},
        viewShown: function(){
            console.log(' home showing list - view shown');
            viewModel.properties_list(new DevExpress.data.DataSource({
                store: homeshowing_store
            }));
        }
	};
	return viewModel;	
}

