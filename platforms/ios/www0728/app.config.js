window.Elite = $.extend(true, window.Elite, {
    "config": {
    	"layoutSet": "slideout",
	    "commandMapping": {
	      "ios-header-toolbar": {
	        "commands": [
	          {
	            "id": "menu-add",
	            "location": "menu"
	          },
	          {
	            "id": "menu-edit",
	            "location": "menu"
	          },
	          {
	            "id": "menu-remove",
	            "location": "menu"
	          },
	          	{
	          		"id": "back",
	          		"location": "before"
	          	}
	        ]
	      },
	      "android-header-toolbar": {
	        "commands": [
	          {
	            "id": "menu-add",
	            "location": "menu"
	          },
	          {
	            "id": "menu-edit",
	            "location": "menu"
	          },
	          {
	            "id": "menu-remove",
	            "location": "menu"
	          }
	        ]
	      },
	      "win8-phone-appbar": {
	        "commands": [
	          {
	            "id": "menu-add",
	            "location": "menu"
	          },
	          {
	            "id": "menu-edit",
	            "location": "menu"
	          },
	          {
	            "id": "menu-remove",
	            "location": "menu"
	          }
	        ]
	      },
	      "tizen-header-toolbar": {
	        "commands": [
	          {
	            "id": "menu-add",
	            "location": "menu"
	          },
	          {
	            "id": "menu-edit",
	            "location": "menu"
	          },
	          {
	            "id": "menu-remove",
	            "location": "menu"
	          }
	        ]
	      },
	      "generic-header-toolbar": {
	        "commands": [
	          {
	            "id": "menu-add",
	            "location": "menu"
	          },
	          {
	            "id": "menu-edit",
	            "location": "menu"
	          },
	          {
	            "id": "menu-remove",
	            "location": "menu"
	          }
	        ]
	      }
	    },    		
        "navigation": [
	        {
	        	"title": "HOME",
	        	"onExecute": "#home",
	        	"icon": "home",
	            "cls": "",
	            "id": "navmenu_home"
	        },
			{
	        	"title": "CONTACTS",
	        	"cls": "section_header",
	        	"onExecute": "#contact",
	            "id": "navmenu_contacts"
	        },         	
	            {
	                "title": "Mobility Advisor",
	                "onExecute": "#coordinator",
	                "icon": "coordinator",
	                "cls": "",
	            	"id": "navmenu_coordinator"
	            },
		        {
	                "title": "Supplier Contacts",
	                "onExecute": "#suppliercontacts",
	                "icon": "supplier",
	                "cls": "navmenu_supplier"
	            },/*
	            {
	                "title": "Bristol Contacts",
	                "onExecute": "#contact",
	                "icon": "supplier",
	                "cls": "",
	            	"id": "navmenu_supplier"
	            },*/
			{
	        	"title": "SERVICES",
	        	"cls": "section_header",
	        	"onExecute": "#",
	            "id": "navmenu_services"
	        }, 	            
				{
	        		"title": "Move Management",
	        		"onExecute": "#shipmentlist",
	        		"icon": "shipment",
	                "cls": "",
	            	"id": "navmenu_shipment"
	        	},	        	
	        	{
	        		"title": "Temporary Housing",
	        		"onExecute": "#housinglist",
	        		"icon": "housing",
	                "cls": "",
	            	"id": "navmenu_housing"
	        	},	        		        		
				{
					"title": "Home Sale",
					"onExecute": "#homesale",
					"icon": "realestate",
	                "cls": "",
	            	"id": "navmenu_homesale"
				},
				{
					"title": "Home Search",
					"onExecute": "#homepurchase",
					"icon": "realestate",
	                "cls": "",
	            	"id": "navmenu_homepurchase"
				},
				{
					"title": "Neighborhood Scout",
					"onExecute": validate_neighborhoodscout,
					"icon": "neighborhoodscout",
	                "cls": "",
	            	"id": "navmenu_scout"
				},
                {
                    "title": "Cultural Training",
                    "onExecute": validate_culture,
                    "icon": "neighborhoodscout",
                    "cls": "",
                    "id": "navmenu_culture"
                },
                {
	        	"title": "EXPENSES",
	        	"cls": "section_header",
	        	"onExecute": "",
	            "id": "navmenu_expenses"
	        },
	        		
	            /*{
	                "title": "Spending",
	                "onExecute": "",
	                "icon": "expenses",
	                "cls": ""
	            },*/
	            {
	                "title": "Expense Reports",
	                "onExecute": "#expensereportslist",
	                "icon": "expenses",
	                "cls": "",
	            	"id": "navmenu_expensereports"
	            },
	            {
	                "title": "Submit Receipt",
	                "onExecute": "#expenseitemcapture/0", /* #expenseitemslist */
	                "icon": "submitreceipt",
	                "cls": "",
	            	"id": "navmenu_receipts"
	            },
	            {
	                "title": "Bank Accounts",
	                "onExecute": "#banklist",
	                "icon": "bank",
	                "cls": "",
	            	"id": "navmenu_bank"
	            }/*,
               {
                   "title": "Expense Item Capture",
                   "onExecute": "#expenseitemcapture",
                   "icon": "money",
	                "cls": ""
               }*/,
			{
	        	"title": "FEEDBACK",
	        	"cls": "section_header",
	        	"onExecute": "#",
	            "id": "navmenu_feedback"
	        },    
	        	/*
				{
					"title": "Quality Survey's",
					"onExecute": "#givefeedback",
					"icon": "feedback",
	                "cls": ""
				},*/
				{
					"title": "Feedback",
					"onExecute": "#experienceslist",
					"icon": "experiences",
	                "cls": "",
	            	"id": "navmenu_experiences"
				},
	        {
	        	"title": "SETTINGS",
	        	"cls": "section_header",
	            "id": "navmenu_settings"
	        },
	        	{
	        		"title": "Change Relocation",
	        		"onExecute": "#changerelocation",
	        		"icon": "login",
	                "cls": "",
	            	"id": "navmenu_login"
	        	},
	        	{
	        		"title": "Profile",
	        		"onExecute": "#profile",
	        		"icon": "profile",
	                "cls": "",
	            	"id": "navmenu_profile"
	        	},
		        /*{
	        		"title": "Account Settings",
	        		"onExecute": "#account_settings",
	        		"icon": "preferences"
	        	},
				{
					"title": "Quality Surveys",
					"onExecute": "#surveylist",
					"icon": "survey",
	                "cls": ""
				},
	            /*{
                    "title": "Policy",
                    "onExecute": "#policy",
                    "icon": "policy",
	                "cls": ""
                },*/
                {
                    "title": "Privacy Policy",
                    "onExecute": goPolicy,
                    "icon": "policy",
	                "cls": "",
	            	"id": "navmenu_policy"
                },
	        	/*{
	                "title": "Help",
	                "onExecute": "#help",
	                "icon": "help",
	                "cls": "",
	            	"id": "navmenu_help"
	        	},*/
				{
					"title": "Change Password",
					"onExecute": "#password",
					"icon": "password",
					"cls": "",
					"id": "navmenu_password"
				},
				{
	                "title": "Log Out",
	                "onExecute": logout,
	                "icon": "logout",
	                "cls": "",
	            	"id": "navmenu_logout"
	        	}
        ]
    }
});