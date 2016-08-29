Elite['expenseitemdetail'] = function (params) {
    var viewModel = {
		header_items: { 
			'align': 'right', 
			'template': 'nav-text', 
			'title': 'Edit',
			'id': 'expenseitem_editbtn',
			'action': setEditable
		},    	
		updatable: ko.observable(0),
		readonly: ko.observable(true),
		
        vendor_name: ko.observable(''),
        expense_date: ko.observable(''),
        id: ko.observable(''),
        expense_amount: ko.observable(''),

        viewShowing: function(){
			this.updatable(0);
			this.readonly(true);
        },
        viewShown: function(){
        	viewModel.id(params.id);
        	
        	console.log("View Shown Voucher ID: "+params.id);
        	showPleaseWait();
        	expenseitems_store.byKey(params.id).done(function(data){
        		console.log(data);
		        viewModel.vendor_name(data.vendor_name);
		        viewModel.expense_date(data.expense_date);
		        viewModel.expense_amount(data.expense_amount);
		        /*
		        viewModel.status(data.status);
				viewModel.submitted_currency_code(data.submitted_currency_code);
				viewModel.date_received(formatDate(data.date_received));
		        viewModel.submitted_amount(parseFloat(data.submitted_amount).toFixed(2));
		        */
				hidePleaseWait();
        	});
		},
		update_expenseitem: function(){
			processed_data = {
				vendor_name: viewModel.vendor_name(),
				expense_date: viewModel.expense_date(),
				expense_amount: viewModel.expense_amount()
			};
			console.log(processed_data);
			var id = parseInt(this.id());
            console.log("id = "+id);
			if(id == 0){
				console.log("--- insert ---");
				expenseitems_store.insert(processed_data);
			}else{
                console.log("--- update ---");
				expenseitems_store.update(id, processed_data);
			}
		}
    };
    
	function setEditable(){
        var nav_caption = "Edit";
        if(viewModel.updatable() == 1){
        	// when click "Cancel" in edit mode
            viewModel.readonly(true);
            viewModel.updatable(0);
        	nav_caption = "Edit"
        }else{
        	// when click "Edit" in read mode
        	nav_caption = "Cancel"
            viewModel.readonly(false);
            viewModel.updatable(1);                
        }
        $("#expenseitem_editbtn .dx-button-text").text(nav_caption);
	}    
    return viewModel;
};

