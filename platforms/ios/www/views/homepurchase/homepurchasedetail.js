/**
 * Created by alanruth on 11/8/13.
 */
Elite['homepurchasedetail'] = function (params) {
    var viewModel = {
		header_items: { 
			'align': 'right', 
			'id': 'coordinator_addbtn',
			'template': 'nav-save', 
			'action': '#homeshowingadd/1'
		},
		viewShowing: function(){
			$(".layout-header").addClass("changerelocation-header-bg");
			$(".dx-scrollable-content").addClass("changerelocation-body-bg");
        },
		viewShown: function(){
			console.log("ViewShown - " + params.id);
			localStorage.setItem('homeshowing_id', params.id);
			showPleaseWait();
			homeshowing_store.byKey(params.id).done(function(result){
				console.log(result);
				var data = result.home_showing;
				
				loc = "";
				if(data.latitude && data.longitude)
					loc = data.latitude + ","+data.longitude;
				else{
					if(data.address_line_1)
						loc = data.address_line_1;
					if(data.address_line_2)
						loc += ","+data.address_line_2;
				}
				/*
			    $("#housing_map").dxMap("instance").option({
			        location: loc,
			        markers: [{ location: loc }]
			    });				*/
			    viewModel.latitude(data.latitude);
			    viewModel.longitude(data.longitude);
			    
                viewModel.address_line_1(data.address_line_1);
                viewModel.address_line_2(data.address_line_2);
				viewModel.postal_code(data.postal_code);
                viewModel.state_code(data.state_code);
                viewModel.country_code(data.country_code);
                                                    
			    viewModel.city_country(data.city + ', '+ data.country_code);
				
				var city_state_zip = "";
				if(data.city)
					city_state_zip = data.city;
				if(data.state_code){
					if(city_state_zip)
						city_state_zip += ", ";
					city_state_zip += data.state_code;
				}
				if(data.postal_code){
					if(city_state_zip)
						city_state_zip += " ";
					city_state_zip += data.postal_code;
				}
					
				viewModel.city_state_zip(city_state_zip);
			    if(!data.price)
			    	data.price = 0;
			    viewModel.asking((parseFloat(data.price).toFixed(0)));
			    viewModel.your_score(data.rating);
			   	viewModel.title(data.nickname);
			    $('#homepurchasedetail_page .rateit').rateit();
			    
				var gallery_data = [];
				if(result.pic_detail.length){
					for(var i=0; i<result.pic_detail.length; i++){
						gallery_data.push(result.pic_detail[i].thumb_url);
					}
				}
				viewModel.galleryData(gallery_data);
			    
			    console.log("address1 = " + data.address_line_1);
			    console.log("address2 = " + data.address_line_2);
			    console.log("city_state_zip = " + city_state_zip);
				hidePleaseWait();
			});
		},
		latitude: ko.observable(''),
        longitude: ko.observable(''),
        
	    title: ko.observable('Detail'),
        asking: ko.observable(''),
        your_score: ko.observable(''),
        address_line_1: ko.observable(''),
        address_line_2: ko.observable(''),
        state_code: ko.observable(''),
        city: ko.observable(''),
        country_code: ko.observable(''),
		postal_code: ko.observable(''),
        city_country: ko.observable(''),
		city_state_zip: ko.observable(''),
		galleryData: ko.observableArray([]),
		goHMap: function(){
			var q = "";
			if(viewModel.latitude && viewModel.longitude){
				q=viewModel.latitude() + " " + viewModel.longitude();
			}
			else {
			
				if(viewModel.address_line_1()){
					q = viewModel.address_line_1();
				}
				if(viewModel.address_line_2()){
					if(q)
						q += " ";
					q += viewModel.address_line_2();
				}
				if(viewModel.city()){
					if(q)
						q += " ";
					q += viewModel.city();
				}
				if(viewModel.state_code()){
					if(q)
						q += " ";
					q += viewModel.state_code();
				}
				if(viewModel.postal_code()){
					if(q)
						q += " ";
					q += viewModel.postal_code();
				}
				if(viewModel.country_code()){
					if(q)
						q += " ";
					q += viewModel.country_code();
				}
			}
			window.open("http://maps.apple.com/maps?q="+q, '_system');
		},
		goBack: function(){
			console.log(' *** go back to homepurchase page');
			Elite.app.navigate('homepurchase', {direction: 'backward', root: true});
		},
		detail_links: [{
				index: 1,
				icon: 'img/Picture_Mountains.png',
				caption: 'Upload Photos',
				action: '#hoepurchasedetail_pictures'
			},{
				index: 2,
				icon: 'img/Notepad.png',
				caption: 'Notes',
				action: '#hoepurchasedetail_notes'
			}/*,{
				index: 3,
				icon: 'img/Notepad.png',
				caption: 'Local Schools',
				action: '#'
			}*/]
	};
	return viewModel;
}