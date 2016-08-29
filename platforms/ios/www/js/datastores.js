var xuser_email = ""; //localStorage.getItem("elite_email");
var xuser_token = ""; //localStorage.getItem("auth_token");

var funcComplete = '';

/* Profile Dependents Data Store */
	var dependents_store = new DevExpress.data.CustomStore({
		load: function (loadOptions) {
			console.log('dependents_store - load')
			
			var dependent_fname = localStorage.getItem("dependent_fname");
			var dependent_lname = localStorage.getItem("dependent_lname");
			
			var deferred = new $.Deferred();
			
            $.ajax({
				url: API_PROFILE_DEPENDENTS,
				type: 'GET',
				contentType : 'application/json',
				headers: {
				   'X-User-Email' : xuser_email,
				   'X-User-Token' : xuser_token
				},			
				error: function(jqXHR, textStatus, errorThrown){
					formatErrorMessage(jqXHR, errorThrown);
				},
				success: function (result) {
		        	console.log(result.length);
		        	var index = 1;
		            var mapped = $.map(result, function (row) {
		            	console.log(row);
		            	row.birth_date = formatDate(row.birth_date);
		            	
		            	if(dependent_fname && dependent_lname && row.first_name == dependent_fname && row.last_name == dependent_lname){
		            		dependent_pic = localStorage.getItem("dependent_pic0");
		            		
		            		localStorage.setItem("dependent_fname", "");
		            		localStorage.setItem("dependent_lname", "");
		            		localStorage.setItem("dependent_pic0", "");
		            		
		            		localStorage.setItem("dependent_pic"+row.dependent_id, ((dependent_pic) ? dependent_pic : ''));
		            	}else{
		            		dependent_pic = localStorage.getItem("dependent_pic"+row.dependent_id);
		            	}
		            	
		            	row.picture = (dependent_pic) ? dependent_pic : '';
		            	index ++;
		            	return row;
		            });
		            deferred.resolve(mapped);
	        	}
	        });
	        return deferred;			
		},
			
		byKey: function(key) {
	        //return $.getJSON(API_PROFILE_DEPENDENTS + "/" + encodeURIComponent(key));
			return $.ajax({
				url: API_PROFILE_DEPENDENTS + "/" + encodeURIComponent(key),
				type: 'GET',
				contentType : 'application/json',
				headers: {
				   'X-User-Email' : xuser_email,
				   'X-User-Token' : xuser_token
				},
				error: function(jqXHR, textStatus, errorThrown){
					formatErrorMessage(jqXHR, errorThrown);
				}
	   		});
	    },
	 
	    insert: function(values) {
	    	console.log('dependent insert');
	    	console.log(values);
	    	showPleaseWait();
	        $.ajax({
	            url: API_PROFILE_DEPENDENTS,
	            type: 'POST',
	            data: JSON.stringify(values),
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
	                Elite.app.navigate("profile_dependents", { root: true, direction: "backward" });
	                return true;
	            }
	        });
	    },
	 
	    update: function(key, values) {
	    	showPleaseWait();
	        $.ajax({
	            url: API_PROFILE_DEPENDENTS + "/" + encodeURIComponent(key),
	            type: 'PATCH',
	            data: JSON.stringify(values),
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
	                Elite.app.navigate("profile_dependents", { root: true, direction: "backward" });
	                return true;
	            }
	        });
	    },
	 
	    remove: function(key) {
	        return $.ajax({
	            url: API_PROFILE_DEPENDENTS + "/" + encodeURIComponent(key),
	            method: "DELETE",
	        });
	    }
	});


/* Profile Contacts Data Store */
	var contacts_store = new DevExpress.data.CustomStore({
		load: function (loadOptions) {
			console.log('contacts_store - load')
						
			var deferred = new $.Deferred();
			
			$.ajax({
				url: API_PROFILE_CONTACTS,
				type: 'GET',
				contentType : 'application/json',
				headers: {
				   'X-User-Email' : xuser_email,
				   'X-User-Token' : xuser_token
				},			
				error: function(jqXHR, textStatus, errorThrown){
					formatErrorMessage(jqXHR, errorThrown);
				},
				success: function (result) {
		            var mapped = $.map(result, function (row) {
		            	console.log(row);
						row.emailProfileContact = function(){
							sendEmail(row.number_address);
						};
						row.callProfileContact = function(){
							window.location.href='tel:' + row.number_address;
						};          
						row.skypeProfileContact = function(){
							window.location.href='skype:' + row.number_address + '?call';
						};  	
		            	return row;
		            });
		            deferred.resolve(mapped);
		        }
		    });
	        return deferred;			
		},
			
		byKey: function(key) {
			return $.ajax({
				url: API_PROFILE_CONTACTS + "/" + encodeURIComponent(key),
				type: 'GET',
				contentType : 'application/json',
				headers: {
				   'X-User-Email' : xuser_email,
				   'X-User-Token' : xuser_token
				},
				error: function(jqXHR, textStatus, errorThrown){
					formatErrorMessage(jqXHR, errorThrown);
				}
			});
	        //return $.getJSON(API_PROFILE_CONTACTS + "/" + encodeURIComponent(key));
	    },
	 
	    insert: function(values) {
	    	console.log('contact insert');
	    	showPleaseWait();
	        $.ajax({
	            url: API_PROFILE_CONTACTS,
	            type: 'POST',
	            data: JSON.stringify(values),
	            processData: false,
	            contentType : 'application/json',
				headers: {
				   'X-User-Email' : xuser_email,
				   'X-User-Token' : xuser_token
				},	            	
	            success: function(response, textStatus, jqXhr) { },
				error: function(jqXHR, textStatus, errorThrown){
					formatErrorMessage(jqXHR, errorThrown);
				},
	            complete: function(){
	                hidePleaseWait();
	                console.log('contact insert completed');
	                Elite.app.navigate("profile_contacts", { root: true, direction: "backward" });
	                return true;
	            }
	        });
	    },
	 
	    update: function(key, values) {
	    	showPleaseWait();
	        $.ajax({
	            url: API_PROFILE_CONTACTS + "/" + encodeURIComponent(key),
	            type: 'PATCH',
	            data: JSON.stringify(values),
	            processData: false,
	            contentType : 'application/json',
				headers: {
				   'X-User-Email' : xuser_email,
				   'X-User-Token' : xuser_token
				},	            	
	            success: function(response, textStatus, jqXhr) { },
				error: function(jqXHR, textStatus, errorThrown){
					formatErrorMessage(jqXHR, errorThrown);
				},
	            complete: function(){
	                hidePleaseWait();
	                console.log('contract update completed');
	                Elite.app.navigate("profile_contacts", { root: true, direction: "backward" });
	                return true;
	            }
	        });
	    },
	 
	    remove: function(key) {
	        return $.ajax({
	            url: API_PROFILE_CONTACTS + "/" + encodeURIComponent(key),
	            method: "DELETE",
				error: function(jqXHR, textStatus, errorThrown){
					formatErrorMessage(jqXHR, errorThrown);
				}
	        });
	    }
	});

/* Profile Addresses Data Store */
	var addresses_store = new DevExpress.data.CustomStore({
		load: function (loadOptions) {
			console.log('addresses_store - load')
			
			var deferred = new $.Deferred();
			
			$.ajax({
				url: API_PROFILE_ADDRESSES,
				type: 'GET',
				contentType : 'application/json',
				headers: {
				   'X-User-Email' : xuser_email,
				   'X-User-Token' : xuser_token
				},			
				error: function(jqXHR, textStatus, errorThrown){
					formatErrorMessage(jqXHR, errorThrown);
				},
               	success: function (result) {
	                var mapped = $.map(result, function (row) {
	                	console.log(row);
	                	row.city_state = '';
	                	if(row.city)
	                		row.city_state += row.city;
	                	if(row.state)
	                		row.city_state += ", " + row.state;
                       if(row.postal_code)
                           row.city_state += " " + row.postal_code;
	                	
	                	row.country_zip = '';
	                	if(row.country_code)
	                		row.country_zip += row.country_code;
	                	if(row.postal_code)
	                		row.country_zip += " " + row.postal_code;	
						return row;
	                });
	                deferred.resolve(mapped);
		        }
		    });
	        return deferred;			
		},
			
		byKey: function(key) {
	        //return $.getJSON(API_PROFILE_ADDRESSES + "/" + encodeURIComponent(key));
	        return $.ajax({
				url: API_PROFILE_ADDRESSES + "/" + encodeURIComponent(key),
				type: 'GET',
				contentType : 'application/json',
				headers: {
				   'X-User-Email' : xuser_email,
				   'X-User-Token' : xuser_token
				},
				error: function(jqXHR, textStatus, errorThrown){
					formatErrorMessage(jqXHR, errorThrown);
				}
			});
	    },
	 
	    insert: function(values) {
	    	console.log('address insert : ' + API_PROFILE_ADDRESSES);
	    	showPleaseWait();
	        $.ajax({
	            url: API_PROFILE_ADDRESSES,
	            type: 'POST',
	            data: JSON.stringify(values),
	            processData: false,
	            contentType : 'application/json',
				headers: {
				   'X-User-Email' : xuser_email,
				   'X-User-Token' : xuser_token
				},
	            success: function(response, textStatus, jqXhr) { },
				error: function(jqXHR, textStatus, errorThrown){
					formatErrorMessage(jqXHR, errorThrown);
				},
	            complete: function(){
	                hidePleaseWait();
	                console.log('address insert completed');
	                Elite.app.navigate("profile_addresses", { root: true, direction: "backward" });
	                return true;
	            }
	        });
	    },
	 
	    update: function(key, values) {
	    	console.log('address update : ' + API_PROFILE_ADDRESSES + "/" + encodeURIComponent(key));
	    	showPleaseWait();
	        $.ajax({
	            url: API_PROFILE_ADDRESSES + "/" + encodeURIComponent(key),
	            type: 'PATCH',
	            data: JSON.stringify(values),
	            processData: false,
	            contentType : 'application/json',
				headers: {
				   'X-User-Email' : xuser_email,
				   'X-User-Token' : xuser_token
				},	            	
	            success: function(response, textStatus, jqXhr) { },
				error: function(jqXHR, textStatus, errorThrown){
					formatErrorMessage(jqXHR, errorThrown);
				},
	            complete: function(){
	                hidePleaseWait();
	                console.log('address update completed');
	                Elite.app.navigate("profile_addresses", { root: true, direction: "backward" });
	                return true;
	            }
	        });
	    },
	 
	    remove: function(key) {
	        return $.ajax({
	            url: API_PROFILE_ADDRESSES + "/" + encodeURIComponent(key),
	            method: "DELETE",
				error: function(jqXHR, textStatus, errorThrown){
					formatErrorMessage(jqXHR, errorThrown);
				}
	        });
	    }
	});

