Elite['password'] = function (params) {
    var viewModel = {
    	password: ko.observable(''),
    	password_confirmation: ko.observable(''),

		viewShowing: function(){
			console.log('password change - view shown');
			viewModel.password('');
			viewModel.password_confirmation('');
		},
		
		change: function(){
    		var password = this.password();
    		var password_confirmation = this.password_confirmation();
    		if(!$.trim(password)){
    			showAlertError('Please input the password.');
    			return;
    		}
    		if(!$.trim(password_confirmation)){
    			showAlertError('Please input the password confirmation.');
    			return;
    		}
			if (password !== password_confirmation) {
				showAlertError('The two passwords do not match.');
				viewModel.password('');
				viewModel.password_confirmation('');
    			return;
			}
    		
			var processed_data = {'user': {
				'password': password,
				'password_confirmation': password_confirmation
			}};
			
            console.log('API_PASSWORD = ' + API_PASSWORD);
            console.log(processed_data);
			
    		showPleaseWait();
            $.ajax({
                url: API_PASSWORD,
                type: 'PUT',
				data: JSON.stringify(processed_data),
				processData: false,
                contentType : 'application/json',
                headers: {
                	'X-User-Email': xuser_email,
                	'X-User-Token': xuser_token
                },
				
				error: function(jqXHR, textStatus, errorThrown ) {
				   hidePleaseWait();
				   console.log('error');
				   showNotifyFailed('Password are invalid. Please try again.');
				   viewModel.password('');
				   viewModel.password_confirmation('');
				   return;
				},
                success: function(response, textStatus, jqXhr) {
                	console.log('--success--');
                    console.log(response);
					hidePleaseWait();
					showNotifySuccess('Password successfully changed.');
					setTimeout(function(){ 
						console.log('goes to home screen');
						Elite.app.navigate('home', { root: true, direction: "backward" });
					}, 2000);
                }
            });
    	}
	};
    return viewModel;
}