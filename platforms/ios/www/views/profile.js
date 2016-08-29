Elite['profile'] = function (params) {
    var viewModel = {
    	actionSheetVisible: ko.observable(false),
        /*
		header_items: { 
			'align': 'right', 
			'template': 'nav-text', 
			'title': 'Edit',
			'id': 'profile_editbtn',
			'action': function setEditable(){
                //profile camera
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
	            $("#profile_editbtn .dx-button-text").text(nav_caption);
                
			}
		},*/
		actionSheetProfileData: [
		    {text:"From Library", clickAction: open_library},
			{text:"From Camera", clickAction: open_camera}
		],
        updatable: ko.observable(0),
		profile_image: ko.observable(''),
		first_name: ko.observable(''),
        last_name: ko.observable(''),
        email: ko.observable(''),
        phone: ko.observable(''),
        mobile: ko.observable(''),
        update_profile: function() {
        	console.log('update profile');
        },
        readonly: ko.observable(true),
        profile_camera: function(){
        	viewModel.actionSheetVisible(true);
        },
        profile_photo: ko.observable(''),
        viewRendered: function(){
            //console.log('viewRendered');
        },
        viewShowing: function(){
			$(".layout-header").addClass("changerelocation-header-bg");
			$(".dx-scrollable-content").addClass("changerelocation-body-bg");
			
        	var first_name = localStorage.getItem("first_name");
        	var last_name = localStorage.getItem("last_name");
        	if(first_name)
        		viewModel.first_name(first_name);
        	if(last_name)
        		viewModel.last_name(last_name);
        },
        viewShown: function(){
            var imageURI = localStorage.getItem('profile_photo');
            if(imageURI){
                viewModel.profile_photo(imageURI);
                $("#profile_photo").attr('src', imageURI);
            }
            viewModel.renderedProfileLinks();
        },
        renderedProfileLinks: function(){
            //console.log('renderedProfileLinks');
            var spouse_linkicon = localStorage.getItem('spouse_linkicon');
            if(spouse_linkicon){
            	$("#spouse_linkicon").attr('src', spouse_linkicon+'?'+(new Date()).getTime());
            }
        }
	};

	function open_library() {
	    console.log('open library');
	    navigator.camera.getPicture(onGetProfilePhotoSuccess, onGetProfilePhotoFail, {
	        destinationType: Camera.DestinationType.FILE_URI,
            quality: 49,
	        sourceType: Camera.PictureSourceType.PHOTOLIBRARY
	    });
	}

	function open_camera() {
	    console.log('open camera');
	    
	    navigator.camera.getPicture(onGetProfilePhotoSuccess, onGetProfilePhotoFail, {
            quality: 49,
	        destinationType: Camera.DestinationType.FILE_URI
	    });
	    //navigator.device.capture.captureImage(captureSuccess, captureError);
	}

	function onGetProfilePhotoSuccess(imageURI) {
	    console.log('on get photo success');
	    //$("#profile_photo").attr('src', "data:image/jpeg;base64," + imageData);
	    //$("#profile_photo").attr('src', imageURI);
	    viewModel.profile_photo(imageURI);
	    localStorage.setItem('profile_photo', imageURI);
	    if(imageURI)
	    	$("#nav_profile_photo").attr('src', imageURI);
	    $("#profile_photo").attr('src', imageURI);
	}

	function onGetProfilePhotoFail(message) {
	    console.log(message);
	}

	function captureSuccess (mediaFiles) {
	    var i, path, len;
	    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
	        path = mediaFiles[i].fullPath;
	        // do something interesting with the file
	        console.log(path);
	        viewModel.profile_photo(path);
	        localStorage.setItem('profile_photo', path);
	        $("#profile_photo").attr('src', path);
	        if(path)
	        	$("#nav_profile_photo").attr('src', path);
	    }
	}

	// capture error callback
	function captureError (error) {
	    //showAlertError('Error code: ' + error.code);
	}

	profile_links = [
		{
            'id': 'spouse_linkicon',
			'icon': 'spouse_icon.png',
			'caption': 'Your Spouse',
			'action': '#profile_spouse'
		},
		{
            'id': 'dependent_linkicon',
			'icon': 'dependents_icon.png',
			'caption': 'Your Dependents',
			'action': '#profile_dependents'
		},
		{
            'id': 'spouse_linkicon',
			'icon': 'contacts_icon.png',
			'caption': 'Your Contacts',
			'action': '#profile_contacts'
		},
		{
            'id': 'spouse_linkicon',
			'icon': 'Signposts.png',
			'caption': 'Your Addresses',
			'action': '#profile_addresses'
		},
	];
	
    return viewModel;	
};