/* Bank Accounts Data Store */
	var bank_store = new DevExpress.data.CustomStore({
		load: function (loadOptions) {
			console.log('bank_store - load')
                                                     console.log(loadOptions);
			var deferred = new $.Deferred();
			$.ajax({
				url: API_BANK_ACCOUNTS,
				type: 'GET',
				contentType : 'application/json',
				headers: {
				   'X-User-Email' : xuser_email,
				   'X-User-Token' : xuser_token
				},			
				error: function(jqXHR, textStatus, errorThrown){
					/** test*/
					var result = [{"bank_account_id":1554,"assignment_id":8121,"primary_account":null,"inactive":"EQFALS","account_location_code":"EQBLOT","account_location":"Other","account_type_code":"EQBNMM","account_type":"Money Market","used_for":"test","int_bank_name":null,"int_bank_swift_bic_code":"","int_bank_aba_route_code":"","int_bank_iban":"","int_bank_access_country_code":"","final_bank_account_number":"26475767574746666646","final_bank_name_on_account":"ABZXEE1235345345345","final_bank_name":"Chase Test Anna Bank","final_bank_swift_bic_code":"","final_bank_aba_route_code":"abcdswer2342 342 342 34QWE RTYU","final_bank_iban":"","final_bank_address_country_code":"USA","final_bank_contact_phone":null,"account_currency":"AFA","create_date":"2014-06-04T20:03:12.550Z","create_by":"Elite Mobile","update_date":"2016-02-21T13:44:01.660Z","update_by":"Elite Mobile"},{"bank_account_id":1841,"assignment_id":8121,"primary_account":null,"inactive":null,"account_location_code":"EQBLOT","account_location":"Other","account_type_code":"EQBNMM","account_type":"Money Market","used_for":"test","int_bank_name":null,"int_bank_swift_bic_code":"","int_bank_aba_route_code":"","int_bank_iban":"","int_bank_access_country_code":"","final_bank_account_number":"26475767574746666646","final_bank_name_on_account":"ABZXEE1235345345345","final_bank_name":"Chase Test Anna Bank","final_bank_swift_bic_code":"","final_bank_aba_route_code":"abcdswer2342 342 342 34QWE RTYU","final_bank_iban":"","final_bank_address_country_code":"USA","final_bank_contact_phone":null,"account_currency":"AFA","create_date":"2014-08-14T11:03:09.693Z","create_by":"Elite Mobile","update_date":"2016-02-13T07:38:02.807Z","update_by":"Elite Mobile"},{"bank_account_id":2033,"assignment_id":8121,"primary_account":null,"inactive":null,"account_location_code":"EQBLHM","account_location":"Home","account_type_code":"EQBNMM","account_type":"Money Market","used_for":"c","int_bank_name":null,"int_bank_swift_bic_code":"","int_bank_aba_route_code":"","int_bank_iban":"","int_bank_access_country_code":"","final_bank_account_number":"A","final_bank_name_on_account":"b","final_bank_name":"test","final_bank_swift_bic_code":"123123123","final_bank_aba_route_code":"","final_bank_iban":"Qweqwe","final_bank_address_country_code":"ASM","final_bank_contact_phone":null,"account_currency":"ALL","create_date":"2015-01-15T03:51:55.197Z","create_by":"Elite Mobile","update_date":"2015-01-15T03:51:55.197Z","update_by":"Elite Mobile"},{"bank_account_id":3654,"assignment_id":8121,"primary_account":null,"inactive":null,"account_location_code":"CC0169","account_location":"Destination Address","account_type_code":"EQBNSV","account_type":"Savings","used_for":"Dhc","int_bank_name":null,"int_bank_swift_bic_code":"","int_bank_aba_route_code":"","int_bank_iban":"","int_bank_access_country_code":"","final_bank_account_number":"Ghhf","final_bank_name_on_account":"gvhv","final_bank_name":"Ghv","final_bank_swift_bic_code":"Fb","final_bank_aba_route_code":"","final_bank_iban":"ugh","final_bank_address_country_code":"ALB","final_bank_contact_phone":null,"account_currency":"DZD","create_date":"2016-01-02T08:04:58.800Z","create_by":"Elite Mobile","update_date":"2016-01-02T08:04:58.800Z","update_by":"Elite Mobile"},{"bank_account_id":3669,"assignment_id":8121,"primary_account":null,"inactive":null,"account_location_code":"CC0168","account_location":"Departure Address","account_type_code":"EQBNCK","account_type":"Checking","used_for":"dhhh","int_bank_name":null,"int_bank_swift_bic_code":"","int_bank_aba_route_code":"","int_bank_iban":"","int_bank_access_country_code":"","final_bank_account_number":"23567","final_bank_name_on_account":"dghjk","final_bank_name":"rrrrre","final_bank_swift_bic_code":"477","final_bank_aba_route_code":"","final_bank_iban":"djvkv","final_bank_address_country_code":"ALA","final_bank_contact_phone":null,"account_currency":"AFN","create_date":"2016-01-11T06:34:58.050Z","create_by":"Elite Mobile","update_date":"2016-01-11T06:34:58.050Z","update_by":"Elite Mobile"},{"bank_account_id":3670,"assignment_id":8121,"primary_account":null,"inactive":null,"account_location_code":"CC0168","account_location":"Departure Address","account_type_code":"EQBNCK","account_type":"Checking","used_for":"dhhh","int_bank_name":null,"int_bank_swift_bic_code":"","int_bank_aba_route_code":"","int_bank_iban":"","int_bank_access_country_code":"","final_bank_account_number":"23567","final_bank_name_on_account":"dghjk","final_bank_name":"rrrrre","final_bank_swift_bic_code":"477","final_bank_aba_route_code":"","final_bank_iban":"djvkv","final_bank_address_country_code":"ALA","final_bank_contact_phone":null,"account_currency":"AFN","create_date":"2016-01-11T06:37:34.687Z","create_by":"Elite Mobile","update_date":"2016-01-11T06:37:34.687Z","update_by":"Elite Mobile"}];
					var mapped = $.map(result, function (row) {
	                	console.log(row);
	                	row.display_account_number = row.final_bank_account_number;
	                	/*
	                	row.display_account_number = "";
	                	if(row.final_bank_account_number){
	                		row.display_account_number = "++-" + row.final_bank_account_number.substring(6);
	                	}*/
						return row;
	                });
	                deferred.resolve(mapped);
					/*end test*/
					formatErrorMessage(jqXHR, errorThrown);
				},
				success: function (result) {
	                var mapped = $.map(result, function (row) {
	                	console.log(row);
	                	row.display_account_number = row.final_bank_account_number;
	                	/*
	                	row.display_account_number = "";
	                	if(row.final_bank_account_number){
	                		row.display_account_number = "++-" + row.final_bank_account_number.substring(6);
	                	}*/
						return row;
	                });
	                deferred.resolve(mapped);
	            }
	        });
	        return deferred;			
		},
			
		byKey: function(key) {
	        //return $.getJSON(API_BANK_ACCOUNTS + "/" + encodeURIComponent(key));
			return $.ajax({
				url: API_BANK_ACCOUNTS + "/" + encodeURIComponent(key),
				type: 'GET',
				contentType : 'application/json',
				headers: {
				   'X-User-Email' : xuser_email,
				   'X-User-Token' : xuser_token
				},
				error: function(jqXHR, textStatus, errorThrown){
					formatErrorMessage(jqXHR, errorThrown);
				}
			});
	    },
	 
	    insert: function(values) {
	    	console.log('bank account insert');
	    	console.log(JSON.stringify(values));
	    	showPleaseWait();
	        $.ajax({
	            url: API_BANK_ACCOUNTS,
	            type: 'POST',
	            data: JSON.stringify(values),
				headers: {
				   'X-User-Email' : xuser_email,
				   'X-User-Token' : xuser_token
				},			
	            processData: false,
	            contentType : 'application/json',
	            success: function(response, textStatus, jqXhr) { },
				error: function(jqXHR, textStatus, errorThrown){
					formatErrorMessage(jqXHR, errorThrown);
				},
	            complete: function(){
	                hidePleaseWait();
	                console.log('completed');
	                Elite.app.navigate("banklist", { root: true, direction: "backward" });
	                return true;
	            }
	        });
	    },
	 
	    update: function(key, values) {
	    	showPleaseWait();
	        $.ajax({
	            url: API_BANK_ACCOUNTS + "/" + encodeURIComponent(key),
	            type: 'PATCH',
	            data: JSON.stringify(values),
	            processData: false,
				headers: {
				   'X-User-Email' : xuser_email,
				   'X-User-Token' : xuser_token
				},			
	            contentType : 'application/json',
	            success: function(response, textStatus, jqXhr) { },
				error: function(jqXHR, textStatus, errorThrown){
					formatErrorMessage(jqXHR, errorThrown);
				},
	            complete: function(){
	                hidePleaseWait();
	                console.log('bank account update completed');
	                Elite.app.navigate("banklist", { root: true, direction: "backward" });
	                return true;
	            }
	        });
	    },
	 
	    remove: function(key) {
	        return $.ajax({
	            url: API_BANK_ACCOUNTS + "/" + encodeURIComponent(key),
	            method: "DELETE",
				error: function(jqXHR, textStatus, errorThrown){
					formatErrorMessage(jqXHR, errorThrown);
				}
	        });
	    }
	});

