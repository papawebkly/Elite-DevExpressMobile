Elite['expensereportslist'] = function (params) {
	var viewModel = {
		/*
		header_items: {
			align: 'center', 
			widget: 'tabs', 
			options: { 
				dataSource: [
					{ text: "Not Submitted", index: 0 },
					{ text: "Submitted", index: 1 }
				],
				selectedIndex: 0,
				itemClickAction: function(data){
					var selected_tabindex = data.itemData.index;
					console.log(selected_tabindex);
					$(".expensereports").hide();
					$("#expensereport" + selected_tabindex).show();
					$(".expensereport_desc").hide();
					$("#expensereport_desc"+selected_tabindex).show();
					if(parseInt(selected_tabindex) == 0){
						$("#notsubmitted_addbtn").show();
					}else
						$("#notsubmitted_addbtn").hide();
				}
       		},  
		},*/
//		header_extra_item: {
//			'align': 'right', 
//			'template': 'nav-addcontact', 
//			'action': '#expensereportdetail_notsubmitted/0',
//			'id': 'notsubmitted_addbtn'
//		},	
//		setHeight: function(){
//			var baseHeight = screen.height;//$(".layout-content").height();
//			return (baseHeight - 132 + "px");
//		},
		viewShowing: function(opt){
			console.log(' expense reports list - view showing');
			/*
			console.log(opt.direction);
			viewModel.expensereportslist1_data(new DevExpress.data.DataSource({
	    		store: expensereportslist_nonsubmitted_store
			}));
			
			if(opt.direction != "backward"){
				viewModel.expensereportslist2_data(new DevExpress.data.DataSource({
		    		store: expensereportslist_submitted_store
				}));		
			}
			*/
		},
		expensereportslist1_data : ko.observable(),
		expensereportslist2_data : new DevExpress.data.DataSource({
    		store: expensereportslist_submitted_store
		})
	}
	return viewModel;    
};

