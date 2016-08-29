Elite['profile_dependentsdetail'] = function (params) {
	
	var viewModel = {
    	actionSheetVisible: ko.observable(false),    	
    	lookupRelationships: ko.observableArray(),
		header_items: { 
			'align': 'right', 
			'template': 'nav-text', 
			'title': 'Edit',
			'id': 'dependent_editbtn',
			'action': setEditable
		},
		actionSheetProfileData: [
		    {text:"From Library", clickAction: open_library_dependent},
			{text:"From Camera", clickAction: open_camera_dependent}
		],
		updatable: ko.observable(0),
        update_dependentprofile: function() {     	
        	var executable = true;
        	var msg = '';
        	if(!viewModel.first_name()){
        		executable = false;
        		msg = "Please input the first name.";
        	}else if(!viewModel.gender_code()){
        		executable = false;
        		msg = "Please select a gender.";
        	}else if(!viewModel.relationship_code()){
        		executable = false;
        		msg = "Please select a relationship.";
        	}
        	if(executable == false){
        		showAlertError(msg);
        		return;
        	}
        	
        	var dependent_id = viewModel.dependent_id();
            var processed_data = {
                "assignment_id": localStorage.getItem("selected_assignmentid"),
                "first_name": viewModel.first_name(),
                "last_name": viewModel.last_name(),
                "relationship_code": viewModel.relationship_code(),
                "gender_code": viewModel.gender_code(),
                "birth_date": viewModel.birth_date()
            };
            //update: PATCH, create: POST
            if(parseInt(dependent_id) > 0){
            	//update
                processed_data.dependent_id = dependent_id;
                dependents_store.update(dependent_id, processed_data);
            }else{
        		localStorage.setItem("dependent_fname", viewModel.first_name());
        		localStorage.setItem("dependent_lname", viewModel.last_name());            	
            	dependents_store.insert(processed_data);
            }
        },
        dependent_camera: function(){
        	if(viewModel.readonly() == true)
        		return;
        	viewModel.actionSheetVisible(true);
        },   
        	
        title: ko.observable(''),     	
        readonly: ko.observable(true),
        dependent_photo: ko.observable(''),
        			
		assignment_id: ko.observable(''),
		birth_date: ko.observable(''),
		dependent_id: ko.observable(''),
		first_name: ko.observable(''),
		gender: ko.observable(''),
		gender_code: ko.observable(''),
		last_name: ko.observable(''),
		relationship: ko.observable(''),
		relationship_code: ko.observable(''),
		
		viewShowing: function(){
			this.first_name('');
			this.gender('');
			this.gender_code('');
			this.last_name('');
			this.relationship('');
			this.relationship_code('');
			this.birth_date('');
			
            this.readonly(true);
            this.updatable(0);
            
			if(params.dependent_id == 0){
        		localStorage.setItem("dependent_pic0", "");
        		this.dependent_photo('');
        	}
		},
        viewShown: function(){
        	showPleaseWait();
        	if(params.dependent_id == 0){
        		//show screen to create a new dependent
        		$("#dependent_photo").attr('src', '?'+(new Date).getTime());
        		$("#dependent_photo").width(0);
        		viewModel.title("Add a Dependent");
        		viewModel.dependent_id(0);
                viewModel.readonly(false);
                viewModel.updatable(1);                
	            $("#dependent_editbtn").hide();  
	            getRelationships();
        		return;
        	}
        	$("#dependent_editbtn .dx-button-text").text("Edit"); 
        	$("#dependent_photo").width(100);
        	//show screen to update the dependent
        	viewModel.title("Your Dependent");
        	viewModel.dependent_id(params.dependent_id);
        	
        	console.log("View Shown Dependent ID: "+params.dependent_id);
        	dependents_store.byKey(params.dependent_id).done(function(data){
    			console.log('------------------');
				
				console.log(data);
				viewModel.assignment_id(data.assignment_id);
				viewModel.dependent_id(data.dependent_id);
				viewModel.birth_date(new Date(data.birth_date));
				viewModel.first_name(data.first_name);
				viewModel.gender(data.gender);
				viewModel.gender_code(data.gender_code);
				viewModel.last_name(data.last_name);
				viewModel.relationship(data.relationship);
				viewModel.relationship_code(data.relationship_code);
                 viewModel.title(data.first_name);
				
				imageURI = localStorage.getItem("dependent_pic"+data.dependent_id);	
				viewModel.dependent_photo((imageURI) ? imageURI : '');
	            if(imageURI){
	                $("#dependent_photo").attr('src', imageURI);
	            }else{
	            	$("#dependent_photo").attr('src', "img/avatar_noborder.png");
	            }				
				getRelationships();
        	});		
        }  
	};
    
    function getRelationships(){    
		$.ajax({
			url: API_DEPENDENT_RELATIONSHIPS,
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
        		viewModel.lookupRelationships(result);
        		hidePleaseWait();
			}
		});		    	
    }
    
    function handlerCompleted(){
    	viewModel.updatable(1)
        setEditable();
        showNotifySuccess("Saved successfully.");    	
    }    
                 
    function setEditable(){
        var nav_caption = "Edit";
        var imageURI = localStorage.getItem("dependent_pic"+viewModel.dependent_id());	
        if(viewModel.updatable() == 1){
        	// when click "Cancel" in edit mode
            viewModel.readonly(true);
            viewModel.updatable(0);
        	nav_caption = "Edit";
        	viewModel.title(viewModel.first_name());
			if(!imageURI){
				console.log('dependent photo is empty');
				viewModel.dependent_photo("img/avatar_noborder.png");
				$("#dependent_photo").attr('src', "img/avatar_noborder.png");
			}  	
        }else{
        	// when click "Edit" in read mode
        	nav_caption = "Cancel"
            viewModel.readonly(false);
            viewModel.updatable(1);                       
            viewModel.title("Edit " + viewModel.first_name());
			if(!imageURI){
				viewModel.dependent_photo("");
				$("#dependent_photo").attr('src', "?" + (new Date()).getTime());
			}
        }
        $("#dependent_editbtn .dx-button-text").text(nav_caption);    	
	}      

    function open_library_dependent() {
        console.log('open library');
        navigator.camera.getPicture(onGetDependentPhotoSuccess, onGetDependentPhotoFail, {
            destinationType: Camera.DestinationType.FILE_URI,
            quality: 49,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY
        });
    }
    
    function open_camera_dependent() {
        console.log('open camera');
        //navigator.device.capture.captureImage(DependentcaptureSuccess, DependentcaptureError, {limit:2});
	    navigator.camera.getPicture(onGetDependentPhotoSuccess, onGetDependentPhotoFail, {
            quality: 49,
            destinationType: Camera.DestinationType.FILE_URI
        });
    }
    
	function onGetDependentPhotoFail(message) {
	    console.log(message);
	}
    
    
    function onGetDependentPhotoSuccess(imageURI) {
        //console.log('on get photo success');
        $("#dependent_photo").width(100);
        viewModel.dependent_photo(imageURI);
        localStorage.setItem("dependent_pic"+viewModel.dependent_id(), imageURI);
    }
    
    function DependentcaptureSuccess (mediaFiles) {
        var i, path, len;
        for (i = 0, len = mediaFiles.length; i < len; i += 1) {
            path = mediaFiles[i].fullPath;
            // do something interesting with the file
            // $("#dependent_photo").attr('src', path);
            
            $("#dependent_photo").width(100);
            viewModel.dependent_photo(path);
            localStorage.setItem("dependent_pic"+viewModel.dependent_id(), imageURI);
        }
    }
    
    // capture error callback
    function DependentcaptureError (error) {
        console.log(error);
    }
    
	return viewModel;
}