/* Experiences Data Store */
	var experiences_store = new DevExpress.data.CustomStore({
		load: function (loadOptions) {
						
			var deferred = new $.Deferred();
			$.ajax({
				url: API_EXPERIENCES,
				type: 'GET',
				contentType : 'application/json',
				headers: {
				   'X-User-Email' : xuser_email,
				   'X-User-Token' : xuser_token
				},
				error: function(jqXHR, textStatus, errorThrown){
					/**test */
					var result =  [{"id":6,"rating":"UP","comment":"Hello","created_at":"2014-06-04T19:58:01.583Z","category":"Bristol Advisor","experience_category":{"id":1,"name":"Bristol Advisor","description":"Compliment","active":true,"category_type":"UP","created_at":null,"updated_at":null}},{"id":7,"rating":"UP","comment":"Paul has been great at communicating all the details of my relocation. \n","created_at":"2014-06-05T21:01:49.600Z","category":"Bristol Advisor","experience_category":{"id":1,"name":"Bristol Advisor","description":"Compliment","active":true,"category_type":"UP","created_at":null,"updated_at":null}},{"id":11,"rating":"UP","comment":"Test","created_at":"2014-08-22T04:39:12.243Z","category":"Bristol Advisor","experience_category":{"id":1,"name":"Bristol Advisor","description":"Compliment","active":true,"category_type":"UP","created_at":null,"updated_at":null}},{"id":12,"rating":"DOWN","comment":"Test","created_at":"2014-08-22T04:39:58.357Z","category":"Bristol Advisor","experience_category":{"id":1,"name":"Bristol Advisor","description":"Compliment","active":true,"category_type":"UP","created_at":null,"updated_at":null}},{"id":13,"rating":"UP","comment":"Test","created_at":"2014-08-25T23:54:14.960Z","category":"Bristol Advisor","experience_category":{"id":1,"name":"Bristol Advisor","description":"Compliment","active":true,"category_type":"UP","created_at":null,"updated_at":null}},{"id":14,"rating":"DOWN","comment":"This is a long complaint for testing","created_at":"2014-08-27T21:36:24.560Z","category":"Bristol Advisor","experience_category":{"id":2,"name":"Bristol Advisor","description":"Complaint","active":true,"category_type":"DOWN","created_at":null,"updated_at":null}},{"id":20,"rating":"UP","comment":"Yyyyy","created_at":"2014-09-03T17:20:29.880Z","category":"Rental","experience_category":{"id":9,"name":"Rental","description":"Compliment","active":true,"category_type":"UP","created_at":null,"updated_at":null}},{"id":27,"rating":"UP","comment":"test","created_at":"2015-01-28T02:17:13.387Z","category":"Bristol Advisor","experience_category":{"id":1,"name":"Bristol Advisor","description":"Compliment","active":true,"category_type":"UP","created_at":null,"updated_at":null}},{"id":30,"rating":"UP","comment":"wonderful","created_at":"2015-02-09T02:56:41.060Z","category":"Move Management","experience_category":{"id":3,"name":"Move Management","description":"Compliment","active":true,"category_type":"UP","created_at":null,"updated_at":null}},{"id":31,"rating":"UP","comment":"wonderful","created_at":"2015-02-09T02:57:14.380Z","category":"Home Sale","experience_category":{"id":5,"name":"Home Sale","description":"Compliment","active":true,"category_type":"UP","created_at":null,"updated_at":null}},{"id":32,"rating":"UP","comment":"test","created_at":"2015-02-09T03:17:26.377Z","category":"Bristol Advisor","experience_category":{"id":1,"name":"Bristol Advisor","description":"Compliment","active":true,"category_type":"UP","created_at":null,"updated_at":null}},{"id":33,"rating":"UP","comment":"test note","created_at":"2015-02-09T03:31:26.853Z","category":"Bristol Advisor","experience_category":{"id":1,"name":"Bristol Advisor","description":"Compliment","active":true,"category_type":"UP","created_at":null,"updated_at":null}},{"id":34,"rating":"UP","comment":"test nkte","created_at":"2015-02-09T03:33:26.097Z","category":"Move Management","experience_category":{"id":3,"name":"Move Management","description":"Compliment","active":true,"category_type":"UP","created_at":null,"updated_at":null}},{"id":35,"rating":"UP","comment":"test w/ cat","created_at":"2015-02-09T03:56:34.680Z","category":"Move Management","experience_category":{"id":3,"name":"Move Management","description":"Compliment","active":true,"category_type":"UP","created_at":null,"updated_at":null}},{"id":36,"rating":"UP","comment":"test after push","created_at":"2015-02-09T04:01:26.050Z","category":"Home Purchase","experience_category":{"id":7,"name":"Home Purchase","description":"Compliment","active":true,"category_type":"UP","created_at":null,"updated_at":null}},{"id":37,"rating":"UP","comment":"after push","created_at":"2015-02-09T04:05:05.767Z","category":"Move Management","experience_category":{"id":3,"name":"Move Management","description":"Compliment","active":true,"category_type":"UP","created_at":null,"updated_at":null}},{"id":38,"rating":"thumbs up","comment":"console","created_at":"2015-02-09T04:07:31.663Z","category":"Move Management","experience_category":{"id":3,"name":"Move Management","description":"Compliment","active":true,"category_type":"UP","created_at":null,"updated_at":null}},{"id":39,"rating":"thumbs up","comment":"console","created_at":"2015-02-09T04:08:46.337Z","category":"Move Management","experience_category":{"id":3,"name":"Move Management","description":"Compliment","active":true,"category_type":"UP","created_at":null,"updated_at":null}},{"id":40,"rating":"thumbs up","comment":"console","created_at":"2015-02-09T04:11:36.750Z","category":"Move Management","experience_category":{"id":3,"name":"Move Management","description":"Compliment","active":true,"category_type":"UP","created_at":null,"updated_at":null}},{"id":41,"rating":"thumbs up","comment":"console","created_at":"2015-02-09T04:16:59.153Z","category":"Move Management","experience_category":{"id":3,"name":"Move Management","description":"Compliment","active":true,"category_type":"UP","created_at":null,"updated_at":null}},{"id":42,"rating":"UP","comment":"after push...","created_at":"2015-02-09T04:20:02.243Z","category":"Temp Housing","experience_category":{"id":11,"name":"Temp Housing","description":"Compliment","active":true,"category_type":"UP","created_at":null,"updated_at":null}},{"id":43,"rating":"UP","comment":"test","created_at":"2015-02-09T04:21:57.693Z","category":"Mortgage","experience_category":{"id":13,"name":"Mortgage","description":"Compliment","active":true,"category_type":"UP","created_at":null,"updated_at":null}},{"id":44,"rating":"thumbs up","comment":"console","created_at":"2015-02-09T04:30:13.527Z","category":"Move Management","experience_category":{"id":3,"name":"Move Management","description":"Compliment","active":true,"category_type":"UP","created_at":null,"updated_at":null}},{"id":45,"rating":"UP","comment":"test after push","created_at":"2015-02-09T04:34:26.957Z","category":"Expense","experience_category":{"id":15,"name":"Expense","description":"Compliment","active":true,"category_type":"UP","created_at":null,"updated_at":null}},{"id":46,"rating":"UP","comment":"after push","created_at":"2015-02-09T04:38:32.953Z","category":"Bristol Advisor","experience_category":{"id":1,"name":"Bristol Advisor","description":"Compliment","active":true,"category_type":"UP","created_at":null,"updated_at":null}},{"id":47,"rating":"thumbs up","comment":"console","created_at":"2015-02-09T04:42:31.780Z","category":"Move Management","experience_category":{"id":3,"name":"Move Management","description":"Compliment","active":true,"category_type":"UP","created_at":null,"updated_at":null}},{"id":48,"rating":"UP","comment":"test after push","created_at":"2015-02-09T04:51:10.687Z","category":"Bristol Advisor","experience_category":{"id":1,"name":"Bristol Advisor","description":"Compliment","active":true,"category_type":"UP","created_at":null,"updated_at":null}},{"id":50,"rating":"UP","comment":"test","created_at":"2015-02-11T02:56:23.433Z","category":"Bristol Advisor","experience_category":{"id":1,"name":"Bristol Advisor","description":"Compliment","active":true,"category_type":"UP","created_at":null,"updated_at":null}},{"id":51,"rating":"UP","comment":"Vjvhg","created_at":"2015-02-12T08:50:55.347Z","category":"Home Sale","experience_category":{"id":5,"name":"Home Sale","description":"Compliment","active":true,"category_type":"UP","created_at":null,"updated_at":null}},{"id":52,"rating":"UP","comment":"Ngxgj","created_at":"2015-02-12T09:03:25.237Z","category":"Home Sale","experience_category":{"id":5,"name":"Home Sale","description":"Compliment","active":true,"category_type":"UP","created_at":null,"updated_at":null}},{"id":53,"rating":"UP","comment":"ccbvcbc","created_at":"2015-02-12T09:15:56.170Z","category":"Bristol Advisor","experience_category":{"id":2,"name":"Bristol Advisor","description":"Complaint","active":true,"category_type":"DOWN","created_at":null,"updated_at":null}},{"id":54,"rating":"UP","comment":"vbbbn","created_at":"2015-02-12T10:43:59.093Z","category":"Bristol Advisor","experience_category":{"id":2,"name":"Bristol Advisor","description":"Complaint","active":true,"category_type":"DOWN","created_at":null,"updated_at":null}},{"id":55,"rating":"DOWN","comment":"hcvnb","created_at":"2015-02-12T10:44:07.913Z","category":"Move Management","experience_category":{"id":3,"name":"Move Management","description":"Compliment","active":true,"category_type":"UP","created_at":null,"updated_at":null}},{"id":56,"rating":"UP","comment":"scsc","created_at":"2015-02-12T16:31:39.773Z","category":"Home Sale","experience_category":{"id":6,"name":"Home Sale","description":"Compliant","active":true,"category_type":"DOWN","created_at":null,"updated_at":null}},{"id":57,"rating":"DOWN","comment":"sdasd","created_at":"2015-02-12T16:31:49.767Z","category":"Move Management","experience_category":{"id":4,"name":"Move Management","description":"Complaint","active":true,"category_type":"DOWN","created_at":null,"updated_at":null}},{"id":58,"rating":"DOWN","comment":"sfg","created_at":"2015-02-12T16:35:58.710Z","category":"Move Management","experience_category":{"id":3,"name":"Move Management","description":"Compliment","active":true,"category_type":"UP","created_at":null,"updated_at":null}},{"id":61,"rating":"UP","comment":"great move 2","created_at":"2015-02-17T07:46:46.230Z","category":"Move Management","experience_category":null},{"id":62,"rating":"UP","comment":"Ugvjvjvugvf","created_at":"2015-02-20T06:34:08.440Z","category":"Move Management","experience_category":null},{"id":63,"rating":"UP","comment":"Fgovug","created_at":"2015-03-21T17:01:16.767Z","category":"Move Management","experience_category":null},{"id":64,"rating":"UP","comment":"Shsg","created_at":"2015-03-21T17:02:06.760Z","category":"Home Purchase","experience_category":null},{"id":65,"rating":"UP","comment":"Gigigu","created_at":"2015-03-21T19:29:21.710Z","category":"Move Management","experience_category":null},{"id":66,"rating":"UP","comment":"Ljfoyfd","created_at":"2015-03-21T19:30:13.000Z","category":"Bristol Advisor","experience_category":null},{"id":67,"rating":"UP","comment":"Gcihgihv","created_at":"2015-03-21T20:37:44.240Z","category":"Bristol Advisor","experience_category":null},{"id":68,"rating":"UP","comment":"Khvkhgog","created_at":"2015-03-21T20:37:59.050Z","category":"Home Sale","experience_category":null},{"id":1078,"rating":"UP","comment":"everything is good","created_at":"2015-04-16T20:44:00.997Z","category":"Move Management","experience_category":null},{"id":3109,"rating":"UP","comment":"Test\n","created_at":"2015-06-12T15:15:15.670Z","category":"Bristol Advisor","experience_category":null},{"id":5192,"rating":"UP","comment":"Uhghu","created_at":"2015-09-23T21:04:13.223Z","category":"Bristol Advisor","experience_category":null},{"id":8257,"rating":"DOWN","comment":"I am testing it","created_at":"2015-11-30T04:23:39.267Z","category":"Move Management","experience_category":null},{"id":8262,"rating":"UP","comment":"Gjfhd","created_at":"2015-12-03T09:10:17.463Z","category":"Bristol Advisor","experience_category":null},{"id":8263,"rating":"UP","comment":"Jg hvhcgcuch","created_at":"2015-12-03T09:11:07.483Z","category":"Bristol Advisor","experience_category":null},{"id":8264,"rating":"DOWN","comment":"Dhshge","created_at":"2015-12-03T09:12:31.547Z","category":"Bristol Advisor","experience_category":null},{"id":8265,"rating":"DOWN","comment":"fdfgd","created_at":"2015-12-03T13:24:35.393Z","category":"Home Sale","experience_category":null},{"id":9267,"rating":"UP","comment":"wonderful","created_at":"2015-12-05T20:26:28.517Z","category":"Bristol Advisor","experience_category":null},{"id":9268,"rating":"DOWN","comment":"Tctc","created_at":"2015-12-08T09:32:36.467Z","category":"Home Purchase","experience_category":null},{"id":9269,"rating":"UP","comment":"Vhnsd","created_at":"2015-12-08T09:33:05.493Z","category":"Temp Housing","experience_category":null},{"id":9274,"rating":"UP","comment":"Nhngx","created_at":"2015-12-18T06:40:45.850Z","category":"Move Management","experience_category":null},{"id":9275,"rating":"DOWN","comment":"Mjjjmm","created_at":"2015-12-18T06:41:32.057Z","category":"Home Purchase","experience_category":null},{"id":9289,"rating":"DOWN","comment":"Hhfgvvvjchcjcjchcjcucicifkcicicicjcjc","created_at":"2016-01-01T06:24:47.160Z","category":"Rental","experience_category":null},{"id":9290,"rating":"DOWN","comment":"Lmnop","created_at":"2016-01-01T06:25:26.320Z","category":"Temp Housing","experience_category":null},{"id":9298,"rating":"UP","comment":"Tvyv","created_at":"2016-01-06T08:04:03.680Z","category":"Home Sale","experience_category":null},{"id":9300,"rating":"UP","comment":"Fbb","created_at":"2016-01-07T13:32:31.003Z","category":"Rental","experience_category":null},{"id":9304,"rating":"UP","comment":"Ghe","created_at":"2016-01-08T06:32:44.590Z","category":"Move Management","experience_category":null},{"id":9305,"rating":"DOWN","comment":"Twgwge","created_at":"2016-01-08T09:31:05.543Z","category":"Home Purchase","experience_category":null},{"id":9306,"rating":"UP","comment":"Duskd","created_at":"2016-01-08T12:32:52.360Z","category":"Move Management","experience_category":null},{"id":9307,"rating":"UP","comment":"Ha","created_at":"2016-01-08T12:39:30.390Z","category":"Move Management","experience_category":null},{"id":9308,"rating":"UP","comment":"Hh","created_at":"2016-01-08T12:47:15.057Z","category":"Bristol Advisor","experience_category":null},{"id":9309,"rating":"UP","comment":"Gshs","created_at":"2016-01-08T12:50:53.567Z","category":"Bristol Advisor","experience_category":null},{"id":9312,"rating":"UP","comment":"Fhv","created_at":"2016-01-09T05:37:41.830Z","category":"Bristol Advisor","experience_category":null},{"id":9313,"rating":"UP","comment":"Hxjz","created_at":"2016-01-09T06:33:33.550Z","category":"Bristol Advisor","experience_category":null},{"id":9314,"rating":"DOWN","comment":"Www","created_at":"2016-01-09T06:36:25.477Z","category":"Bristol Advisor","experience_category":null},{"id":9315,"rating":"UP","comment":"Tgg","created_at":"2016-01-09T06:38:43.010Z","category":"Bristol Advisor","experience_category":null},{"id":9316,"rating":"UP","comment":"Cbcd","created_at":"2016-01-09T06:41:05.647Z","category":"Move Management","experience_category":null},{"id":9317,"rating":"UP","comment":"Sczgd","created_at":"2016-01-09T06:50:25.677Z","category":"Move Management","experience_category":null},{"id":9318,"rating":"UP","comment":"Vavsd","created_at":"2016-01-09T07:04:40.557Z","category":"Move Management","experience_category":null},{"id":9321,"rating":"UP","comment":"W","created_at":"2016-01-09T07:10:54.710Z","category":"Bristol Advisor","experience_category":null},{"id":9322,"rating":"UP","comment":"fvkf","created_at":"2016-01-09T07:55:47.757Z","category":"Home Sale","experience_category":null},{"id":9323,"rating":"DOWN","comment":"Hshs","created_at":"2016-01-09T10:46:00.893Z","category":"Home Sale","experience_category":null},{"id":9324,"rating":"UP","comment":"Gennr","created_at":"2016-01-09T10:50:16.260Z","category":"Home Purchase","experience_category":null},{"id":9325,"rating":"UP","comment":"Dndnd","created_at":"2016-01-09T10:52:43.340Z","category":"Move Management","experience_category":null},{"id":9326,"rating":"UP","comment":"Cava","created_at":"2016-01-09T10:59:13.347Z","category":"Move Management","experience_category":null},{"id":9327,"rating":"UP","comment":"Hw","created_at":"2016-01-09T11:01:31.827Z","category":"Move Management","experience_category":null},{"id":9328,"rating":"UP","comment":"Hxhz","created_at":"2016-01-09T11:08:14.657Z","category":"Move Management","experience_category":null},{"id":9329,"rating":"UP","comment":"I vav","created_at":"2016-01-09T11:10:48.510Z","category":"Move Management","experience_category":null},{"id":9330,"rating":"UP","comment":"RShzz","created_at":"2016-01-09T11:26:30.267Z","category":"Move Management","experience_category":null},{"id":9331,"rating":"UP","comment":"Skd","created_at":"2016-01-09T11:29:29.790Z","category":"Home Sale","experience_category":null},{"id":9334,"rating":"UP","comment":"tct tc","created_at":"2016-01-11T06:41:50.170Z","category":"Move Management","experience_category":null},{"id":9337,"rating":"UP","comment":"Gffh","created_at":"2016-01-15T05:02:51.597Z","category":"Bristol Advisor","experience_category":null},{"id":9338,"rating":"DOWN","comment":"Fedjh\nF bb","created_at":"2016-01-15T06:17:16.350Z","category":"Bristol Advisor","experience_category":null},{"id":9339,"rating":"UP","comment":"Fhod ","created_at":"2016-01-15T06:23:54.647Z","category":"Home Purchase","experience_category":null},{"id":9340,"rating":"DOWN","comment":"Gf","created_at":"2016-01-15T09:30:53.283Z","category":"Move Management","experience_category":null},{"id":9342,"rating":"UP","comment":"Gy","created_at":"2016-01-15T09:40:45.813Z","category":"Move Management","experience_category":null},{"id":9343,"rating":"DOWN","comment":"Gh","created_at":"2016-01-15T09:43:24.923Z","category":"Move Management","experience_category":null},{"id":9344,"rating":"DOWN","comment":"Test","created_at":"2016-01-15T09:45:41.223Z","category":"Bristol Advisor","experience_category":null},{"id":9345,"rating":"UP","comment":"T","created_at":"2016-01-15T09:49:22.923Z","category":"Move Management","experience_category":null},{"id":9346,"rating":"UP","comment":"H","created_at":"2016-01-15T09:54:00.383Z","category":"Bristol Advisor","experience_category":null},{"id":9347,"rating":"DOWN","comment":"Chyd","created_at":"2016-01-15T09:55:21.257Z","category":"Move Management","experience_category":null},{"id":9348,"rating":"UP","comment":"Hhhf","created_at":"2016-01-15T09:59:51.310Z","category":"Bristol Advisor","experience_category":null},{"id":9349,"rating":"UP","comment":"Gffg","created_at":"2016-01-15T10:02:00.347Z","category":"Move Management","experience_category":null},{"id":9350,"rating":"UP","comment":"Ghh","created_at":"2016-01-15T10:08:25.027Z","category":"Move Management","experience_category":null},{"id":9351,"rating":"DOWN","comment":"Tgg","created_at":"2016-01-15T10:09:25.927Z","category":"Bristol Advisor","experience_category":null},{"id":9352,"rating":"DOWN","comment":"To much costly","created_at":"2016-01-15T10:11:18.577Z","category":"Expense","experience_category":null},{"id":9353,"rating":"UP","comment":"Testng","created_at":"2016-01-15T10:25:16.590Z","category":"Move Management","experience_category":null},{"id":9354,"rating":"UP","comment":"T","created_at":"2016-01-15T10:34:59.330Z","category":"Bristol Advisor","experience_category":null},{"id":9355,"rating":"UP","comment":"R","created_at":"2016-01-15T10:38:48.563Z","category":"Bristol Advisor","experience_category":null},{"id":9356,"rating":"UP","comment":"D","created_at":"2016-01-15T10:42:31.327Z","category":"Bristol Advisor","experience_category":null},{"id":9357,"rating":"DOWN","comment":"G","created_at":"2016-01-15T10:45:55.703Z","category":"Move Management","experience_category":null},{"id":9358,"rating":"UP","comment":"F","created_at":"2016-01-15T10:51:09.120Z","category":"Rental","experience_category":null},{"id":9359,"rating":"UP","comment":"G","created_at":"2016-01-15T10:56:19.327Z","category":"Temp Housing","experience_category":null},{"id":9360,"rating":"UP","comment":"H","created_at":"2016-01-15T11:14:29.147Z","category":"Home Sale","experience_category":null},{"id":9361,"rating":"DOWN","comment":"Ytt","created_at":"2016-01-15T11:22:32.173Z","category":"Home Sale","experience_category":null},{"id":9362,"rating":"DOWN","comment":"Hvc","created_at":"2016-01-15T11:28:25.147Z","category":"Mortgage","experience_category":null},{"id":9363,"rating":"UP","comment":"Ggg","created_at":"2016-01-15T11:33:11.047Z","category":"Move Management","experience_category":null},{"id":9364,"rating":"UP","comment":"B","created_at":"2016-01-15T11:36:33.480Z","category":"Home Sale","experience_category":null},{"id":9366,"rating":"UP","comment":"تفھفچ","created_at":"2016-01-18T05:14:36.117Z","category":"Bristol Advisor","experience_category":null},{"id":9367,"rating":"UP","comment":"Tdd","created_at":"2016-01-19T05:55:14.997Z","category":"Home Sale","experience_category":null},{"id":9391,"rating":"UP","comment":"Tyy","created_at":"2016-02-19T12:13:16.670Z","category":"Move Management","experience_category":null},{"id":9392,"rating":"UP","comment":"G\n","created_at":"2016-02-19T12:15:32.690Z","category":"Home Purchase","experience_category":null},{"id":9393,"rating":"UP","comment":"Ni\n","created_at":"2016-02-19T12:17:49.860Z","category":"Move Management","experience_category":null},{"id":9394,"rating":"UP","comment":"G","created_at":"2016-02-19T12:25:23.837Z","category":"Home Sale","experience_category":null},{"id":9395,"rating":"UP","comment":"G","created_at":"2016-02-19T12:26:52.187Z","category":"Home Sale","experience_category":null},{"id":9396,"rating":"UP","comment":"G","created_at":"2016-02-19T12:41:28.700Z","category":"Move Management","experience_category":null},{"id":10660,"rating":"UP","comment":"Sdf","created_at":"2016-07-21T17:43:11.353Z","category":"Rental","experience_category":null},{"id":10661,"rating":"DOWN","comment":"Asd","created_at":"2016-07-21T18:17:06.993Z","category":"Move Management","experience_category":null}];
					 var mapped = $.map(result, function (row) {
	                	console.log(row);
	                    row.experience_category_id = (row.experience_category) ? row.experience_category.id : -1;
	                	row.experience_category_name = (row.experience_category) ? row.experience_category.name : "";
						row.description = (row.experience_category) ? row.experience_category.description : "";

	                	row.created_at = formatDate(row.created_at);  
						if(row.experience_category)              	
							return row;
	                });
	                deferred.resolve(mapped);
					/**test end */
					formatErrorMessage(jqXHR, errorThrown);
				},
				success: function (result) {
	                var mapped = $.map(result, function (row) {
	                	console.log(row);
	                    row.experience_category_id = (row.experience_category) ? row.experience_category.id : -1;
	                	row.experience_category_name = (row.experience_category) ? row.experience_category.name : "";
						row.description = (row.experience_category) ? row.experience_category.description : "";
						
	                	row.created_at = formatDate(row.created_at);    
						if(row.experience_category)            	
							return row;
	                });
	                deferred.resolve(mapped);
	            }
	        });
	        return deferred;			
		},
			
		byKey: function(key) {
	        //return $.getJSON(API_EXPERIENCES + "/" + encodeURIComponent(key));
			return $.ajax({
				url: API_EXPERIENCES + "/" + encodeURIComponent(key),
				type: 'GET',
				contentType : 'application/json',
				headers: {
				   'X-User-Email' : xuser_email,
				   'X-User-Token' : xuser_token
				},
				error: function(jqXHR, textStatus, errorThrown){
					formatErrorMessage(jqXHR, errorThrown);
				}
			});	        
	    },
	 
	    insert: function(values) {
	    	showPleaseWait();
	        $.ajax({
	            url: API_EXPERIENCES,
	            type: 'POST',
	            data: JSON.stringify(values),
	            processData: false,
				headers: {
				   'X-User-Email' : xuser_email,
				   'X-User-Token' : xuser_token
				},	            contentType : 'application/json',
	            success: function(response, textStatus, jqXhr) { },
				error: function(jqXHR, textStatus, errorThrown){
					formatErrorMessage(jqXHR, errorThrown);
				},
	            complete: function(){
	                hidePleaseWait();
	                console.log('experience insert completed');
	                Elite.app.navigate("experienceslist", { root: true, direction: "backward" });
	                return true;
	            }
	        });
	    },
	 
	    update: function(key, values) {
	    	showPleaseWait();
	        $.ajax({
	            url: API_EXPERIENCES + "/" + encodeURIComponent(key),
	            type: 'PATCH',
	            data: JSON.stringify(values),
	            processData: false,
	            contentType : 'application/json',
				headers: {
				   'X-User-Email' : xuser_email,
				   'X-User-Token' : xuser_token
				},
				success: function(response, textStatus, jqXhr) { },
				error: function(jqXHR, textStatus, errorThrown){
					formatErrorMessage(jqXHR, errorThrown);
				},
	            complete: function(){
	                hidePleaseWait();
	                console.log('experience update completed');
	                Elite.app.navigate("experienceslist", { root: true, direction: "backward" });
	                return true;
	            }
	        });
	    },
	 
	    remove: function(key) {
	        return $.ajax({
	            url: API_EXPERIENCES + "/" + encodeURIComponent(key),
	            method: "DELETE",
				error: function(jqXHR, textStatus, errorThrown){
					formatErrorMessage(jqXHR, errorThrown);
				}
	        });
	    }
	});


