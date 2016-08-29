ELITE['expensereportdetail_submitted'] = function (params) {
    var viewModel = {
        report_name: ko.observable(''),
        status: ko.observable(''),
        id: ko.observable(''),
        title: ko.observable('Report Detail'),
        date_received: ko.observable(''),
        submitted_currency_code: ko.observable(''),
        submitted_amount: ko.observable(''),
        payee_type: ko.observable(''),
        	
        date_from: ko.observable(''),
        date_to: ko.observable(''),
        	
        expenseitems_list: ko.observableArray([]),
        viewShowing: function(){
	        this.date_from('');
	        this.date_to('');
        	this.date_received('');
        	this.submitted_amount('');
	        this.submitted_currency_code('');
	        this.payee_type('');
        },
        viewShown: function(){
        	viewModel.id(params.voucher_id);
        	
        	console.log("View Shown Voucher ID: "+params.voucher_id);
        	showPleaseWait();
        	expensereports_submitted_store.byKey(params.voucher_id).done(function(data){
        		console.log(data);
                if(data.description) {
                    viewModel.report_name(data.description);
                } else {
                     viewModel.report_name("Unnamed");
                }
		        viewModel.date_from(formatDate(data.date_from));
		        viewModel.date_to(formatDate(data.date_to));
		        viewModel.date_received(formatDate(data.date_received));
				
			   	if(data.payee_type)
		        	viewModel.payee_type(data.payee_type);
		        if(data.submitted_currency_code)
					viewModel.submitted_currency_code(data.submitted_currency_code);
				if(data.submitted_amount)
		        	viewModel.submitted_amount(parseFloat(data.submitted_amount).toFixed(2));
                if(data.status)
                    viewModel.status(data.status);
		        
		        for(i=0; i<data.assignment_expense_items.length; i++){
			    	data.assignment_expense_items[i].submitted_amount = parseFloat(data.assignment_expense_items[i].submitted_amount).toFixed(2);			    	
			    }
			    viewModel.expenseitems_list(data.assignment_expense_items);
		        viewModel.title(viewModel.report_name());
				hidePleaseWait();
        	});
		}        	
    };
    return viewModel;
};

