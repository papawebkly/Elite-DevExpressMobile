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
	                ELITE.app.navigate("profile_dependents", { root: true, direction: "backward" });
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
	                ELITE.app.navigate("profile_dependents", { root: true, direction: "backward" });
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
	                ELITE.app.navigate("profile_contacts", { root: true, direction: "backward" });
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
	                ELITE.app.navigate("profile_contacts", { root: true, direction: "backward" });
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
	                ELITE.app.navigate("profile_addresses", { root: true, direction: "backward" });
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
	                ELITE.app.navigate("profile_addresses", { root: true, direction: "backward" });
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
	                ELITE.app.navigate("banklist", { root: true, direction: "backward" });
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
	                ELITE.app.navigate("banklist", { root: true, direction: "backward" });
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
					formatErrorMessage(jqXHR, errorThrown);
				},
				success: function (result) {
	                var mapped = $.map(result, function (row) {
	                	console.log(row);
	                    row.experience_category_id = (row.experience_category) ? row.experience_category.id : -1;
	                	row.experience_category_name = (row.experience_category) ? row.experience_category.name : "";
	                	row.created_at = formatDate(row.created_at);                	
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
	                ELITE.app.navigate("experienceslist", { root: true, direction: "backward" });
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
	                ELITE.app.navigate("experienceslist", { root: true, direction: "backward" });
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
	                ELITE.app.navigate("homepurchase", { root: true, direction: "backward" });
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
	                ELITE.app.navigate("homepurchase", { root: true, direction: "backward" });
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
					formatErrorMessage(jqXHR, errorThrown);
				},
				success: function (result) {         
	            	console.log(result);
	                var mapped = $.map(result.submitted, function (row) {
	                	row.date_from = formatDate(row.date_from);
	                	row.date_to = formatDate(row.date_to);
	                	if(!row.description)
	                		row.description = "No Report Name";
	                	if(row.submitted_amount)
							row.submitted_amount = parseFloat(row.submitted_amount).toFixed(2);
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
	                ELITE.app.navigate("expensereportslist", { root: true, direction: "backward" });
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
	                ELITE.app.navigate("expensereportslist", { root: true, direction: "backward" });
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
					ELITE.app.navigate("expensereportslist", { root: true, direction: "backward" });
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
	                ELITE.app.navigate("expenseitemslist", { root: true, direction: "backward" });
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
	                ELITE.app.navigate("expenseitemslist", { root: true, direction: "backward" });
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
					ELITE.app.navigate("expenseitemslist", { root: true, direction: "backward" });
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
	                ELITE.app.navigate("hoepurchasedetail_notes", { direction: "backward" });
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
	                ELITE.app.navigate("hoepurchasedetail_notes", { direction: "backward" });
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
                			row.dates = formatDate(row.start_date)+" - "+formatDate(row.end_date);
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