/* Expenses Data Store */
	var vouchers_store = new DevExpress.data.CustomStore({
		load: function (loadOptions) {
						
			var deferred = new $.Deferred();
            $.ajax({
				url: API_EXPENSE_VOUCHERS,
				type: 'GET',
				contentType : 'application/json',
				headers: {
				   'X-User-Email' : xuser_email,
				   'X-User-Token' : xuser_token
				},			
				error: function(jqXHR, textStatus, errorThrown){
					formatErrorMessage(jqXHR, errorThrown);
				},
				success: function (result) {
	            	console.log(result);
	                var mapped = $.map(result, function (row) {
						return row;
	                });
	                deferred.resolve(mapped);
	            }
	        });
	        return deferred;			
		},
			
		byKey: function(key) {
	        //return $.getJSON(API_EXPENSE_VOUCHERS + "/" + encodeURIComponent(key));
			return $.ajax({
				url: API_EXPENSE_VOUCHERS + "/" + encodeURIComponent(key),
				type: 'GET',
				contentType : 'application/json',
				headers: {
				   'X-User-Email' : xuser_email,
				   'X-User-Token' : xuser_token
				},
				error: function(jqXHR, textStatus, errorThrown){
					formatErrorMessage(jqXHR, errorThrown);
				},
			});	        
	    },
	 
	    insert: function(values) {
	    	showPleaseWait();
	        $.ajax({
	            url: API_EXPENSE_VOUCHERS,
	            type: 'POST',
	            data: JSON.stringify(values),
				headers: {
				   'X-User-Email' : xuser_email,
				   'X-User-Token' : xuser_token
				},
				processData: false,
	            contentType : 'application/json',
	            success: function(response, textStatus, jqXhr) { },
				error: function(jqXHR, textStatus, errorThrown){
					formatErrorMessage(jqXHR, errorThrown);
				},
	            complete: function(){
	                hidePleaseWait();
	                console.log('completed');
	                return true;
	            }
	        });
	    },
	 
	    update: function(key, values) {
	    	showPleaseWait();
	        $.ajax({
	            url: API_EXPENSE_VOUCHERS + "/" + encodeURIComponent(key),
	            type: 'PATCH',
	            data: JSON.stringify(values),
	            processData: false,
	            contentType : 'application/json',
				headers: {
				   'X-User-Email' : xuser_email,
				   'X-User-Token' : xuser_token
				},
	            success: function(response, textStatus, jqXhr) { },
				error: function(jqXHR, textStatus, errorThrown){
					formatErrorMessage(jqXHR, errorThrown);
				},
	            complete: function(){
	                hidePleaseWait();
	                console.log('completed');
	                return true;
	            }
	        });
	    },
	 
	    remove: function(key) {
	        return $.ajax({
	            url: API_EXPENSE_VOUCHERS + "/" + encodeURIComponent(key),
	            method: "DELETE",
				error: function(jqXHR, textStatus, errorThrown){
					formatErrorMessage(jqXHR, errorThrown);
				}	
	        });
	    }
	});

/* Shipments Data Store */
var shipments_store = new DevExpress.data.CustomStore({
    load: function (loadOptions) {
        console.log("=====" + API_SHIPMENTS + xuser_token + xuser_email + loadOptions);
        console.log(loadOptions);

        var deferred = new $.Deferred();
        $.ajax({
			url: API_SHIPMENTS,
			type: 'GET',
			contentType : 'application/json',
			headers: {
			   'X-User-Email' : xuser_email,
			   'X-User-Token' : xuser_token
			},			
			error: function(jqXHR, textStatus, errorThrown){
				/* test*/
				var result=[{"id":11112,"assignment_id":8121,"primary_shipment":"EQTRUE","service_order_id":38075,"shipment_type":"Air Shipment","departure_city":"Singapore","departure_country_code":"SGP","destination_city":"Singapore","departure_state":null,"departure_state_code":null,"destination_country_code":"SGP","destination_state":null,"requested_survey":"2014-06-10","scheduled_survey":null,"actual_survey":null,"requested_pack":"2014-06-20","scheduled_pack_start":"2014-06-21","actual_pack_start":"2014-06-21","scheduled_pack_end":"2014-06-22","actual_pack_end":"2014-06-22","requested_load":"2014-06-21","scheduled_load":"2014-06-24","actual_load":"2014-06-24","scheduled_load_end":"2014-06-25","actual_load_end":"2014-06-25","requested_delivery":"2014-07-15","scheduled_delivery":"2014-07-22","actual_delivery":"2014-07-15","scheduled_delivery_end":"2014-07-23","actual_delivery_end":"2014-07-16","scheduled_customs_clearance":null,"actual_customs_clearance":null,"storage_begin":null,"storage_end":null,"days_in_storage":null,"storage_location":null,"estimated_storage":null,"vendor_contact_full_name":"Mary Pope","vendor_contact_email":"mpope@mesasystemsinc.com","vendor_contact_phone":"801-974-7807","vendor_name":"Mesa Systems U802"},{"id":18202,"assignment_id":8121,"primary_shipment":"EQFALS","service_order_id":66577,"shipment_type":"Ground Shipment","departure_city":"Singapore","departure_country_code":"SGP","destination_city":"Singapore","departure_state":null,"departure_state_code":null,"destination_country_code":"SGP","destination_state":null,"requested_survey":null,"scheduled_survey":null,"actual_survey":null,"requested_pack":null,"scheduled_pack_start":null,"actual_pack_start":null,"scheduled_pack_end":null,"actual_pack_end":null,"requested_load":null,"scheduled_load":null,"actual_load":null,"scheduled_load_end":null,"actual_load_end":null,"requested_delivery":null,"scheduled_delivery":null,"actual_delivery":null,"scheduled_delivery_end":null,"actual_delivery_end":null,"scheduled_customs_clearance":null,"actual_customs_clearance":null,"storage_begin":null,"storage_end":null,"days_in_storage":null,"storage_location":null,"estimated_storage":null,"vendor_contact_full_name":" New orders","vendor_contact_email":"info@reloinsurance.com","vendor_contact_phone":null,"vendor_name":"Relo Insurance"},{"id":18411,"assignment_id":8121,"primary_shipment":"EQFALS","service_order_id":67323,"shipment_type":"Sea Shipment","departure_city":"Singapore","departure_country_code":"SGP","destination_city":"Singapore","departure_state":null,"departure_state_code":null,"destination_country_code":"SGP","destination_state":null,"requested_survey":null,"scheduled_survey":null,"actual_survey":null,"requested_pack":null,"scheduled_pack_start":null,"actual_pack_start":null,"scheduled_pack_end":null,"actual_pack_end":null,"requested_load":null,"scheduled_load":null,"actual_load":null,"scheduled_load_end":null,"actual_load_end":null,"requested_delivery":null,"scheduled_delivery":null,"actual_delivery":null,"scheduled_delivery_end":null,"actual_delivery_end":null,"scheduled_customs_clearance":null,"actual_customs_clearance":null,"storage_begin":null,"storage_end":null,"days_in_storage":null,"storage_location":null,"estimated_storage":null,"vendor_contact_full_name":" New orders","vendor_contact_email":"info@reloinsurance.com","vendor_contact_phone":null,"vendor_name":"Relo Insurance"},{"id":18564,"assignment_id":8121,"primary_shipment":"EQFALS","service_order_id":67837,"shipment_type":"Sea Shipment","departure_city":"Singapore","departure_country_code":"SGP","destination_city":"Singapore","departure_state":null,"departure_state_code":null,"destination_country_code":"SGP","destination_state":null,"requested_survey":null,"scheduled_survey":null,"actual_survey":null,"requested_pack":null,"scheduled_pack_start":null,"actual_pack_start":null,"scheduled_pack_end":null,"actual_pack_end":null,"requested_load":null,"scheduled_load":null,"actual_load":null,"scheduled_load_end":null,"actual_load_end":null,"requested_delivery":null,"scheduled_delivery":null,"actual_delivery":null,"scheduled_delivery_end":null,"actual_delivery_end":null,"scheduled_customs_clearance":null,"actual_customs_clearance":null,"storage_begin":null,"storage_end":null,"days_in_storage":null,"storage_location":null,"estimated_storage":null,"vendor_contact_full_name":" New orders","vendor_contact_email":"info@reloinsurance.com","vendor_contact_phone":null,"vendor_name":"Relo Insurance"},{"id":18771,"assignment_id":8121,"primary_shipment":"EQFALS","service_order_id":null,"shipment_type":"Air Shipment","departure_city":"Singapore","departure_country_code":"SGP","destination_city":"Singapore","departure_state":null,"departure_state_code":null,"destination_country_code":"SGP","destination_state":null,"requested_survey":null,"scheduled_survey":null,"actual_survey":null,"requested_pack":null,"scheduled_pack_start":null,"actual_pack_start":null,"scheduled_pack_end":null,"actual_pack_end":null,"requested_load":null,"scheduled_load":null,"actual_load":null,"scheduled_load_end":null,"actual_load_end":null,"requested_delivery":null,"scheduled_delivery":null,"actual_delivery":null,"scheduled_delivery_end":null,"actual_delivery_end":null,"scheduled_customs_clearance":null,"actual_customs_clearance":null,"storage_begin":null,"storage_end":null,"days_in_storage":null,"storage_location":null,"estimated_storage":null,"vendor_contact_full_name":" ","vendor_contact_email":null,"vendor_contact_phone":null,"vendor_name":null},{"id":20609,"assignment_id":8121,"primary_shipment":"EQFALS","service_order_id":null,"shipment_type":"Air Shipment","departure_city":"Singapore","departure_country_code":"SGP","destination_city":"Singapore","departure_state":null,"departure_state_code":null,"destination_country_code":"SGP","destination_state":null,"requested_survey":null,"scheduled_survey":null,"actual_survey":null,"requested_pack":null,"scheduled_pack_start":null,"actual_pack_start":null,"scheduled_pack_end":null,"actual_pack_end":null,"requested_load":null,"scheduled_load":null,"actual_load":null,"scheduled_load_end":null,"actual_load_end":null,"requested_delivery":null,"scheduled_delivery":null,"actual_delivery":null,"scheduled_delivery_end":null,"actual_delivery_end":null,"scheduled_customs_clearance":null,"actual_customs_clearance":null,"storage_begin":null,"storage_end":null,"days_in_storage":null,"storage_location":null,"estimated_storage":"30 days","vendor_contact_full_name":" ","vendor_contact_email":null,"vendor_contact_phone":null,"vendor_name":null}];
				var mapped = $.map(result, function (row) {
					console.log(row);
	                row.destination = row.destination_city;
	                if(row.destination_state)
	                	row.destination += ", " + row.destination_state;
	                	
	                row.departure = row.departure_city;
	                if(row.departure_state)
	                	row.departure += ", " + row.departure_state;
	                
	                return row;
	            });
	            deferred.resolve(mapped);
				/* test end */
               console.log("error+++"  + errorThrown);
				formatErrorMessage(jqXHR, errorThrown);
			},
			success: function (result) {
	            var mapped = $.map(result, function (row) {
					console.log(row);
	                row.destination = row.destination_city;
	                if(row.destination_state)
	                	row.destination += ", " + row.destination_state;
	                	
	                row.departure = row.departure_city;
	                if(row.departure_state)
	                	row.departure += ", " + row.departure_state;
	                
	                return row;
	            });
	            deferred.resolve(mapped);
	        }
	    });
        return deferred;
    },
     
    byKey: function(key) {
        //return $.getJSON(API_SHIPMENTS + "/" + encodeURIComponent(key));
		return $.ajax({
			url: API_SHIPMENTS + "/" + encodeURIComponent(key),
			type: 'GET',
			contentType : 'application/json',
			headers: {
			   'X-User-Email' : xuser_email,
			   'X-User-Token' : xuser_token
			},
			error: function(jqXHR, textStatus, errorThrown){
				formatErrorMessage(jqXHR, errorThrown);
			}
		});	        
    }
});

