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
	        	"title": "Boston to London",
	        	"onExecute": "#changerelocation",
	        	"icon": "ihome"
	        },
	        {
	        	"title": "Dashboard",
	        	"onExecute": "#home",
	        	"icon": "home"
	        },
			{
	        	"title": "Contacts",
	        	"onExecute": "#contact"
			},         	
	            {
	                "title": "Mobility Advisor",
	                "onExecute": "#coordinator",
	                "icon": "coordinator"
	            },
		        {
	                "title": "Supply Contact",
	                "onExecute": "#suppliercontacts",
	                "icon": "supplier"
	            },/*
	            {
	                "title": "Bristol Contacts",
	                "onExecute": "#contact",
	                "icon": "supplier",
	                "cls": "",
	            	"id": "navmenu_supplier"
	            },*/            
				{
	        		"title": "Move Management",
	        		"onExecute": "#shipmentlist",
	        		"icon": "shipment"
	        	},	        	
	        	{
	        		"title": "Temporary Housing",
	        		"onExecute": "#housinglist",
	        		"icon": "housing"
	        	},	
				{
					"title": "Home Search",
					"onExecute": "#homepurchase",
					"icon": "realestate"
				},        		        		
				{
					"title": "Home Sale",
					"onExecute": "#homesale",
					"icon": "homesale"
				},
				{
					"title": "Neighborhood Scout",
					"onExecute": validate_neighborhoodscout,
					"icon": "neighborhoodscout"
				},
                {
                    "title": "Cultural Training",
                    "onExecute": validate_culture,
                    "icon": "neighborhoodscout"
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
	                "icon": "expenses"
	            },/*
	            {
	                "title": "Submit Receipt",
	                "onExecute": "#expenseitemcapture/0", 
	                "icon": "submitreceipt"
	            },*/
	            {
	                "title": "Bank Accounts",
	                "onExecute": "#banklist",
	                "icon": "bank"
	            }/*,
               {
                   "title": "Expense Item Capture",
                   "onExecute": "#expenseitemcapture",
                   "icon": "money",
	                "cls": ""
               }*/,
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
					"icon": ""
				},
	        	{
	        		"title": "Profile",
	        		"onExecute": "#profile",
	        		"icon": ""
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
                /*{
                    "title": "Privacy Policy",
                    "onExecute": goPolicy,
                    "icon": ""
                },*/
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
					"icon": "password"
				},
				{
	                "title": "Log Out",
	                "onExecute": "",
	                "icon": "logout"
	        	}
        ]
    }
});