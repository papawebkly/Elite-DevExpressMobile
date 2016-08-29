Elite.login = function (params) {
    var viewModel = {
    	email: ko.observable(''),
    	password: ko.observable(''),
        viewShowing: function(){
        	console.log('Login - viewshowing');
            $(".layout-header").removeClass("changerelocation-header-bg");
            $(".dx-scrollview-content").removeClass("changerelocation-body-bg");
        },
        viewShown: function(){
            
        	console.log('Login - viewShown');
			//$('.dx-active-view').removeClass("login-bg-page");
            //if(!localStorage.getItem("auth_token")){
				$(".dx-toolbar-center").hide();
            	$(".layout-header.dx-toolbar").hide();
           		$(".dx-icon-menu.dx-icon").hide(); 

            $(".dx-slideout.dx-widget").dxSlideOut("instance").option("swipeEnabled", false);
            $(".dx-layout").addClass("login-bg-page");

    		//}
        },
    	login: function(){
    		var email = this.email();
    		var password = this.password();
    		if(!$.trim(email)){
    			showAlertError('Please input the email.');
    			return;
    		}
    		if(!$.trim(password)){
    			showAlertError('Please input the password.');
    			return;
    		}
    		
    		$(".login-input .dx-editbox-input").blur();
            //localStorage.setItem("auth_token", "BxUH-hNo_qFF98cpoUzX");
            //localStorage.setItem("elite_email", "alan@notionlabs.com");
            console.log('API_LOGIN = ' + API_LOGIN);
            console.log({
                	'X-User-Email': email,
                	'X-User-Password': password
                });
            setTimeout(function(){
	    		showPleaseWait();
	            $.ajax({
	                url: API_LOGIN,
	                type: "POST",
	                /*dataType: 'json',
	                processData: false,*/
	                contentType : 'application/json',
	                headers: {
	                	'X-User-Email': email,
	                	'X-User-Password': password
	                },
					error: function(jqXHR, textStatus, errorThrown){
						formatErrorMessage(jqXHR, errorThrown);
					},
	                success: function(response, textStatus, jqXhr) {
	                	console.log('--success--');
	                    console.log(response);
	                    //{"auth_token":"3iYJyD1Yozsm57wD5XXR","employee_id":"24749"}
	                    if(response.auth_token){
		                    localStorage.setItem("auth_token", response.auth_token);
		                    localStorage.setItem("employee_id", response.employee_id);
				    		localStorage.setItem("elite_email", email);
				    		localStorage.setItem("elite_pwd", password);
				    		
	                        var api_empoloyee_login = API_EMPOLOYEES.replace("EMPLOYEE_ID", response.employee_id);
	                        
	                        console.log(api_empoloyee_login);
	                        $.ajax({
					            url: api_empoloyee_login,
					            type: 'GET',
					            contentType : 'application/json',
				        		headers: {
				        			'X-User-Email' : email,
									'X-User-Token' : response.auth_token
								},
								error: function(jqXHR, textStatus, errorThrown){
									formatErrorMessage(jqXHR, errorThrown);
								},
					            success: function(result, textStatus, jqXhr) {
					            	console.log('--success--');
					            	localStorage.setItem("first_name", result.first_name);
					            	localStorage.setItem("last_name", result.last_name);
					            	$(".nav-header .myname").html(result.first_name + " " + result.last_name);
					            	console.log(result.assignments);
					            	hidePleaseWait();
					            	if(result.assignments.length > 1){
					            		Elite.app.navigate('changerelocation', { root: true });
					            	}else{
					            		localStorage.setItem("selected_assignmentid", result.assignments[0].id);
	                                    localStorage.setItem("selected_assignment", JSON.stringify(result.assignments[0]));
	                                    set_menus(result.assignments[0].id, 1);				            		
					            	}
					            }
							});			    					    		
			    		}else{
			    			hidePleaseWait();
			    			showAlertError('Email and/or Password are invalid. Please try again.');
			    		}
	                },
	                error: function(jqXHR, textStatus, errorThrown ) {
	                	hidePleaseWait();
	                    console.log('error');
	                    showAlertError('Email and/or Password are invalid. Please try again.');
	                }
	            });
	        },300);
    	}
	};
    return viewModel;
};