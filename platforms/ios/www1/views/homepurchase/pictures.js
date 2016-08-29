ELITE['hoepurchasedetail_pictures'] = function (params) {
	var viewModel = {
		header_items: { 
			'align': 'right', 
			'id': 'homeshowingpicture_addbtn',
			'template': 'nav-picupload', 
			'action': function(){
				viewModel.actionSheetVisible(true);
			}
		},
		actionSheetVisible: ko.observable(false),
		actionSheetPictureData: [
		    {text:"From Library", clickAction: open_library_picture},
			{text:"From Camera", clickAction: open_camera_picture}
		],				
		image: ko.observable(''),
		pictureslist_data: ko.observable(),
		loadListData: function(){
			console.log(' homeshowing pictures list - view shown');
			viewModel.pictureslist_data(new DevExpress.data.DataSource({
	    		store: homeshowingpictures_store
			}));			
		},
		viewShowing: function(){
			funcComplete = viewModel.loadListData;
			this.loadListData();
		},
		setHeight: function(){
			var baseHeight = screen.height;//$(".layout-content").height();
			return (baseHeight - 49 + "px");
		},			
		remove_pic: function(){
			var key = this.id;
		    console.log('key = ' + key);
		    showPleaseWait();
			funcComplete = viewModel.loadListData;
			homeshowingpictures_store.remove(key);
		}/*,
		add_picture: function(){
			console.log('Add homeshowing picture');
			open_library();
		}*/
	};		
	
    function open_library_picture() {
        console.log('open library');
        navigator.camera.getPicture(onGetPhotoSuccess, onGetPhotoFail, {
            destinationType: Camera.DestinationType.FILE_URI,
            quality: 49,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY
        });
    }
    
    function open_camera_picture() {
        console.log('open camera');
	    navigator.camera.getPicture(onGetPhotoSuccess, onGetPhotoFail, {
            quality: 49,
            destinationType: Camera.DestinationType.FILE_URI
        });
    }    
    function onGetPhotoSuccess(imageURI) {
        console.log('on get photo success');
        var homeshowing_id = localStorage.getItem('homeshowing_id');
        var processed_data = {
        	/*'homeshowing_id': homeshowing_id,*/
        	'home_showing_picture[home_showing_id]': homeshowing_id,
        	'home_showing_picture[image]': imageURI
        }
        console.log(processed_data);
        //homeshowingpictures_store.insert(processed_data);
        
        var options = new FileUploadOptions();
        options.fileKey="home_showing_picture[image]";
        options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
        options.mimeType="image/jpeg";
        
        params = processed_data;
        //var params = new Object();
        options.headers = {
            'X-User-Email' : xuser_email,
            'X-User-Token' : xuser_token
        };
        options.params = params;
        
        console.log(options);
        
        showPleaseWait();
        var ft = new FileTransfer();
        ft.upload(imageURI, API_HOMESHOWINGS_DETAIL + "/" + localStorage.getItem('homeshowing_id') + "/pictures", win_upload, fail_upload, options);
    }
    
    function win_upload(r){
        console.log('Success: Uploading');
        console.log(r);
        hidePleaseWait();
        viewModel.loadListData();
    }
    function fail_upload(error){
        console.log('Failed: Uploading');
        console.log(error);
        hidePleaseWait();
        showAlertError('Uploading has been failed!');
    }
    function onGetPhotoFail(message) {
        console.log('Failed because: ' + message);
    }
	return viewModel;
}