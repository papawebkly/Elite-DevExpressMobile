ELITE['experiencedetail'] = function (params) {
	var viewModel = {
		header_items: { 
			'align': 'right', 
			'template': 'nav-text', 
			'title': 'Edit',
			'id': 'experienceedit_editbtn',
			'action': setEditable
		},		
		id: ko.observable(''),
		comment: ko.observable(''),
		rating: ko.observable(''),
		experience_category_id: ko.observable(''),
				
		readonly: ko.observable(true),
		updatable: ko.observable(0),
			
        viewShown: function(){
        	showPleaseWait();
        	viewModel.id(params.id);
        	experiences_store.byKey(params.id).done(function(data){
        		console.log(data);
        		viewModel.rating(data.rating);
        		viewModel.comment(data.comment);
        		viewModel.experience_category_id(data.experience_category_id);
        		hidePleaseWait();
        	});
		},
		saveComment: function(){
			
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
        $("#experienceedit_editbtn .dx-button-text").text(nav_caption);    	
	} 
	
	return viewModel;
}