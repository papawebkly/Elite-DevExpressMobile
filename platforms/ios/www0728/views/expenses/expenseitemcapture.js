Elite['expenseitemcapture'] = function (params) {
    var viewModel = {
    	/*
		header_items: { 
			'align': 'right', 
			'template': 'nav-text', 
			'title': 'Edit',
			'id': 'expenseitem_editbtn',
			'action': setEditable
		},*/    	
		id: ko.observable(''),
		updatable: ko.observable(0),
		readonly: ko.observable(true),
		deletable: ko.observable(false),
				
		vendor_name: ko.observable(''),
		expense_amount: ko.observable(''),
        expense_date: ko.observable(''),
        image_uri: ko.observable(''),
        currency_code: ko.observable(),
        account_id: ko.observable(),
        category_id: ko.observable(),
    	
    	showCreateReceiptSuccess: ko.observable(false),
    	showCreateReceiptError: ko.observable(false),
    	/*expense_report_id: ko.observable(''),*/
    	/*expensereportslist_data: ko.observableArray([]),*/
    	
    	pre_imageuri: ko.observable(''),
    		
    	add_receiptimage: function(){
    		if(viewModel.readonly() == true)
    			return;
            viewModel.actionSheetVisible(true);
    	},
    	create_receipt: function(){
    	},
    	delete_expenseitem: function(){
    		console.log('delete_expenseitem');
			var obj = this;
			var result = DevExpress.ui.dialog.confirm("Are you sure to delete?", "Confirm changes");
			var key = obj.id();
			console.log('id = '+key);
			result.done(function (dialogResult) {
				if(dialogResult){
					expenseitems_store.remove(key);
				}
			});
    	},
		update_expenseitem: function(){
            console.log('update_expenseitem');
            
        	var executable = true;
        	var msg = '';
        	if(!viewModel.vendor_name()){
        		executable = false;
        		msg = "Please input the vendor name.";
        	}else if(!viewModel.account_id()){
        		executable = false;
        		msg = "Please select a account.";
        	}else if(!viewModel.expense_amount()){
        		executable = false;
        		msg = "Please input the expense amount.";
        	}else if(!viewModel.currency_code()){
        		executable = false;
        		msg = "Please select a currency.";
        	}else if(!viewModel.expense_date()){
        		executable = false;
        		msg = "Please select a expense date.";
        	}else if(!viewModel.image_uri()){
        		executable = false;
        		msg = "Please add a receipt image.";
        	}
        	if(executable == false){
        		showAlertError(msg);
        		return;
        	}            
            
            var processed_data = {
            	/*'expense_item[expense_report_id]': viewModel.expense_report_id(),*/
                'expense_item[image]': viewModel.image_uri(),
                'expense_item[vendor_name]': viewModel.vendor_name(),
                'expense_item[currency_id]': viewModel.currency_code(),
                'expense_item[expense_account_id]': viewModel.account_id(),
                'expense_item[expense_date]': viewModel.expense_date(),
                'expense_item[expense_amount]': viewModel.expense_amount()
            };
            console.log('amount = ' + viewModel.expense_amount);
            
            var imageURI = viewModel.image_uri();
            if(imageURI != "" && imageURI != viewModel.pre_imageuri()){
            	console.log(processed_data);
	            var options = new FileUploadOptions();
	            options.fileKey="expense_item[image]";
	            options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
	            options.mimeType="image/jpeg";
	            
	            //opt_params = processed_data;
	            //var params = new Object();
	            options.headers = {
	                'X-User-Email' : xuser_email,
	                'X-User-Token' : xuser_token
	            };
	            options.params = processed_data;
	            
	            var ft = new FileTransfer();
	            
	            var url = API_EXPENSE_ITEMS;
	            var item_id = parseInt(this.id());
	            if(item_id > 0){
	                url = API_EXPENSE_ITEMS + "/" + item_id;
	                options.httpMethod="PUT";
	            }
	            console.log("API_EXPENSE_ITEMS = " + url);
	            console.log(options);
	            
	        	showPleaseWait();
	            ft.upload(viewModel.image_uri(), url, win_upload, fail_upload, options);
        	}else{
	            var processed_data = {
	            	"expense_item": {
		            	/*"expense_report_id": viewModel.expense_report_id(),*/
		                "vendor_name": viewModel.vendor_name(),
		                "currency_id": viewModel.currency_code(),
		                "expense_account_id": viewModel.account_id(),
		                "expense_date": viewModel.expense_date(),
		                "expense_amount": viewModel.expense_amount()
	            	}
	            };
        		
        		var item_id = parseInt(this.id());
        		showPleaseWait();
				if(item_id == 0){
					console.log("--- insert ---");
					expenseitems_store.insert(processed_data);
				}else{
	                console.log("--- update ---");
					expenseitems_store.update(item_id, processed_data);
				}
        	}
            /*
			processed_data = {
                assignment_id: localStorage.getItem("selected_assignmentid"),
                
                vendor_name: viewModel.vendor_name(),
                expense_date: viewModel.expense_date(),
                expense_amount: viewModel.expense_amount(),
                
                expense_account_id: viewModel.account_id(),
                currency_id: viewModel.currency_code(),
                image: viewModel.image_uri()
			};
			console.log('Expense item data: ');
			console.log(processed_data);
			var id = parseInt(this.id());
            console.log("id = "+id);
			if(id == 0){
				console.log("--- insert ---");
				expenseitems_store.insert(processed_data);
			}else{
                console.log("--- update ---");
				expenseitems_store.update(id, processed_data);
			}*/
		},
    	actionSheetVisible: ko.observable(false),
		actionSheetExpenseItemData: [
		    {text:"From Library", clickAction: open_eic_library},
			{text:"From Camera", clickAction: open_eic_camera}
		],  
		currencies: ko.observable(),
		accounts: ko.observable(),
		categories: ko.observable(),
		currency: ko.observable(),
		
        btn_txt: ko.observable('Update Receipt'),
		
		init: function(){
        	this.pre_imageuri('');
        	this.image_uri('');
        	
			this.vendor_name('');
			this.expense_amount('');
	        this.expense_date('');
	        this.currency_code('');
	        this.account_id('');
	        
			this.updatable(1);
			this.readonly(false);
			this.deletable(false);				
			viewModel.btn_txt('Create Receipt');
		},
        viewShowing: function(){
        	this.init();
        	/*
	        //this.expense_report_id('');
        	
			if(parseInt(params.id) == 0){
				this.updatable(1);
				this.readonly(false);
				this.deletable(false);				
				viewModel.btn_txt('Create Receipt');
			}else{
				this.updatable(0);
				this.deletable(true);
				this.readonly(true);
				viewModel.btn_txt('Update Receipt');
			}
			*/
        },			
		viewShown: function(){
			$("#expenseitem_editbtn .dx-button-text").text("Edit");
        	end = 0;
        	console.log('--- params ---');
        	console.log(params);
        	console.log("View Shown ID: "+params.id);
        	showPleaseWait();
        	viewModel.id(params.id);
        	loadData(params.id);
        	if(parseInt(params.id)){
        		$("#expenseitem_editbtn").show();
			}else{
				$("#expenseitem_editbtn").hide();
			}
		}
	};
	
	end = 0;
	function readyStart(param_id){
		console.log(end);
		if(end == 2){
			if(parseInt(param_id) == 0)
				hidePleaseWait();
			else{
	        	expenseitems_store.byKey(param_id).done(function(data){
	        		console.log('-expenseitems_store.byKey-');
					console.log(data);
					/*viewModel.expense_report_id(data.expense_report_id);*/
	                viewModel.vendor_name(data.vendor_name);
					viewModel.image_uri(data.thumb_url);
					viewModel.pre_imageuri(data.thumb_url);
					viewModel.expense_amount(data.expense_amount);
					viewModel.category_id(data.expense_category_id);
					viewModel.account_id(data.expense_account_id);
					viewModel.currency_code(data.currency_id);
					viewModel.expense_date(new Date(data.expense_date));
					//loadData();
					hidePleaseWait();
				});	
			}	
		}
	}   	
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
	
	function loadData(param_id){
		/*
        $.ajax({
			url: API_EXPENSE_REPORTS,
			type: 'GET',
			contentType : 'application/json',
			headers: {
			   'X-User-Email' : xuser_email,
			   'X-User-Token' : xuser_token
			},			
			error: function(jqXHR, textStatus, errorThrown){
				formatErrorMessage(jqXHR, errorThrown);
			},
			success: function (result) {  
            	viewModel.expensereportslist_data(result.not_submitted);
        		end++;
        		readyStart(param_id);              	
        	}
        });
        */
		$.ajax({
			url: API_CURRENCIES,
			type: 'GET',
			contentType : 'application/json',
			headers: {
			   'X-User-Email' : xuser_email,
			   'X-User-Token' : xuser_token
			},
			error: function(jqXHR, textStatus, errorThrown){
				formatErrorMessage(jqXHR, errorThrown);
			},
			success: function(result){
        		viewModel.currencies(result);
        		end++;
        		readyStart(param_id);   							
			}
		});
		/*
		$.ajax({
			url: API_EXPENSE_CATEGORIES,
			type: 'GET',
			contentType : 'application/json',
			headers: {
			   'X-User-Email' : xuser_email,
			   'X-User-Token' : xuser_token
			},
			error: function(jqXHR, textStatus, errorThrown){
				formatErrorMessage(jqXHR, errorThrown);
			},
			success: function(result){
				console.log(' --- Expense Categories --- ');
        		viewModel.categories(result);
        		end++;
        		readyStart();   							
			}
		});*/
		$.ajax({
			url: API_EXPENSE_ACCOUNTS,
			type: 'GET',
			contentType : 'application/json',
			headers: {
			   'X-User-Email' : xuser_email,
			   'X-User-Token' : xuser_token
			},
			error: function(jqXHR, textStatus, errorThrown){
				formatErrorMessage(jqXHR, errorThrown);
			},
			success: function(result){
				//console.log(' --- Expense Accounts --- ');
				/*
				    {
				        "account_id": 251,
				        "account_description": "Home Visits (Intl) and Return Trips (Domestic)",
				        "account_category_code": "EQATTH"
				    },
				*/
				//console.log(result);
        		viewModel.accounts(result);
        		end++;
        		readyStart(param_id);   							
			}
		});
	}
	
	function open_eic_library() {
	    console.log('open library');
	    navigator.camera.getPicture(onGetEICPhotoSuccess, onGetEICPhotoFail, {
	        destinationType: Camera.DestinationType.FILE_URI,
	        quality: 49,
	        sourceType: Camera.PictureSourceType.PHOTOLIBRARY
	    });
	}

	function open_eic_camera() {
	    console.log('open camera');
	    navigator.camera.getPicture(captureEICSuccess, captureEICError, {
	        destinationType: Camera.DestinationType.FILE_URI,
	        quality: 49
	    });
	    //navigator.device.capture.captureImage(captureEICSuccess, captureEICError, {limit:2});
	}

	function onGetEICPhotoSuccess(imageURI) {
	    console.log('on get photo success');
	    $("#expenseitem_photo").attr('src', imageURI);
	    viewModel.image_uri(imageURI);
	}

	function onGetEICPhotoFail(message) {
	    console.log('Failed because: ' + message);
	}
	function captureEICSuccess (mediaFiles) {
		console.log('captureEICSuccess');
		console.log(mediaFiles);
        $("#expenseitem_photo").attr('src', mediaFiles);
        viewModel.image_uri(mediaFiles);
		/*
	    var i, path, len;
	    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
	        path = mediaFiles[i].fullPath;
	        // do something interesting with the file
	        $("#expenseitem_photo").attr('src', path);
	        viewModel.image_uri(path);
	    }*/
	}

	// capture error callback
	function captureEICError (error) {
		console.log('Error code: ' + error.code);
		showAlertError("Camera failed.");
	    //console.log('Error code: ' + error.code, null, 'Capture Error');
	}
    
    function win_upload(r){
        console.log('Success: Uploading');
        console.log(r);
        hidePleaseWait();
        viewModel.showCreateReceiptSuccess(true);
		viewModel.init();
		
		var $image = $('#expenseitem_photo');
		$image.removeAttr('src').replaceWith($image.clone());
        //ELITE.app.navigate("expenseitemslist", { root: true, direction: "backward" });
    }
    function fail_upload(error){
        console.log('Failed: Uploading');
        console.log(error);
        hidePleaseWait();
        //showAlertError('Upload failed!');
        viewModel.showCreateReceiptError(false);
    }
	return viewModel;
}

