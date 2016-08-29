Elite['hoepurchasedetail_notedetail'] = function (params) {
    var viewModel = {
		header_items: { 
			'align': 'right', 
			'template': 'nav-text', 
			'title': 'Edit',
			'id': 'homepurchasenote_editbtn',
			'action': setEditable
		},
		updatable: ko.observable(0),
		comment_text: ko.observable(''),
        home_showing_id: ko.observable(''),
        note_id: ko.observable(),
		update_note: function(){
			var note_id = viewModel.note_id();
			
			var executable = true;
			if(!viewModel.comment_text()){
        		executable = false;
        		msg = "Please input the comment.";
        	}
        	if(executable == false){
        		showAlertError(msg);
        		return;
        	}			
			var data = {
				"home_showing_note": {
					/*'home_showing_id': viewModel.home_showing_id(),*/
					'comment': viewModel.comment_text()
				}
			};
			console.log(data);
			if(parseInt(note_id) > 0){
				homeshowingnotes_store.update(note_id, data);
			}else{
				homeshowingnotes_store.insert(data);
			}
		},
        readonly: ko.observable(true),
        viewShowing: function(){   
        	viewModel.home_showing_id(localStorage.getItem('homeshowing_id'));
        	viewModel.note_id(params.id);     
        	if(parseInt(params.id) > 0){	
	        	homeshowingnotes_store.byKey(params.id).done(function(data){
	        		console.log(data);
	        		viewModel.comment_text(data.comment);
	        	});
        	}else{
        		viewModel.comment_text('');
        	}
		},
		viewShown: function(){
			if(parseInt(params.id) == 0){
				viewModel.updatable(0);
			}else{
				viewModel.updatable(1)
			}
			setEditable();	        
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
        $("#homepurchasenote_editbtn .dx-button-text").text(nav_caption);    	
	} 
    return viewModel;
}