/* Home Showing Data Store */
	var homeshowing_store = new DevExpress.data.CustomStore({
		load: function (loadOptions) {
						
			var deferred = new $.Deferred();
	        $.ajax({
				url: API_HOMESHOWINGS,
				type: 'GET',
				contentType : 'application/json',
				headers: {
				   'X-User-Email' : xuser_email,
				   'X-User-Token' : xuser_token
				},			
				error: function(jqXHR, textStatus, errorThrown){
					/**test */
					var result = [{"id":2023,"nickname":"Nickname","address_line_1":"ad1","address_line_2":"ad2","city":"lahore","state_code":"PB","country_code":"PAK","latitude":null,"longitude":null,"rating":2.5,"created_at":"2015-12-21T13:07:09.903Z","price":45566,"postal_code":"4556","home_showing_notes":[{"id":1017,"comment":"Bhhb","created_at":"2016-01-06T06:28:54.147Z"},{"id":1018,"comment":"HnununHmunun","created_at":"2016-01-06T06:29:03.073Z"}],"home_showing_pictures":[{"id":14,"thumb_url":"https://bristolelite.s3.amazonaws.com/pictures/home_showing_picture/image/14/thumb_cdv_photo_001.jpg?X-Amz-Expires=300&X-Amz-Date=20160729T191410Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJSR3WDJKDKAI7ZWQ/20160729/us-east-1/s3/aws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=d27544141d4edf92860703a74f91c3455c52f7a286d3094a1f5a9ac866fe0d44","medium_url":"https://bristolelite.s3.amazonaws.com/pictures/home_showing_picture/image/14/medium_cdv_photo_001.jpg?X-Amz-Expires=300&X-Amz-Date=20160729T191410Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJSR3WDJKDKAI7ZWQ/20160729/us-east-1/s3/aws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=c9c2529bee11c7b35b7b984548955bc826d4771105d7429d8a5a41d1676a5355"},{"id":15,"thumb_url":"https://bristolelite.s3.amazonaws.com/pictures/home_showing_picture/image/15/thumb_cdv_photo_002.jpg?X-Amz-Expires=300&X-Amz-Date=20160729T191410Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJSR3WDJKDKAI7ZWQ/20160729/us-east-1/s3/aws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=2c82674f0bf055c663aa35d519fd950165695dd1c1156692a9916d230b0f607c","medium_url":"https://bristolelite.s3.amazonaws.com/pictures/home_showing_picture/image/15/medium_cdv_photo_002.jpg?X-Amz-Expires=300&X-Amz-Date=20160729T191410Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJSR3WDJKDKAI7ZWQ/20160729/us-east-1/s3/aws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=32ee7d088347536f0f8a11df517635f2240983953cc65d3364e576bcb3c5773e"},{"id":16,"thumb_url":"https://bristolelite.s3.amazonaws.com/pictures/home_showing_picture/image/16/thumb_cdv_photo_001.jpg?X-Amz-Expires=300&X-Amz-Date=20160729T191410Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJSR3WDJKDKAI7ZWQ/20160729/us-east-1/s3/aws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=a1ed5e662f10851dbd444dd3b66ed4c963cc26a660b10ca451bd3c11f4552b81","medium_url":"https://bristolelite.s3.amazonaws.com/pictures/home_showing_picture/image/16/medium_cdv_photo_001.jpg?X-Amz-Expires=300&X-Amz-Date=20160729T191410Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJSR3WDJKDKAI7ZWQ/20160729/us-east-1/s3/aws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=0f1cc0132aa6d04f77c3351ac319cdfa6af9d9d218d401593e1ea6eae1dd6a13"}]},{"id":6,"nickname":"Test Home 2","address_line_1":"A","address_line_2":"B","city":"C","state_code":"DR","country_code":"ALB","latitude":35.209346771240234,"longitude":-106.67250061035156,"rating":3,"created_at":"2014-07-25T14:55:31.387Z","price":3,"postal_code":"12345","home_showing_notes":[{"id":15,"comment":"test noteGnng f f ","created_at":"2015-02-09T03:00:51.420Z"}],"home_showing_pictures":[]},{"id":5,"nickname":"Test Home 1","address_line_1":"Lusejiayuan","address_line_2":"","city":"Daqing","state_code":"23","country_code":"CHN","latitude":null,"longitude":null,"rating":1.5,"created_at":"2014-07-25T14:43:46.483Z","price":123,"postal_code":"163000","home_showing_notes":[{"id":6,"comment":"This is test note","created_at":"2014-07-25T14:53:35.933Z"},{"id":7,"comment":"Test Note - Home1","created_at":"2014-07-25T15:06:47.847Z"}],"home_showing_pictures":[]}];
					var mapped = $.map(result, function (row) {
						return row;
	                });
	                deferred.resolve(mapped);
					/**test end */
					formatErrorMessage(jqXHR, errorThrown);
				},
				success: function (result) {
	            	console.log(result);
	                var mapped = $.map(result, function (row) {
						return row;
	                });
	                deferred.resolve(mapped);
	            }
	        });
	        return deferred;			
		},
			
		byKey: function(key) {
	        //return $.getJSON(API_HOMESHOWINGS + "/" + encodeURIComponent(key));
			return $.ajax({
				url: API_HOMESHOWINGS_DETAIL + "/" + encodeURIComponent(key),
				type: 'GET',
				contentType : 'application/json',
				headers: {
				   'X-User-Email' : xuser_email,
				   'X-User-Token' : xuser_token
				},
				error: function(jqXHR, textStatus, errorThrown){
					formatErrorMessage(jqXHR, errorThrown);
				}
			});		        
	    },
	 
	    insert: function(values) {
	    	showPleaseWait();
	        $.ajax({
	            url: API_HOMESHOWINGS,
	            type: 'POST',
	            data: JSON.stringify(values),
	            processData: false,
	            contentType : 'application/json',
				headers: {
				   'X-User-Email' : xuser_email,
				   'X-User-Token' : xuser_token
				},
	            success: function(response, textStatus, jqXhr) { },
				error: function(jqXHR, textStatus, errorThrown){
					formatErrorMessage(jqXHR, errorThrown);
				},
	            complete: function(){
	                hidePleaseWait();
	                console.log('completed');
	                Elite.app.navigate("homepurchase", { root: true, direction: "backward" });
	                return true;
	            }
	        });
	    },
	 
	    update: function(key, values) {
	    	showPleaseWait();
	        $.ajax({
	            url: API_HOMESHOWINGS + "/" + encodeURIComponent(key),
	            type: 'PATCH',
	            data: JSON.stringify(values),
	            processData: false,
	            contentType : 'application/json',
				headers: {
				   'X-User-Email' : xuser_email,
				   'X-User-Token' : xuser_token
				},
	            success: function(response, textStatus, jqXhr) { },
				error: function(jqXHR, textStatus, errorThrown){
					formatErrorMessage(jqXHR, errorThrown);
				},
	            complete: function(){
	                hidePleaseWait();
	                console.log('completed');
	                Elite.app.navigate("homepurchase", { root: true, direction: "backward" });
	                return true;
	            }
	        });
	    },
	 
	    remove: function(key) {
	        return $.ajax({
	            url: API_HOMESHOWINGS + "/" + encodeURIComponent(key),
	            method: "DELETE",
				error: function(jqXHR, textStatus, errorThrown){
					formatErrorMessage(jqXHR, errorThrown);
				}
	        });
	    }
	});

/* Expenses Store */
	var expenses_store = new DevExpress.data.CustomStore({
		load: function (loadOptions) {
			
			var deferred = new $.Deferred();
	        $.ajax({
				url: API_EXPENSES,
				type: 'GET',
				contentType : 'application/json',
				headers: {
				   'X-User-Email' : xuser_email,
				   'X-User-Token' : xuser_token
				},			
				error: function(jqXHR, textStatus, errorThrown){
					formatErrorMessage(jqXHR, errorThrown);
				},
				success: function (result) {			
	            	console.log(result);
	                var mapped = $.map(result, function (row) {
	                	row.date_from = formatDate(row.date_from);
	                	row.date_to = formatDate(row.date_to);
						row.submitted_amount = parseFloat(row.submitted_amount).toFixed(2);
						return row;
	                });
	                deferred.resolve(mapped);
	            }
	        });
	        return deferred;			
		},
			
		byKey: function(key) {
	        //return $.getJSON(API_EXPENSES + "/" + encodeURIComponent(key));
			return $.ajax({
				url: API_EXPENSES + "/" + encodeURIComponent(key),
				type: 'GET',
				contentType : 'application/json',
				headers: {
				   'X-User-Email' : xuser_email,
				   'X-User-Token' : xuser_token
				},
				error: function(jqXHR, textStatus, errorThrown){
					formatErrorMessage(jqXHR, errorThrown);
				}
			});		        
	    },
	 
	    insert: function(values) {
	    	showPleaseWait();
	        $.ajax({
	            url: API_EXPENSES,
	            type: 'POST',
	            data: JSON.stringify(values),
	            processData: false,
	            contentType : 'application/json',
				headers: {
				   'X-User-Email' : xuser_email,
				   'X-User-Token' : xuser_token
				},
	            success: function(response, textStatus, jqXhr) { },
				error: function(jqXHR, textStatus, errorThrown){
					formatErrorMessage(jqXHR, errorThrown);
				},
	            complete: function(){
	                hidePleaseWait();
	                console.log('completed');
	                return true;
	            }
	        });
	    },
	 
	    update: function(key, values) {
	    	showPleaseWait();
	        $.ajax({
	            url: API_EXPENSES + "/" + encodeURIComponent(key),
	            type: 'PATCH',
	            data: JSON.stringify(values),
	            processData: false,
	            contentType : 'application/json',
				headers: {
				   'X-User-Email' : xuser_email,
				   'X-User-Token' : xuser_token
				},
	            success: function(response, textStatus, jqXhr) { },
				error: function(jqXHR, textStatus, errorThrown){
					formatErrorMessage(jqXHR, errorThrown);
				},
	            complete: function(){
	                hidePleaseWait();
	                console.log('completed');
	                return true;
	            }
	        });
	    },
	 
	    remove: function(key) {
	        return $.ajax({
	            url: API_EXPENSES + "/" + encodeURIComponent(key),
	            method: "DELETE",
				error: function(jqXHR, textStatus, errorThrown){
					formatErrorMessage(jqXHR, errorThrown);
				}	
	        });
	    }
	});
		

