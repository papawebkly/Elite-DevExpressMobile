ELITE['realestate'] = function (params) {
    var viewModel = {
		header_items: {
			align: 'center', 
			widget: 'tabs', 
			options: { 
				dataSource: [
					{ text: "Selling", index: 0 },
					{ text: "Purchase", index: 1 }
				],
				selectedIndex: 0,
				itemClickAction: function(data){
					var selected_tabindex = data.itemData.index;
					console.log(selected_tabindex);
					$(".realestates").hide();
					$("#realestate" + selected_tabindex).show();
					
					if(parseInt(selected_tabindex) == 1){
						$("#realesate_addbtn").show();
						$('.rateit').rateit({'starwidth': 32, 'starheight':32});	
					}else
						$("#realesate_addbtn").hide();
				}
       		},  
		},
		header_extra_item: {
			'align': 'right', 
			'template': 'nav-addcontact', 
			'action': function(){
                console.log('clicked add button');
			},
			'id': 'realesate_addbtn'
		},
		buyer_name: ko.observable('Robert Realtor'),
		buyer_address: ko.observable('ReMax Soutwest'),
		seller_name: ko.observable('Robert Realtor'),
		seller_address: ko.observable('Robert Realtor'),
        current_list: ko.observable(''),
        days_onmarket: ko.observable(''),
        address_line_1: ko.observable(''),
        address_line_2: ko.observable(''),
        city_country: ko.observable(''),			
	};
	properties_list = [{
			'index': 0,
			'name': "Brett's Favorite",
			'location1': "3130 Old Location St.",
			'location2': "Fort Collins, CO 80305",
			'marks': 1
		}, {
			'index': 1,
			'name': "Carolyn's Favorite",
			'location1': "3130 Old Location St.",
			'location2': "Fort Collins, CO 80305",
			'marks': 2
		}, {
			'index': 2,
			'name': "The Expensive One",
			'location1': "3130 Old Location St.",
			'location2': "Fort Collins, CO 80305",
			'marks': 3
		}
	];	
	map_options = {
		location: "1841 W Briarwood Ave Littleton, CO 80120",
		width: '100%',
		height: 150,
		zoom: 15,
		provider: "google",
		mapType: "roadmap",
		markers: []
	};	
	
    viewModel.current_list("$200,000");
    viewModel.days_onmarket("23");
    viewModel.address_line_1("3130 Old Location St.");
    viewModel.address_line_2("Fort Collins, CO 80305");
    viewModel.city_country("");
    
	ELITE.app.viewShown.add(function(args) {
		if(args.viewInfo.viewName == "realestate"){
			//$('.rateit').rateit({starwidth: 32, starHeight:32});
		}
	});	
	return viewModel;
}

