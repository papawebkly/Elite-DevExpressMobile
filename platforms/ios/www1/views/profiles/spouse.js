ELITE['profile_spouse'] = function (params) {
    var viewModel = {
    	actionSheetVisible: ko.observable(false),
    	lookupRelationships: ko.observableArray([]),
		header_items: { 
			'align': 'right', 
			'template': 'nav-text', 
			'title': 'Edit',
			'id': 'spouse_editbtn',
			'action': setEditable
		},
		actionSheetProfileData: [
		    {text:"From Library", clickAction: open_library_spouse},
			{text:"From Camera", clickAction: open_camera_spouse}
		],
		spouse_id: ko.observable(0),
		creatable: ko.observable(false),
		btn_text: ko.observable(' UPDATE SPOUSE '),
		updatable: ko.observable(0),
		first_name: ko.observable(''),
        last_name: ko.observable(''),
        birth_date: ko.observable(''),
        gender: ko.observable(''),
        gender_code: ko.observable(''),
        relationship: ko.observable(''),
        relationship_code: ko.observable(''),
        spouse_exist: ko.observable(1),
        update_spouseprofile: function() {
        	var executable = true;
        	var msg = '';
        	
        	var executable = true;
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
        	
        	console.log('update profile');
            var processed_data = {
                /*"spouse_id": 1,*/
                "assignment_id": localStorage.getItem("selected_assignmentid"),
                "first_name": viewModel.first_name(),
                "last_name": viewModel.last_name(),
                "relationship_code": viewModel.relationship_code(),
                "gender_code": viewModel.gender_code(),
                /*"gender": viewModel.gender(),*/
                /*"relationship": viewModel.relationship(),*/
                "birth_date": viewModel.birth_date()
            };
            //update: PATCH, create: POST
            var methodType = "POST";
            var url = API_PROFILE_SPOUSES;
            if(parseInt(viewModel.spouse_exist()) == 1){
                methodType = 'PATCH';
                url += '/' + viewModel.spouse_id();
            }
            console.log('---------------------------------------');
            console.log('API_PROFILE_SPOUSES = ' + url);
            console.log(processed_data);
            showPleaseWait();
            $.ajax({
                url: url,
                type: methodType,
                data: JSON.stringify(processed_data),
                processData: false,
                contentType : 'application/json',
        		headers: {
        			'X-User-Email' : xuser_email,
					'X-User-Token' : xuser_token
				},
				success: function(response, textStatus, jqXhr) {
                	console.log('--success--');
                    console.log(response);
                },
				error: function(jqXHR, textStatus, errorThrown){
					formatErrorMessage(jqXHR, errorThrown);
				},
                complete: function(){
                    hidePleaseWait();
                    console.log('completed');
                    handlerCompleted();
                }
            });
        },
        spouse_camera: function(){
        	if(viewModel.readonly() == true)
        		return;
        	viewModel.actionSheetVisible(true);
        },        	
        readonly: ko.observable(true),
        spouse_photo: ko.observable(''),
        viewRendered: function(){
            console.log('viewRendered');
            var imageURI = localStorage.getItem('spouse_linkicon');
            console.log(imageURI);
            if(imageURI){
                $("#spouse_photo").attr('src', imageURI);
            }else{
            	$("#spouse_photo").attr('src', "img/avatar_noborder.png");
            }
        },
        viewShowing: function(){
            this.readonly(true);
            this.updatable(0);
            
			this.creatable(false);
			this.btn_text(' UPDATE SPOUSE ');
			var imageURI = localStorage.getItem('spouse_linkicon');
            if(imageURI){
                viewModel.spouse_photo(imageURI);
            }else{
            	viewModel.spouse_photo("img/avatar_noborder.png");
            }
        },
        viewShown: function(){
        	showPleaseWait();
			$.ajax({
				url: API_PROFILE_SPOUSES,
				dataType: 'json',
        		headers: {
        			'X-User-Email' : xuser_email,
					'X-User-Token' : xuser_token
				},
				error: function(jqXHR, textStatus, errorThrown){
					formatErrorMessage(jqXHR, errorThrown);
				},
				success: function(data) {
					console.log(data);
                    if(data){
                    	viewModel.spouse_id(data.spouse_id);
                        viewModel.first_name(data.first_name);
                        viewModel.last_name(data.last_name);
                        viewModel.birth_date(new Date(data.birth_date));
                        viewModel.gender_code(data.gender_code);
                        viewModel.gender(data.gender);
                        //console.log(data.relationship_code);
                        viewModel.relationship_code(data.relationship_code);
                        viewModel.relationship(data.relationship);
                        viewModel.spouse_exist(1);
					}else{
						viewModel.spouse_exist(0);
					}
					if(parseInt(viewModel.spouse_exist()) == 0){
						$("#spouse_editbtn .dx-button-content").html('<span class="dx-icon-addcontact dx-icon"></span>');
					}else{
						$("#spouse_editbtn .dx-button-content").html('<span class="dx-button-text">Edit</span>');
					}
					//hidePleaseWait();
					
					$.ajax({
						url: API_SPOUSE_RELATIONSHIPS,
						dataType: 'json',
		        		headers: {
		        			'X-User-Email' : xuser_email,
							'X-User-Token' : xuser_token
						},						
						error: function(jqXHR, textStatus, errorThrown){
							formatErrorMessage(jqXHR, errorThrown);
						},
						success: function(relationships_data) {
							viewModel.lookupRelationships(relationships_data);
							if(data){
								viewModel.relationship_code(data.relationship_code);
								viewModel.relationship(data.relationship);
							}
							hidePleaseWait();
						}
					});
				}
			});
		}
        	
	};
    
    function handlerCompleted(){
        viewModel.spouse_exist(1);
        setEditable();
        ELITE.app.navigate("profile", { root: true, direction: "backward" });
    }
	function setEditable(){
        if(parseInt(viewModel.spouse_exist()) == 1){
        	viewModel.btn_text(' UPDATE SPOUSE ');
        		
            var nav_caption = "Edit";
            if(viewModel.updatable() == 1){
            	// when click "Cancel" in edit mode
                viewModel.readonly(true);
                viewModel.updatable(0);
            	nav_caption = "Edit"
				var imageURI = localStorage.getItem('spouse_linkicon');
				if(!imageURI){
					viewModel.spouse_photo("img/avatar_noborder.png");
					$("#spouse_photo").attr('src', "img/avatar_noborder.png");
				}               		
            }else{
            	// when click "Edit" in read mode
            	nav_caption = "Cancel"
                viewModel.readonly(false);
                viewModel.updatable(1);                
                
				var imageURI = localStorage.getItem('spouse_linkicon');
				console.log('imageURI = ' + imageURI);
				if(!imageURI){
					console.log('spouse photo is empty');
					viewModel.spouse_photo("");
					$("#spouse_photo").attr('src', "?" + (new Date()).getTime());
				}                   
            }
            $("#spouse_editbtn .dx-button-text").text(nav_caption);
    	}else{
    		viewModel.btn_text(' CREATE SPOUSE ');
    		if(viewModel.updatable() == 1){
            	// when click "Cancel" in edit mode
            	viewModel.creatable(false);
                viewModel.readonly(true);
                viewModel.updatable(0);
				var imageURI = localStorage.getItem('spouse_linkicon');
				if(!imageURI){
					viewModel.spouse_photo("img/avatar_noborder.png");
					$("#spouse_photo").attr('src', "img/avatar_noborder.png");
				}      
				$("#spouse_editbtn .dx-button-content").html('<span class="dx-icon-addcontact dx-icon"></span>');
            }else{
            	// when click "Edit" in read mode
            	viewModel.creatable(true);
                viewModel.readonly(false);
                viewModel.updatable(1);    
				var imageURI = localStorage.getItem('spouse_linkicon');
				if(!imageURI){
					console.log('spouse photo is empty');
					viewModel.spouse_photo("");
					$("#spouse_photo").attr('src', "?" + (new Date()).getTime());
				}      
                $("#spouse_editbtn .dx-button-content").html('<span class="dx-button-text">Cancel</span>');            
            }
    	}
	}
	
    function open_library_spouse() {
        console.log('open library');
        navigator.camera.getPicture(onGetSpousePhotoSuccess, onGetSpousePhotoFail, {
            destinationType: Camera.DestinationType.FILE_URI,
            quality: 49,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY
        });
    }
    
    function open_camera_spouse() {
        console.log('open camera');
	    navigator.camera.getPicture(SpousecaptureSuccess, SpousecaptureError, {
            quality: 49,
            destinationType: Camera.DestinationType.FILE_URI
        });
        //navigator.device.capture.captureImage(SpousecaptureSuccess, SpousecaptureError, {limit:2});
    }
    
    function onGetSpousePhotoSuccess(imageURI) {
        console.log('on get photo success');
        viewModel.spouse_photo(imageURI);
        $("#spouse_photo").attr('src', imageURI);
        localStorage.setItem('spouse_linkicon', imageURI);
    }
    
    function onGetSpousePhotoFail(message) {
        console.log('Failed because: ' + message);
    }
    
    function SpousecaptureSuccess (mediaFiles) {
        $("#spouse_photo").attr('src', mediaFiles);
        viewModel.spouse_photo(mediaFiles);
        localStorage.setItem('spouse_linkicon', mediaFiles);
    	/*
        var i, path, len;
        for (i = 0, len = mediaFiles.length; i < len; i += 1) {
            path = mediaFiles[i].fullPath;
            // do something interesting with the file
            $("#spouse_photo").attr('src', path);
            viewModel.spouse_photo(path);
            localStorage.setItem('spouse_linkicon', path);
        }*/
    }
    
    // capture error callback
    function SpousecaptureError (error) {
        console.log('Error code: ' + error.code);
        showAlertError("Capturing has been failed.");
    }
    
    return viewModel;
}