/* Expense Reports Store */
	var expensereportslist_submitted_store = new DevExpress.data.CustomStore({
		load: function (loadOptions) {
		
			var deferred = new $.Deferred();
	        $.ajax({
				url: API_EXPENSE_REPORTS,
				type: 'GET',
				contentType : 'application/json',
				headers: {
				   'X-User-Email' : xuser_email,
				   'X-User-Token' : xuser_token
				},			
				error: function(jqXHR, textStatus, errorThrown){
					/**test */
					var result = {"not_submitted":[{"id":1025,"assignment_id":8121,"currency_id":"AFN","description":"Test","date_from":"2015-11-16","date_to":"2015-11-16","date_submitted":null,"created_at":"2015-11-17T01:00:55.393Z","updated_at":"2016-02-24T05:11:41.477Z","status":"pending","submitted":false,"voucher_id":null,"voucher_create_at":null},{"id":1026,"assignment_id":8121,"currency_id":"AUD","description":"Test","date_from":"2016-02-24","date_to":"2016-02-24","date_submitted":null,"created_at":"2016-02-24T15:01:58.853Z","updated_at":"2016-02-24T15:01:58.853Z","status":null,"submitted":false,"voucher_id":null,"voucher_create_at":null}],"submitted":[{"voucher_id":56914,"assignment_id":8121,"payee_type_code":"EQPETE","payee_type":"Employee","submitted_amount":null,"submitted_currency_code":null,"submitted_currency":null,"payment_amount":"10750.0","payment_currency_code":"USD","payment_currency":null,"date_from":null,"date_to":null,"description":null,"date_entered":null,"date_received":null,"exchange_rate":1,"exchange_rate_date":"2011-03-10T00:00:00.000Z","status_code":4,"status":"Locked","source_system":null,"source_id":null,"payor":"EQPYWP","create_date":"2012-08-13T12:59:29.637Z","create_by":"pseymour","last_update_date":"2012-08-13T12:59:29.637Z","last_update_by":"pseymour"},{"voucher_id":68843,"assignment_id":8121,"payee_type_code":"EQPETE","payee_type":"Employee","submitted_amount":"1500.0","submitted_currency_code":"USD","submitted_currency":null,"payment_amount":"1500.0","payment_currency_code":"USD","payment_currency":null,"date_from":null,"date_to":null,"description":null,"date_entered":null,"date_received":null,"exchange_rate":1,"exchange_rate_date":"2012-04-10T00:00:00.000Z","status_code":4,"status":"Locked","source_system":null,"source_id":null,"payor":"EQPYWP","create_date":"2013-04-10T15:05:59.330Z","create_by":"pseymour","last_update_date":"2015-09-05T08:37:16.650Z","last_update_by":"ddecot"},{"voucher_id":70325,"assignment_id":8121,"payee_type_code":"EQPETE","payee_type":"Employee","submitted_amount":"1500.0","submitted_currency_code":"USD","submitted_currency":null,"payment_amount":"1500.0","payment_currency_code":"USD","payment_currency":null,"date_from":null,"date_to":null,"description":null,"date_entered":null,"date_received":null,"exchange_rate":1,"exchange_rate_date":"2012-04-10T00:00:00.000Z","status_code":4,"status":"Locked","source_system":null,"source_id":null,"payor":"EQPYWP","create_date":"2013-05-06T15:51:21.990Z","create_by":"pseymour","last_update_date":"2015-09-05T08:37:16.793Z","last_update_by":"ddecot"},{"voucher_id":98751,"assignment_id":8121,"payee_type_code":"EQPETE","payee_type":"Employee","submitted_amount":null,"submitted_currency_code":null,"submitted_currency":null,"payment_amount":null,"payment_currency_code":"USD","payment_currency":null,"date_from":"2013-11-01T00:00:00.000Z","date_to":"2013-11-16T00:00:00.000Z","description":"Test Expense Report","date_entered":null,"date_received":null,"exchange_rate":null,"exchange_rate_date":null,"status_code":1,"status":"Draft","source_system":null,"source_id":null,"payor":"EQPYWP","create_date":"2013-11-26T22:00:23.850Z","create_by":"Alan3","last_update_date":"2014-01-13T17:31:54.610Z","last_update_by":"Alan3"},{"voucher_id":102569,"assignment_id":8121,"payee_type_code":"EQPETE","payee_type":"Employee","submitted_amount":null,"submitted_currency_code":null,"submitted_currency":null,"payment_amount":null,"payment_currency_code":"USD","payment_currency":null,"date_from":"2014-01-01T00:00:00.000Z","date_to":"2014-01-10T00:00:00.000Z","description":"Test Expense Report 2","date_entered":null,"date_received":null,"exchange_rate":null,"exchange_rate_date":null,"status_code":1,"status":"Draft","source_system":null,"source_id":null,"payor":"EQPYWP","create_date":"2014-01-13T18:35:55.460Z","create_by":"Alan3","last_update_date":"2014-01-13T18:35:55.460Z","last_update_by":"Alan3"},{"voucher_id":106689,"assignment_id":8121,"payee_type_code":"EQPETE","payee_type":"Employee","submitted_amount":null,"submitted_currency_code":null,"submitted_currency":null,"payment_amount":"200.0","payment_currency_code":"USD","payment_currency":null,"date_from":"2014-02-01T00:00:00.000Z","date_to":"2014-02-28T00:00:00.000Z","description":"Test Expense Report 4 Mobile","date_entered":null,"date_received":null,"exchange_rate":null,"exchange_rate_date":null,"status_code":1,"status":"Draft","source_system":null,"source_id":null,"payor":"EQPYWP","create_date":"2014-02-27T17:38:16.823Z","create_by":"Alan3","last_update_date":"2014-02-27T17:48:06.350Z","last_update_by":"Alan3"},{"voucher_id":114115,"assignment_id":8121,"payee_type_code":"EQPETE","payee_type":"Employee","submitted_amount":"14.0","submitted_currency_code":"SBD","submitted_currency":null,"payment_amount":null,"payment_currency_code":null,"payment_currency":null,"date_from":"2014-05-28T00:00:00.000Z","date_to":"2014-05-31T00:00:00.000Z","description":"Home finding","date_entered":null,"date_received":"2014-06-01T01:44:09.233Z","exchange_rate":null,"exchange_rate_date":null,"status_code":2,"status":"Approval In Progress","source_system":"MIRACLEGROW API","source_id":5,"payor":"EQPYWP","create_date":"2014-06-01T01:44:09.233Z","create_by":"Elite Mobile","last_update_date":"2014-06-01T01:44:09.233Z","last_update_by":"Elite Mobile"},{"voucher_id":114126,"assignment_id":8121,"payee_type_code":"EQPETE","payee_type":"Employee","submitted_amount":"14.0","submitted_currency_code":"USD","submitted_currency":null,"payment_amount":null,"payment_currency_code":null,"payment_currency":null,"date_from":"2014-05-28T00:00:00.000Z","date_to":"2014-05-31T00:00:00.000Z","description":"Home finding2","date_entered":null,"date_received":"2014-06-02T04:19:34.497Z","exchange_rate":null,"exchange_rate_date":null,"status_code":2,"status":"Approval In Progress","source_system":"MIRACLEGROW API","source_id":5,"payor":"EQPYWP","create_date":"2014-06-02T04:19:34.497Z","create_by":"Elite Mobile","last_update_date":"2014-06-02T04:19:34.497Z","last_update_by":"Elite Mobile"},{"voucher_id":114127,"assignment_id":8121,"payee_type_code":"EQPETE","payee_type":"Employee","submitted_amount":"14.0","submitted_currency_code":"USD","submitted_currency":null,"payment_amount":null,"payment_currency_code":null,"payment_currency":null,"date_from":"2014-05-28T00:00:00.000Z","date_to":"2014-05-31T00:00:00.000Z","description":"Home finding2","date_entered":null,"date_received":"2014-06-02T04:19:34.887Z","exchange_rate":null,"exchange_rate_date":null,"status_code":2,"status":"Approval In Progress","source_system":"MIRACLEGROW API","source_id":5,"payor":"EQPYWP","create_date":"2014-06-02T04:19:34.887Z","create_by":"Elite Mobile","last_update_date":"2014-06-02T04:19:34.887Z","last_update_by":"Elite Mobile"},{"voucher_id":114454,"assignment_id":8121,"payee_type_code":"EQPETE","payee_type":"Employee","submitted_amount":"14.0","submitted_currency_code":"USD","submitted_currency":null,"payment_amount":"14.0","payment_currency_code":"USD","payment_currency":null,"date_from":"2014-05-28T00:00:00.000Z","date_to":"2014-05-31T00:00:00.000Z","description":"Home finding2","date_entered":null,"date_received":"2014-06-04T12:32:19.197Z","exchange_rate":null,"exchange_rate_date":null,"status_code":2,"status":"Approval In Progress","source_system":"MIRACLEGROW API","source_id":5,"payor":"EQPYWP","create_date":"2014-06-04T12:32:19.197Z","create_by":"Elite Mobile","last_update_date":"2014-06-04T12:32:19.197Z","last_update_by":"Elite Mobile"},{"voucher_id":114456,"assignment_id":8121,"payee_type_code":"EQPETE","payee_type":"Employee","submitted_amount":"14.0","submitted_currency_code":"USD","submitted_currency":null,"payment_amount":"14.0","payment_currency_code":"USD","payment_currency":null,"date_from":"2014-05-28T00:00:00.000Z","date_to":"2014-05-31T00:00:00.000Z","description":"Home finding2","date_entered":null,"date_received":"2014-06-04T13:39:45.370Z","exchange_rate":null,"exchange_rate_date":null,"status_code":2,"status":"Approval In Progress","source_system":"MIRACLEGROW API","source_id":5,"payor":"EQPYWP","create_date":"2014-06-04T13:39:45.370Z","create_by":"Elite Mobile","last_update_date":"2014-06-04T13:39:45.370Z","last_update_by":"Elite Mobile"},{"voucher_id":116559,"assignment_id":8121,"payee_type_code":"EQPETE","payee_type":"Employee","submitted_amount":"1.0","submitted_currency_code":"USD","submitted_currency":null,"payment_amount":"1.0","payment_currency_code":"USD","payment_currency":null,"date_from":"2014-06-01T00:00:00.000Z","date_to":"2014-06-06T00:00:00.000Z","description":"Hotel","date_entered":null,"date_received":"2014-06-21T20:15:08.680Z","exchange_rate":null,"exchange_rate_date":null,"status_code":2,"status":"Approval In Progress","source_system":"MIRACLEGROW API","source_id":9,"payor":"EQPYWP","create_date":"2014-06-21T20:15:08.680Z","create_by":"Elite Mobile","last_update_date":"2014-06-21T20:15:08.680Z","last_update_by":"Elite Mobile"},{"voucher_id":116560,"assignment_id":8121,"payee_type_code":"EQPETE","payee_type":"Employee","submitted_amount":"500.0","submitted_currency_code":"SGD","submitted_currency":null,"payment_amount":"500.0","payment_currency_code":"SGD","payment_currency":null,"date_from":"2014-06-01T00:00:00.000Z","date_to":"2014-06-06T00:00:00.000Z","description":"temp living","date_entered":null,"date_received":"2014-06-21T20:15:23.410Z","exchange_rate":null,"exchange_rate_date":null,"status_code":2,"status":"Approval In Progress","source_system":"MIRACLEGROW API","source_id":10,"payor":"EQPYWP","create_date":"2014-06-21T20:15:23.410Z","create_by":"Elite Mobile","last_update_date":"2014-06-21T20:15:23.410Z","last_update_by":"Elite Mobile"},{"voucher_id":121851,"assignment_id":8121,"payee_type_code":"EQPETE","payee_type":"Employee","submitted_amount":"12.0","submitted_currency_code":"USD","submitted_currency":null,"payment_amount":"12.0","payment_currency_code":"USD","payment_currency":null,"date_from":"2014-08-12T00:00:00.000Z","date_to":"2014-08-12T00:00:00.000Z","description":"Receipt Submitted from Mobile App for abc","date_entered":null,"date_received":"2014-08-12T20:15:08.303Z","exchange_rate":null,"exchange_rate_date":null,"status_code":2,"status":"Approval In Progress","source_system":"MIRACLEGROW API","source_id":17,"payor":"EQPYWP","create_date":"2014-08-12T20:15:08.303Z","create_by":"Elite Mobile","last_update_date":"2014-08-12T20:15:08.303Z","last_update_by":"Elite Mobile"},{"voucher_id":123062,"assignment_id":8121,"payee_type_code":"EQPETE","payee_type":"Employee","submitted_amount":"70000.0","submitted_currency_code":"USD","submitted_currency":null,"payment_amount":"70000.0","payment_currency_code":"USD","payment_currency":null,"date_from":null,"date_to":null,"description":null,"date_entered":null,"date_received":"2014-08-26T00:00:00.000Z","exchange_rate":1,"exchange_rate_date":"2014-08-26T00:00:00.000Z","status_code":4,"status":"Locked","source_system":null,"source_id":null,"payor":"EQPYWP","create_date":"2014-08-26T08:46:31.743Z","create_by":"pseymour","last_update_date":"2015-09-05T08:37:18.097Z","last_update_by":"ddecot"},{"voucher_id":186314,"assignment_id":8121,"payee_type_code":"EQPETE","payee_type":"Employee","submitted_amount":"100000.0","submitted_currency_code":"AUD","submitted_currency":null,"payment_amount":"100000.0","payment_currency_code":"AUD","payment_currency":null,"date_from":"2015-12-05T00:00:00.000Z","date_to":"2015-12-05T00:00:00.000Z","description":"Receipt Submitted from Mobile App for Taco John","date_entered":null,"date_received":"2015-12-06T06:30:27.927Z","exchange_rate":null,"exchange_rate_date":null,"status_code":2,"status":"Approval In Progress","source_system":"MIRACLEGROW API","source_id":22947,"payor":"EQPYWP","create_date":"2015-12-06T06:30:27.927Z","create_by":"Elite Mobile","last_update_date":"2015-12-06T06:30:27.927Z","last_update_by":"Elite Mobile"},{"voucher_id":191538,"assignment_id":8121,"payee_type_code":"EQPETE","payee_type":"Employee","submitted_amount":"678.0","submitted_currency_code":"AFA","submitted_currency":null,"payment_amount":"678.0","payment_currency_code":"AFA","payment_currency":null,"date_from":"2016-01-06T00:00:00.000Z","date_to":"2016-01-06T00:00:00.000Z","description":"Receipt Submitted from Mobile App for Ghv","date_entered":null,"date_received":"2016-01-08T06:30:05.243Z","exchange_rate":null,"exchange_rate_date":null,"status_code":2,"status":"Approval In Progress","source_system":"MIRACLEGROW API","source_id":25333,"payor":"EQPYWP","create_date":"2016-01-08T06:30:05.243Z","create_by":"Elite Mobile","last_update_date":"2016-01-08T06:30:05.243Z","last_update_by":"Elite Mobile"}]};
					var mapped = $.map(result.submitted, function (row) {
	                	row.date_from = formatDate(row.date_from);
	                	row.date_to = formatDate(row.date_to);
						row.expense_date = row.date_from + " to " + row.date_to;
						row.amount = (row.submitted_currency_code) ? row.submitted_currency_code + " " + row.submitted_amount : "";
						row.received_date = (row.date_received) ? formatDate(row.date_received) : "";
	                	if(!row.description)
	                		row.description = "No Report Name";
	                	if(row.submitted_amount)
							row.submitted_amount = parseFloat(row.submitted_amount).toFixed(2);
						
						if(loadOptions.filter == row.status_code)
                            return row;
						
	                });
	                deferred.resolve(mapped);
					/**test end */
					formatErrorMessage(jqXHR, errorThrown);
				},
				success: function (result) {         
	            	console.log(result);
	                var mapped = $.map(result.submitted, function (row) {
	                	row.date_from = formatDate(row.date_from);
	                	row.date_to = formatDate(row.date_to);
						row.expense_date = row.date_from + " to " + row.date_to;
						row.amount = (row.submitted_currency_code) ? row.submitted_currency_code + " " + row.submitted_amount : "";

						row.received_date = (row.date_received) ? formatDate(row.date_received) : "";
	                	if(!row.description)
	                		row.description = "No Report Name";
	                	if(row.submitted_amount)
							row.submitted_amount = parseFloat(row.submitted_amount).toFixed(2);
						
						if(loadOptions.filter == row.status_code)
                            return row;
						
	                });
	                deferred.resolve(mapped);
	            }
            });
	        return deferred;			
		}
	});
	var expensereportslist_nonsubmitted_store = new DevExpress.data.CustomStore({
		load: function (loadOptions) {
			
			var deferred = new $.Deferred();
	        $.ajax({
				url: API_EXPENSE_REPORTS,
				type: 'GET',
				contentType : 'application/json',
				headers: {
				   'X-User-Email' : xuser_email,
				   'X-User-Token' : xuser_token
				},			
				error: function(jqXHR, textStatus, errorThrown){
					formatErrorMessage(jqXHR, errorThrown);
				},
				success: function (result) {  
	            	console.log(result);
	                var mapped = $.map(result.not_submitted, function (row) {
	                	row.date_from = formatDate(row.date_from);
	                	row.date_to = formatDate(row.date_to);
						return row;
	                });
	                deferred.resolve(mapped);
            	}
            });
	        return deferred;			
		}
	});

