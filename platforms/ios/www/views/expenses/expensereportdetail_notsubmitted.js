Elite['expensereportdetail_notsubmitted'] = function (params) {
    var viewModel = {
		header_items: { 
			'align': 'right', 
			'template': 'nav-text', 
			'title': 'Edit',
			'id': 'expensereport_editbtn',
			'action': setEditable
		},    	
		updatable: ko.observable(0),
		readonly: ko.observable(true),
		deletable: ko.observable(false),
		
        report_name: ko.observable(''),
        status: ko.observable('Not Submitted'),
        id: ko.observable(''),
        title: ko.observable(''),
        date_received: ko.observable(''),
        submitted_currency_code: ko.observable(''),
        submitted_amount: ko.observable(''),
        	
        date_from: ko.observable(''),
        date_to: ko.observable(''),
        	
		currencies: ko.observable(''),
		currency: ko.observable(''),
		currency_code: ko.observable(''),
        btn_txt: ko.observable(''),
        expenseitems_list: ko.observableArray([]),	
        has_expenseitems: ko.observable(),
        	
        submit_expensereport: function(){
        	console.log('- submit_expensereport -');
		    var result = DevExpress.ui.dialog.confirm("Are you ready to submit this expense report?", "Confirm");
		    result.done(function (dialogResult) {
		        if(dialogResult){
			        processed_data = {
			        	"expense_report" : { "status" : "pending" }
			        };
					console.log(processed_data);					
					var id = viewModel.id();
					console.log(id);
					expensereports_notsubmitted_store.update(id, processed_data);
		        }
		    });        	
        },
        
        viewShowing: function(){
        	this.has_expenseitems();
        	this.id(params.id);
			this.updatable(0);
			this.readonly(true);
			this.deletable(false);
			if(parseInt(params.id) > 0){
				this.deletable(true);
			}
			
			this.title('');
			this.currency_code('');
			this.date_from('');
			this.date_to('');
        },
        	
        viewShown: function(){
        	$("#expensereport_editbtn .dx-button-text").hide();
			$("#expensereport_editbtn .dx-button-text").text("Edit");        	
        	
        	console.log("View Shown ID: "+params.id);
        	showPleaseWait();
        	if(parseInt(params.id)){
        		viewModel.btn_txt(" UPDATE REPORT ");
	        	expensereports_notsubmitted_store.byKey(params.id).done(function(data){
	        		console.log(data);
	        		viewModel.date_from(new Date(data.date_from));
			        viewModel.date_to(new Date(data.date_to));
			        viewModel.title(data.description);
			        viewModel.currency_code(data.currency_id);
			        
			        for(i=0; i<data.expense_items.length; i++){
			            data.expense_items[i].expense_amount = parseFloat(data.expense_items[i].expense_amount).toFixed(2);			    	
			        }
			       
			        viewModel.expenseitems_list(data.expense_items);
					if(data.status){
						viewModel.status((data.status) ? data.status : '');
					}
					else {
						viewModel.status('Not Submitted');
					}
/*			        if(data.status != "pending"){
			        	$("#expensereport_editbtn .dx-button-text").show();
			        }*/
			        var has_expenseitems = (data.expense_items.length) ? true : false;
			        viewModel.has_expenseitems(has_expenseitems);
			        /*
					viewModel.submitted_currency_code(data.submitted_currency_code);
					viewModel.date_received(formatDate(data.date_received));
			        viewModel.submitted_amount(parseFloat(data.submitted_amount).toFixed(2));
			        */
					$("#expensereport_editbtn .dx-button-text").show();
					loadData();
	        	});
        	}else{
				this.updatable(1);
				this.readonly(false);        		
        		$("#expensereport_editbtn .dx-button-text").text("Cancel");
        		$("#expensereport_editbtn .dx-button-text").show();
				viewModel.btn_txt(" CREATE REPORT ");
				loadData();
        	}
		},
		delete_expensereport: function(){
			console.log('delete_expensereport');
			var obj = this;
			var result = DevExpress.ui.dialog.confirm("Are you sure to delete?", "Confirm changes");
			var key = obj.id();
			console.log('id = '+key);
			result.done(function (dialogResult) {
				if(dialogResult){
					expensereports_notsubmitted_store.remove(key);
				}
			});
		},
		update_expensereport: function(){
			/*
				#  assignment_id  :integer
				#  currency_id    :integer
				#  description    :string(255)
				#  date_from      :date
				#  date_to        :date
				#  submitted      :boolean
				#  date_submitted :datetime
				#  created_at     :datetime
				#  updated_at     :datetime				
			*/
			processed_data = {
				assignment_id: localStorage.getItem("selected_assignmentid"),
				date_from: viewModel.date_from(),
				date_to: viewModel.date_to(),
				description: viewModel.title(),
				currency_id: viewModel.currency_code()
			};
			console.log(processed_data);
			var executable = true;
        	if(!viewModel.title()){
        		executable = false;
        		msg = "Please input the description.";
        	}else if(!viewModel.currency_code()){
        		executable = false;
        		msg = "Please select a currency.";
        	}else if(!viewModel.date_from()){
        		executable = false;
        		msg = "Please select a date from.";
        	}else if(!viewModel.date_to()){
        		executable = false;
        		msg = "Please select a date to.";
        	}
        	if(executable == false){
        		showAlertError(msg);
        		return;
        	}			

			var id = parseInt(this.id());
            console.log("id = "+id);
			if(id == 0){
				console.log("--- insert ---");
				expensereports_notsubmitted_store.insert(processed_data);
			}else{
                console.log("--- update ---");
				expensereports_notsubmitted_store.update(id, processed_data);
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
        $("#expensereport_editbtn .dx-button-text").text(nav_caption);
	}    
	
	function loadData(){
		$.ajax({
			url: API_CURRENCIES,
			type: 'GET',
			contentType : 'application/json',
			headers: {
			   'X-User-Email' : xuser_email,
			   'X-User-Token' : xuser_token
			},
			success: function(result){
        		viewModel.currencies(result);
        		hidePleaseWait();   							
			}
		});		
	}
    return viewModel;
};

