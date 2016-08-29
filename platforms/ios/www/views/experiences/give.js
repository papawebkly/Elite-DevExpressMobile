Elite['givefeedback'] = function (params) {
	var viewModel = {
		header_items: { 
			'align': 'right', 
			'template': 'nav-save', 
			'id': 'experienceedit_editbtn',
			'action': setSave
		},
		id: ko.observable(''),
		experienceCategories: ko.observableArray(),
		upCategories:  ko.observableArray(),
		downCategories:  ko.observableArray(),
			
		thumbs_opt: ko.observable(''),
		experience_category: ko.observable(''),
		experience_category_id: ko.observable(''),
		comment_text: ko.observable(''),
			
		viewShowing: function(){
			$(".layout-header").addClass("changerelocation-header-bg");
			$(".dx-scrollable-content").addClass("changerelocation-body-bg");
			this.thumbs_opt('');
			this.experience_category('');
			this.experience_category_id('');
			this.comment_text('');
		},			
		viewShown: function(){
			this.thumbs_opt(params.opt);
			console.log('Get Experience Categories');
			console.log(params.opt);
            viewModel.experienceCategories(publicExperienceCategories);
		},
		saveComment: function(){
			console.log('save comment');
        	var executable = true;
        	var msg = '';
        	if(viewModel.thumbs_opt() == ""){
        		executable = false;
        		msg = "Please select a thumb.";
        	}else if(!viewModel.experience_category_id()){
        		executable = false;
        		msg = "Please select a experience category.";
        	}else if(!viewModel.comment_text()){
        		executable = false;
        		msg = "Please input the comment.";
        	}
        	if(executable == false){
        		showAlertError(msg);
        		return;
        	}
        				
			processed_data = {
				rating: ((viewModel.thumbs_opt() == 1) ? "UP" : "DOWN"),
				comment: viewModel.comment_text(),
				category: viewModel.experience_category()
			};
            console.log(processed_data);
			experiences_store.insert(processed_data);
		}
	};

	function setSave(){
			console.log('save comment');
        	var executable = true;
        	var msg = '';
        	if(viewModel.thumbs_opt() == ""){
        		executable = false;
        		msg = "Please select a thumb.";
        	}else if(!viewModel.experience_category_id()){
        		executable = false;
        		msg = "Please select a experience category.";
        	}else if(!viewModel.comment_text()){
        		executable = false;
        		msg = "Please input the comment.";
        	}
        	if(executable == false){
        		showAlertError(msg);
        		return;
        	}
        				
			processed_data = {
				rating: ((viewModel.thumbs_opt() == 1) ? "UP" : "DOWN"),
				comment: viewModel.comment_text(),
				category: viewModel.experience_category()
			};
            console.log(processed_data);
			experiences_store.insert(processed_data);
		}
	return viewModel;
};