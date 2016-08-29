Elite['expenseitemslist'] = function (params) {
	var viewModel = {
		header_items: {
			align: 'center', 
			widget: 'tabs', 
			options: { 
				dataSource: [
					{ text: "Unattached", index: 0 },
					{ text: "Not Submitted", index: 1 }
				],
				selectedIndex: 0,
				itemClickAction: function(data){
					var selected_tabindex = data.itemData.index;
					console.log(selected_tabindex);
					$(".expenseitems").hide();
					$("#expenseitem" + selected_tabindex).show();
					$(".expenseitem_desc").hide();
					$("#expenseitem_desc"+selected_tabindex).show();
					/*
					if(parseInt(selected_tabindex) == 0){
						$("#expenseitem_addbtn").show();
					}else
						$("#expenseitem_addbtn").hide();
					*/
				}
       		},  
		},
		header_extra_item: {
			'align': 'right', 
			'template': 'nav-addcontact', 
			'action': '#expenseitemcapture/0',
			'id': 'expenseitem_addbtn'
		},
		setHeight: function(){
			var baseHeight = screen.height;//$(".layout-content").height();
			return (baseHeight - 132 + "px");
		},
		expenseitemslist1_data : ko.observableArray([]),
		expenseitemslist2_data : ko.observableArray([]),
	
		viewShowing: function(opt){
			console.log(' expense items list - view showing');
            //console.log(API_EXPENSE_ITEMS);
            //console.log('email = '+xuser_email);
            //console.log('token = '+xuser_token);
			//console.log(opt.direction);
			viewModel.expenseitemslist1_data(new DevExpress.data.DataSource({
	    		store: expenseitems_store,
	    		filter: "unattached"
			}));
			viewModel.expenseitemslist2_data(new DevExpress.data.DataSource({
	    		store: expenseitems_store,
	    		filter: "notsubmitted"
			}));
		}
	}
	return viewModel;    
};