/* expense reports - submitted */
	var expensereports_submitted_store = new DevExpress.data.CustomStore({
		load: function (loadOptions) {

			
			var deferred = new $.Deferred();
	        $.ajax({
				url: API_EXPENSE_REPORTS_SUBMITTED,
				type: 'GET',
				contentType : 'application/json',
				headers: {
				   'X-User-Email' : xuser_email,
				   'X-User-Token' : xuser_token
				},			
				error: function(jqXHR, textStatus, errorThrown){
					formatErrorMessage(jqXHR, errorThrown);
				},
				success: function (result) {			
	            	console.log(result);
	                var mapped = $.map(result, function (row) {
	                	row.date_from = formatDate(row.date_from);
	                	row.date_to = formatDate(row.date_to);
	                	row.date_received = formatDate(row.date_received);
						return row;
	                });
	                deferred.resolve(mapped);
	            }
            });
	        return deferred;			
		},
			
		byKey: function(key) {
	        //return $.getJSON(API_EXPENSE_REPORTS_SUBMITTED + "/" + encodeURIComponent(key));
			return $.ajax({
				url: API_EXPENSE_REPORTS_SUBMITTED + "/" + encodeURIComponent(key),
				type: 'GET',
				contentType : 'application/json',
				headers: {
				   'X-User-Email' : xuser_email,
				   'X-User-Token' : xuser_token
				},
				error: function(jqXHR, textStatus, errorThrown){
					formatErrorMessage(jqXHR, errorThrown);
				}
			});		        
	    }
	});
/* expense reports - not submitted */
	var expensereports_notsubmitted_store = new DevExpress.data.CustomStore({
		load: function (loadOptions) {
			
			var deferred = new $.Deferred();
			
	        $.ajax({
				url: API_EXPENSE_REPORTS_NOTSUBMITTED,
				type: 'GET',
				contentType : 'application/json',
				headers: {
				   'X-User-Email' : xuser_email,
				   'X-User-Token' : xuser_token
				},			
				error: function(jqXHR, textStatus, errorThrown){
					formatErrorMessage(jqXHR, errorThrown);
				},
				success: function (result) {				
	            	console.log(result);
	                var mapped = $.map(result, function (row) {
//	                	row.date_from = formatDate(row.date_from);
//	                	row.date_to = formatDate(row.date_to);
						return row;
	                });
	                deferred.resolve(mapped);
	            }
            });
	        return deferred;			
		},
			
		byKey: function(key) {
	        //return $.getJSON(API_EXPENSE_REPORTS_NOTSUBMITTED + "/" + encodeURIComponent(key));
			return $.ajax({
				url: API_EXPENSE_REPORTS_NOTSUBMITTED_SHOW + "/" + encodeURIComponent(key),
				type: 'GET',
				contentType : 'application/json',
				headers: {
				   'X-User-Email' : xuser_email,
				   'X-User-Token' : xuser_token
				},
				error: function(jqXHR, textStatus, errorThrown){
					formatErrorMessage(jqXHR, errorThrown);
				}
			});		        
	    },
	 
	    insert: function(values) {
	    	showPleaseWait();
	        $.ajax({
	            url: API_EXPENSE_REPORTS_NOTSUBMITTED,
	            type: 'POST',
	            data: JSON.stringify(values),
	            processData: false,
	            contentType : 'application/json',
				headers: {
				   'X-User-Email' : xuser_email,
				   'X-User-Token' : xuser_token
				},
	            success: function(response, textStatus, jqXhr) { },
				error: function(jqXHR, textStatus, errorThrown){
					formatErrorMessage(jqXHR, errorThrown);
				},
	            complete: function(){
	                hidePleaseWait();
	                console.log('completed');
	                Elite.app.navigate("expensereportslist", { root: true, direction: "backward" });
	                return true;
	            }
	        });
	    },
	 
	    update: function(key, values) {
	    	console.log(API_EXPENSE_REPORTS_NOTSUBMITTED + "/" + encodeURIComponent(key));
	    	showPleaseWait();
	        $.ajax({
	            url: API_EXPENSE_REPORTS_NOTSUBMITTED + "/" + encodeURIComponent(key),
	            type: 'PATCH',
	            data: JSON.stringify(values),
	            processData: false,
	            contentType : 'application/json',
				headers: {
				   'X-User-Email' : xuser_email,
				   'X-User-Token' : xuser_token
				},
	            success: function(response, textStatus, jqXhr) { },
				error: function(jqXHR, textStatus, errorThrown){
					formatErrorMessage(jqXHR, errorThrown);
				},
	            complete: function(){
	                hidePleaseWait();
	                console.log('completed');
	                Elite.app.navigate("expensereportslist", { root: true, direction: "backward" });
	                return true;
	            }
	        });
	    },
	 
	    remove: function(key) {
	    	showPleaseWait();
	        $.ajax({
	            url: API_EXPENSE_REPORTS_NOTSUBMITTED + "/" + encodeURIComponent(key),
	            method: "DELETE",
				error: function(jqXHR, textStatus, errorThrown){
					formatErrorMessage(jqXHR, errorThrown);
				}, 
				complete: function(){
					hidePleaseWait();
					Elite.app.navigate("expensereportslist", { root: true, direction: "backward" });
				}
	        });
	    }
	});

/* Receipt: Expense Items - not submitted */
	var expenseitems_store = new DevExpress.data.CustomStore({
		load: function (loadOptions) {
                                                             
			console.log('load url = ' + API_EXPENSE_ITEMS);
			console.log({
                   'X-User-Email' : xuser_email,
                   'X-User-Token' : xuser_token
               });
			var deferred = new $.Deferred();
            $.ajax({
               url: API_EXPENSE_ITEMS,
               type: 'GET',
               contentType : 'application/json',
               headers: {
                   'X-User-Email' : xuser_email,
                   'X-User-Token' : xuser_token
               },
				error: function(jqXHR, textStatus, errorThrown){
					console.log('error');
					formatErrorMessage(jqXHR, errorThrown);
				},
               success: function (result) {
               	    console.log('success');
                    console.log(result);
                    if(loadOptions.filter == "unattached") 
                    	result = result.unattached;
                    else if(loadOptions.filter == "notsubmitted") 
                    	result = result.not_submitted;
                    else
                    	result = result.unattached.concat(result.not_submitted);
                    var mapped = $.map(result, function (row) {
                        row.expense_date = formatDate(row.expense_date);
						row.expense_amount = parseFloat(row.expense_amount).toFixed(2);
                        return row;
                    });
                    deferred.resolve(mapped);
               }
            });
	        return deferred;
		},
			
		byKey: function(key) {
	        //return $.getJSON(API_EXPENSE_ITEMS + "/" + encodeURIComponent(key));
			return $.ajax({
				url: API_EXPENSE_ITEMS + "/" + encodeURIComponent(key),
				type: 'GET',
				contentType : 'application/json',
				headers: {
				   'X-User-Email' : xuser_email,
				   'X-User-Token' : xuser_token
				},
				error: function(jqXHR, textStatus, errorThrown){
					formatErrorMessage(jqXHR, errorThrown);
				}
			});		        
	    },
	 
	    insert: function(values) {
	    	console.log('insert url = ' + API_EXPENSE_ITEMS);
	    	showPleaseWait();
	        $.ajax({
	            url: API_EXPENSE_ITEMS,
	            type: 'POST',
	            data: JSON.stringify(values),
	            processData: false,
	            contentType : 'application/json',
				headers: {
				   'X-User-Email' : xuser_email,
				   'X-User-Token' : xuser_token
				},
	            success: function(response, textStatus, jqXhr) { console.log(response)},
				error: function(jqXHR, textStatus, errorThrown){
					formatErrorMessage(jqXHR, errorThrown);
				},
	            complete: function(){
	                hidePleaseWait();
	                console.log('completed');
	                Elite.app.navigate("expenseitemslist", { root: true, direction: "backward" });
	                return true;
	            }
	        });
	    },
	 
	    update: function(key, values) {
	    	console.log('update url = ' + API_EXPENSE_ITEMS + "/" + encodeURIComponent(key));
	    	showPleaseWait();
	        $.ajax({
	            url: API_EXPENSE_ITEMS + "/" + encodeURIComponent(key),
	            type: 'PATCH',
	            data: JSON.stringify(values),
	            processData: false,
	            contentType : 'application/json',
				headers: {
				   'X-User-Email' : xuser_email,
				   'X-User-Token' : xuser_token
				},
	            success: function(response, textStatus, jqXhr) { },
				error: function(jqXHR, textStatus, errorThrown){
					formatErrorMessage(jqXHR, errorThrown);
				},
	            complete: function(){
	                hidePleaseWait();
	                console.log('completed');
	                Elite.app.navigate("expenseitemslist", { root: true, direction: "backward" });
	                return true;
	            }
	        });
	    },
	 
	    remove: function(key) {
	    	showPleaseWait();
	    	console.log('remove url = ' +  API_EXPENSE_ITEMS + "/" + encodeURIComponent(key));
	        $.ajax({
	            url: API_EXPENSE_ITEMS + "/" + encodeURIComponent(key),
	            method: "DELETE",
	            contentType : 'application/json',
				headers: {
						  'X-User-Email' : xuser_email,
						  'X-User-Token' : xuser_token
				},
				error: function(jqXHR, textStatus, errorThrown){
					formatErrorMessage(jqXHR, errorThrown);
				},
				complete: function(){
					hidePleaseWait();
					Elite.app.navigate("expenseitemslist", { root: true, direction: "backward" });
				}
	        });
	    }
	});


