 
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
		expenseTabs: ko.observableArray(),
		selectedTabIndex: ko.observable(0),
		currentId:ko.observable(),

		expensereportslist1_data : new DevExpress.data.DataSource({
    		store: expensereportslist_submitted_store,
			filter:4
		}),
		expensereportslist2_data : new DevExpress.data.DataSource({
    		store: expensereportslist_submitted_store,
			filter:2
		}),
		expensereportslist3_data : new DevExpress.data.DataSource({
    		store: expensereportslist_submitted_store,
			filter:1
		}),

		viewShowing: function(opt){
			console.log(' expense reports list - view showing');
			$(".layout-header").addClass("changerelocation-header-bg");
			$(".dx-scrollable-content").addClass("changerelocation-body-bg");
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

			viewModel.expenseTabs([
		   		{ text: "Locked" },
				{ text: "In Process" },
				{ text: "Approved"}
			]);

			viewModel.selectedTabIndex(0);
		},
		itemSelectAction: function(e){
			//console.log(viewModel.selectedTabIndex());
			var cur_tabindex = viewModel.selectedTabIndex();
			//canGoTab(cur_tabindex);
			/*if(cur_tabindex == 0)
			{
				viewModel.expensereportslist2_data(new DevExpress.data.DataSource({
    				store: expensereportslist_submitted_store,
					filter:4
				}));
			}
			else if(cur_tabindex == 1)
			{
				viewModel.expensereportslist2_data(new DevExpress.data.DataSource({
    				store: expensereportslist_submitted_store,
					filter:2
				}));
			}
			else
			{
				viewModel.expensereportslist2_data(new DevExpress.data.DataSource({
    				store: expensereportslist_submitted_store,
					filter:1
				}));
			}*/
		},
		
	}
	return viewModel;    
};

