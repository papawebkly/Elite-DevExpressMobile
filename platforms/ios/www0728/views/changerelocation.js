Elite.changerelocation = function (params) {
	var viewModel = {
		assignmentslist_data: ko.observableArray([]),
		origin: ko.observable(''),
		status: ko.observable(''),
		destination: ko.observable(''),
		assignment_id: ko.observable(''),
        viewShowing: function(){
            $(".dx-layout").removeClass("login-bg-page");
			$(".layout-header").addClass("changerelocation-header-bg");
			$(".dx-scrollable-content").addClass("changerelocation-body-bg");
			
        },
		viewShown: function(){
			console.log('Changerelocation - viewShown');
            $(".dx-icon-menu.dx-icon").hide();
            $(".dx-slideout.dx-widget").dxSlideOut("instance").option("swipeEnabled", false);

			/*
			viewModel.contractslist_data(new DevExpress.data.DataSource({
	    		store: contracts_store
			}));
			*/
			showPleaseWait();
			var api_empoloyees_relocation = API_EMPOLOYEES.replace("EMPLOYEE_ID", localStorage.getItem("employee_id"));
            
            console.log(api_empoloyees_relocation);
            xuser_email = localStorage.getItem("elite_email");
            xuser_token = localStorage.getItem("auth_token");
			$.ajax({
	            url: api_empoloyees_relocation,
	            type: 'GET',
	            contentType : 'application/json',
        		headers: {
        			'X-User-Email' : xuser_email,
					'X-User-Token' : xuser_token
				},
				error: function(jqXHR, textStatus, errorThrown){
					formatErrorMessage(jqXHR, errorThrown);
				},
	            success: function(result, textStatus, jqXhr) {
	            	console.log('--success--');
	            	console.log(result.assignments);
	            	var updatedData = Array();
	            	$.each(result.assignments, function(index, row){
	            		if(row.from_location && row.to_location)
	            			row.locations = row.from_location + " - " + row.to_location;
	            		else if(!row.from_location && !row.to_location){
	            			row.locations = "? - ?";
	            		}else{
	            			row.locations = (row.from_location) ? row.from_location : row.to_location;
	            		}
	            			
	            		updatedData.push(row);
	            	});
	            	hidePleaseWait();
                    viewModel.assignmentslist_data(updatedData);
	            	
	            	var selected_assignmentid = localStorage.getItem("selected_assignmentid");
                    if(selected_assignmentid)
                   {
                        viewModel.assignment_id(selected_assignmentid);
                       $.each(viewModel.assignmentslist_data(), function(index, row){
                          if(row.id == assignment_id){
                              localStorage.setItem("selected_assignment", JSON.stringify(row));
                              viewModel.origin((row.from_location) ? row.from_location : '?');
                              viewModel.destination((row.to_location) ? row.to_location : '?');
                              viewModel.status(row.assignment_status);
                          }
                        });
                   }
	            }
			});
			
		},
		
		selectedAssignment: function(){
            
			console.log('--- selected assignment ---');
			console.log('selected assignment id: '+viewModel.assignment_id());
            
            var assignment_id = viewModel.assignment_id();
            console.log('selected assignment id = ' + assignment_id);
            localStorage.setItem("selected_assignmentid", assignment_id);

            if(assignment_id == null || assignment_id == "")
            {
            }
            else
            {
                if(viewModel.assignmentslist_data().length){
                    $.each(viewModel.assignmentslist_data(), function(index, row){
                       if(row.id == assignment_id){
                           localStorage.setItem("selected_assignment", JSON.stringify(row));
                           viewModel.origin((row.from_location) ? row.from_location : '?');
                           viewModel.destination((row.to_location) ? row.to_location : '?');
                           viewModel.status(row.assignment_status);
                       }
                    });
                }
                set_menus(assignment_id, 0);
                
                Elite.app.navigate("home", { root: true });
            }
		},
		selectReloaction: function(){
            var assignment_id = viewModel.assignment_id();
            console.log('selected assignment id = ' + assignment_id);
            if(assignment_id == null || assignment_id == "")
            {}
            else
            {
                localStorage.setItem("selected_assignmentid", assignment_id);

                if(viewModel.assignmentslist_data().length){
                    $.each(viewModel.assignmentslist_data(), function(index, row){
                       if(row.id == assignment_id){
                           localStorage.setItem("selected_assignment", JSON.stringify(row));
                           viewModel.origin((row.from_location) ? row.from_location : '?');
                           viewModel.destination((row.to_location) ? row.to_location : '?');
                           viewModel.status(row.assignment_status);
                       }
                   });
                }
                set_menus(assignment_id, 0);
            }
		},
    };
    
    return viewModel;
};
