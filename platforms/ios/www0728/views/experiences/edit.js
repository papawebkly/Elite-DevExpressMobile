Elite['experienceedit'] = function (params) {
	thumbsOptions = [
		{code: "UP"},
		{code: "DOWN"}
	];
	var viewModel = {
		id: ko.observable(''),
		experienceCategories: ko.observableArray(),

		thumbs: ko.observable(''),
		thumbs_opt: ko.observable(-1),
		experience_category: ko.observable(''),
		experience_category_id: ko.observable(''),
		comment_text: ko.observable(''),
        /*
		header_items: { 
			'align': 'right', 
			'template': 'nav-text', 
			'title': 'Edit',
			'id': 'experienceedit_editbtn',
			'action': setEditable
		},	*/
		readonly: ko.observable(true),
		updatable: ko.observable(0),
		disableCategory: ko.observable(1),
			
		viewShowing: function(){
			this.thumbs('');
			this.thumbs_opt(-1);
			this.experience_category('');
			this.experience_category_id('');
			this.comment_text('');
			this.disableCategory(1);
		},
		viewShown: function(){
			console.log('ViewShown param id = '+params.id);
			end = 0;
			this.id(params.id);
               
			//showPleaseWait();
			if(parseInt(this.id()) == 0){
				//when create, hides edit button
				$("#experienceedit_editbtn").hide();
				viewModel.updatable(1);
				viewModel.readonly(false);
				all_loaded = 1;
				getExperienceCategories();
			}else{
				//detail
				all_loaded = 2;
                getExperienceCategories();
	        	experiences_store.byKey(params.id).done(function(data){
	        		console.log(data);
	        		viewModel.thumbs(data.rating);
	        		viewModel.comment_text(data.comment);
	        		
                    category_id = (data.experience_category) ? data.experience_category.id : -1;
                    category_name = (data.experience_category) ? data.experience_category.name : '';
	        		viewModel.experience_category_id(category_id);
	        		viewModel.experience_category(category_name);
                		        		
	        		readyStart();
                    viewModel.readonly(true);
	        	});				
			}
		},
		setThumbDown: function(){
			viewModel.thumbs("DOWN");
			viewModel.thumbs_opt(1);
			viewModel.disableCategory(0);
		},
		setThumbUp: function(){
			viewModel.thumbs("UP");
			viewModel.thumbs_opt(0);
			viewModel.disableCategory(0);
		},
		saveComment: function(){
			console.log('save comment');
        	var executable = true;
        	var msg = '';
        	if(!viewModel.thumbs()){
        		executable = false;
        		msg = "Please select a thumb.";
        	}else if(!viewModel.experience_category_id()){
        		executable = false;
        		msg = "Please select a experience category.";
        	}else if(!viewModel.comment_text()){
        		executable = false;
        		msg = "Please input your comment.";
        	}
        	if(executable == false){
        		showAlertError(msg);
        		return;
        	}
			
			processed_data = {
				rating: viewModel.thumbs(),
				comment: viewModel.comment_text(),
				category: viewModel.experience_category()
			};
			console.log(processed_data);
			var id = parseInt(this.id());
            console.log("id = "+id);
			if(id == 0){
				experiences_store.insert(processed_data);
			}else{
                console.log("--- update ---");
				experiences_store.update(id, processed_data);
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
        $("#experienceedit_editbtn .dx-button-text").text(nav_caption);    	
	}
	end = 0;
	function readyStart(){
		end++;
		if(end == all_loaded)
			hidePleaseWait();
	}
	function getExperienceCategories(){
		/*console.log('API_EXPERIENCE_CATEGORIES = ' + API_EXPERIENCE_CATEGORIES);
		console.log({
		   'X-User-Email' : xuser_email,
		   'X-User-Token' : xuser_token
		});
		$.ajax({
			url: API_EXPERIENCE_CATEGORIES,
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
				console.log(result);
				var upCategories = Array();
				var downCategories = Array();
				$.each(result, function(index, row){
					if(row.category_type == "UP")
						upCategories.push(row);
					else
						downCategories.push(row);
				});
				viewModel.upCategories(upCategories);
				viewModel.downCategories(downCategories);
				
				if(parseInt(viewModel.thumbs_opt()) == 1)
        			viewModel.experienceCategories(upCategories);
        		else
        			viewModel.experienceCategories(downCategories);
        		readyStart();   							
			}
		});*/
        viewModel.experienceCategories(publicExperienceCategories);
    }
	return viewModel;
};