/* Homeshowing notes */
	var homeshowingnotes_store = new DevExpress.data.CustomStore({
		load: function (loadOptions) {
                                                                 
			var deferred = new $.Deferred();
            $.ajax({
               url: API_HOMESHOWINGS_DETAIL + "/" + localStorage.getItem('homeshowing_id') + "/notes",
               type: 'GET',
               contentType : 'application/json',
               headers: {
                   'X-User-Email' : xuser_email,
                   'X-User-Token' : xuser_token
               },
				error: function(jqXHR, textStatus, errorThrown){
					formatErrorMessage(jqXHR, errorThrown);
				},
                success: function (result) {
                    console.log(result);
                    var mapped = $.map(result, function (row) {
						row.created_at = formatDate(row.created_at);
                        return row;
                    });
                    deferred.resolve(mapped);
                }
            });
	        return deferred;
		},
			
		byKey: function(key) {
			return $.ajax({
				url: API_HOMESHOWINGS_DETAIL + "/" + localStorage.getItem('homeshowing_id') + "/notes/" + encodeURIComponent(key),
				type: 'GET',
				contentType : 'application/json',
				headers: {
				   'X-User-Email' : xuser_email,
				   'X-User-Token' : xuser_token
				},
				error: function(jqXHR, textStatus, errorThrown){
					formatErrorMessage(jqXHR, errorThrown);
				}
			});		        
	    },
	 
	    insert: function(values) {
	    	showPleaseWait();
	        $.ajax({
	            url: API_HOMESHOWINGS_DETAIL + "/" + localStorage.getItem('homeshowing_id') + "/notes",
	            type: 'POST',
	            data: JSON.stringify(values),
	            processData: false,
	            contentType : 'application/json',
				headers: {
				   'X-User-Email' : xuser_email,
				   'X-User-Token' : xuser_token
				},
	            success: function(response, textStatus, jqXhr) { },
				error: function(jqXHR, textStatus, errorThrown){
					formatErrorMessage(jqXHR, errorThrown);
				},
	            complete: function(){
	                hidePleaseWait();
	                console.log('completed');
	                Elite.app.navigate("hoepurchasedetail_notes", { direction: "backward" });
	                return true;
	            }
	        });
	    },
	 
	    update: function(key, values) {
	    	showPleaseWait();
	        $.ajax({
	            url: API_HOMESHOWINGS_DETAIL + "/" + localStorage.getItem('homeshowing_id') + "/notes/" + encodeURIComponent(key),
	            type: 'PATCH',
	            data: JSON.stringify(values),
	            processData: false,
	            contentType : 'application/json',
				headers: {
				   'X-User-Email' : xuser_email,
				   'X-User-Token' : xuser_token
				},
	            success: function(response, textStatus, jqXhr) { },
				error: function(jqXHR, textStatus, errorThrown){
					formatErrorMessage(jqXHR, errorThrown);
				},
	            complete: function(){
	                hidePleaseWait();
	                console.log('completed');
	                Elite.app.navigate("hoepurchasedetail_notes", { direction: "backward" });
	                return true;
	            }
	        });
	    },
	 
	    remove: function(key) {
	        return $.ajax({
	            url: API_HOMESHOWINGS_DETAIL + "/" + localStorage.getItem('homeshowing_id') + "/notes/" + encodeURIComponent(key),
	            method: "DELETE",
	        });
	    }
	});

/* Homeshowing pictures */
var homeshowingpictures_store = new DevExpress.data.CustomStore({
		load: function (loadOptions) {
                                                                
			var deferred = new $.Deferred();
            $.ajax({
               url: API_HOMESHOWINGS_DETAIL + "/" + localStorage.getItem('homeshowing_id') + "/pictures",
               type: 'GET',
               contentType : 'application/json',
               headers: {
                   'X-User-Email' : xuser_email,
                   'X-User-Token' : xuser_token
               },
				error: function(jqXHR, textStatus, errorThrown){
					formatErrorMessage(jqXHR, errorThrown);
				},
                success: function (result) {
                    console.log(result);
                    var mapped = $.map(result, function (row) {
                        return row;
                    });
                    deferred.resolve(mapped);
                }
            });
	        return deferred;
		},
			
		byKey: function(key) {
			return $.ajax({
				url: API_HOMESHOWINGS_DETAIL + "/" + localStorage.getItem('homeshowing_id') + "/pictures/" + encodeURIComponent(key),
				type: 'GET',
				contentType : 'application/json',
				headers: {
				   'X-User-Email' : xuser_email,
				   'X-User-Token' : xuser_token
				},
				error: function(jqXHR, textStatus, errorThrown){
					formatErrorMessage(jqXHR, errorThrown);
				},
                complete: function(){
                	
                }
			});		        
	    },
	 
	    insert: function(values) {
	    	showPleaseWait();
	        $.ajax({
	            url: API_HOMESHOWINGS_DETAIL + "/" + localStorage.getItem('homeshowing_id') + "/pictures",
	            type: 'POST',
	            data: JSON.stringify(values),
	            processData: false,
	            contentType : 'application/json',
				headers: {
				   'X-User-Email' : xuser_email,
				   'X-User-Token' : xuser_token
				},
	            success: function(response, textStatus, jqXhr) { },
				error: function(jqXHR, textStatus, errorThrown){
					formatErrorMessage(jqXHR, errorThrown);
				},
	            complete: function(){
	                hidePleaseWait();
	                console.log('Picture Uploaded');
					var list = $("#pictureslist").dxList("instance");
					list.update();
					list.scrollTo(0);
	                return true;
	            }
	        });
	    },
	 
	    update: function(key, values) {
	    	showPleaseWait();
	        $.ajax({
	            url: API_HOMESHOWINGS_DETAIL + "/" + localStorage.getItem('homeshowing_id') + "/pictures/" + encodeURIComponent(key),
	            type: 'PATCH',
	            data: JSON.stringify(values),
	            processData: false,
	            contentType : 'application/json',
				headers: {
				   'X-User-Email' : xuser_email,
				   'X-User-Token' : xuser_token
				},
	            success: function(response, textStatus, jqXhr) { },
				error: function(jqXHR, textStatus, errorThrown){
					formatErrorMessage(jqXHR, errorThrown);
				},
	            complete: function(){
	                hidePleaseWait();
	                console.log('completed');
					list.update();
					list.scrollTo(0);
	                return true;
	            }
	        });
	    },
	    remove: function(key) {
	        return $.ajax({
	            url: API_HOMESHOWINGS_DETAIL + "/" + localStorage.getItem('homeshowing_id') + "/pictures/" + encodeURIComponent(key),
	            method: "DELETE",
				contentType : 'application/json',
				headers: {
						  'X-User-Email' : xuser_email,
						  'X-User-Token' : xuser_token
				},
  		  		success: function(){
  		  			console.log('success');
  		  		},
				error: function(jqXHR, textStatus, errorThrown){
					//console.log('error');
					formatErrorMessage(jqXHR, errorThrown);
				},
                complete: function(){
                	console.log('complete');                	
                   	hidePleaseWait();
                   	console.log(funcComplete);
                   	funcComplete();
                }
            });
	    }
	});

    
/* Housing */
var housings_store = new DevExpress.data.CustomStore({
		load: function (loadOptions) {
			console.log('housings_store - list')
                                                     
			var deferred = new $.Deferred();
            $.ajax({
               url: API_HOUSINGS,
               type: 'GET',
               contentType : 'application/json',
               headers: {
                   'X-User-Email' : xuser_email,
                   'X-User-Token' : xuser_token
               },
				error: function(jqXHR, textStatus, errorThrown){
					/*test */
					var result = [{"housing_id":3142,"relocation_id":8121,"housing_type":"Host Country","unit_type":"Apartment","property_name":"Go Furnished Housing","address_line_1":"1000 Mission Road","address_line_2":null,"address_line_3":null,"city":"San Diego","postal_code":"92120","state":"CA","state_code":"US-CA","state_name":"CA","country_code":"USA","country_2char_code":"US","start_date":"2014-06-01T00:00:00.000Z","end_date":"2014-06-30T00:00:00.000Z","service_agent_id":null,"service_agent_first_name":null,"service_agent_last_name":null,"service_agent_full_name":null,"service_agent_email":null,"service_agent_phone":null,"vendor_name":"Go Furnished Housing","lockbox":null,"property_phone":null,"mailbox":null,"gate_code":null},{"housing_id":6031,"relocation_id":8121,"housing_type":"Host Country","unit_type":null,"property_name":null,"address_line_1":null,"address_line_2":null,"address_line_3":null,"city":null,"postal_code":null,"state":"B","state_code":"AR-B","state_name":null,"country_code":"ARG","country_2char_code":"AR","start_date":"2016-03-10T00:00:00.000Z","end_date":"2016-04-29T00:00:00.000Z","service_agent_id":null,"service_agent_first_name":null,"service_agent_last_name":null,"service_agent_full_name":null,"service_agent_email":null,"service_agent_phone":null,"vendor_name":"Oakwood Corporate Housing","lockbox":null,"property_phone":null,"mailbox":null,"gate_code":null},{"housing_id":6043,"relocation_id":8121,"housing_type":"Host Country","unit_type":null,"property_name":null,"address_line_1":null,"address_line_2":null,"address_line_3":null,"city":null,"postal_code":null,"state":null,"state_code":null,"state_name":null,"country_code":null,"country_2char_code":null,"start_date":"2016-03-07T00:00:00.000Z","end_date":"2016-04-08T00:00:00.000Z","service_agent_id":null,"service_agent_first_name":null,"service_agent_last_name":null,"service_agent_full_name":null,"service_agent_email":null,"service_agent_phone":null,"vendor_name":"Oakwood Corporate Housing","lockbox":null,"property_phone":null,"mailbox":null,"gate_code":null}];
					var mapped = $.map(result, function (row) {
                    	if(!row.property_name){
                    		row.property_name = "Unknown";
                    	}
                    	row.dates = "";
                    	if(row.start_date && row.end_date){
                			row.dates = formatDate(row.start_date)+" to "+formatDate(row.end_date);
                		}else{
                			if(row.start_date)
                				row.dates = formatDate(row.start_date);
                			else
                				row.dates = formatDate(row.end_date);
                		}
                        return row;
                    });
                    deferred.resolve(mapped);
					/**end */
					formatErrorMessage(jqXHR, errorThrown);
				},
                success: function (result) {
                    console.log(result);
                    var mapped = $.map(result, function (row) {
                    	if(!row.property_name){
                    		row.property_name = "Unknown";
                    	}
                    	row.dates = "";
                    	if(row.start_date && row.end_date){
                			row.dates = formatDate(row.start_date)+" to "+formatDate(row.end_date);
                		}else{
                			if(row.start_date)
                				row.dates = formatDate(row.start_date);
                			else
                				row.dates = formatDate(row.end_date);
                		}
                        return row;
                    });
                    deferred.resolve(mapped);
                }
            });
	        return deferred;
		},
			
		byKey: function(key) {
			console.log('housing_store - item');
			return $.ajax({
				url: API_HOUSINGS + "/" + encodeURIComponent(key),
				type: 'GET',
				contentType : 'application/json',
				headers: {
				   'X-User-Email' : xuser_email,
				   'X-User-Token' : xuser_token
				},
				error: function(jqXHR, textStatus, errorThrown){
					formatErrorMessage(jqXHR, errorThrown);
				}
			});
	    }
	});
	
	var suppliercontacts_store = new DevExpress.data.CustomStore({
		load: function (loadOptions) {
			console.log('suppliercontacts - load = ' +  API_ROOT + "assignments/" + localStorage.getItem("selected_assignmentid") + "/supplier_contacts")
			
			var deferred = new $.Deferred();
			
			$.ajax({
				url: API_ROOT + "assignments/" + localStorage.getItem("selected_assignmentid") + "/supplier_contacts",
				type: 'GET',
				contentType : 'application/json',
				headers: {
				   'X-User-Email' : xuser_email,
				   'X-User-Token' : xuser_token
				},			
				error: function(jqXHR, textStatus, errorThrown){
					/*test*/
					/*var result = [{"service_agent_id":1974,"first_name":"Kylea","last_name":"Johnson","full_name":"Kylea Johnson","job_title":null,"email":"kjohnson@bristolauto.com","phone":null,"assignment_id":8121,"service_order_type":"EQVSSV","service_order_type_name":"Vehicle Shipment","vendor_name":"Bristol Auto Logistics"},{"service_agent_id":1974,"first_name":"Kylea","last_name":"Johnson","full_name":"Kylea Johnson","job_title":null,"email":"kjohnson@bristolauto.com","phone":null,"assignment_id":8121,"service_order_type":"EQVSSV","service_order_type_name":"Vehicle Shipment","vendor_name":"Bristol Auto Logistics"},{"service_agent_id":1974,"first_name":"Kylea","last_name":"Johnson","full_name":"Kylea Johnson","job_title":null,"email":"kjohnson@bristolauto.com","phone":null,"assignment_id":8121,"service_order_type":"EQVSSV","service_order_type_name":"Vehicle Shipment","vendor_name":"Bristol Auto Logistics"}];
                   
                   console.log(result);
                   var mapped = $.map(result, function (row) {
                                      return row;
                                      });
                   deferred.resolve(mapped);*/
				   	/*test end */
                   console.log(errorThrown);
					formatErrorMessage(jqXHR, errorThrown);
				},
				success: function (result) {
					console.log(result);
		            var mapped = $.map(result, function (row) {
						return row;
		            });
		            deferred.resolve(mapped);
		        }
		    });
	        return deferred;			
		},
			
		byKey: function(key) {
			
	    }
	});