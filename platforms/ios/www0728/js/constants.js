//var DOMAIN = "http://miraclegrow2.herokuapp.com";
//var DOMAIN = "http://72.214.228.250";
//var DOMAIN = "http://miraclegrow.herokuapp.com";
var DOMAIN = "https://miraclegrow.bristolglobal.com";
var API_ROOT = DOMAIN + "/api/v1/";

var	NS_PARTNER_KEY = '0b7b2ad7856464307c307ba494396a5e';
var	NS_PARTNER_NAME = 'bristol';
var	NS_HOST = 'www.neighborhoodscout.com';
var URL_NEIGHBORHOODSCOUT = "http://miraclegrow.bristolglobal.com/neighborhoodscout";
var URL_CULTURE = "http://bristol.expatarrivals.com/";
var BASIC_AUTH = '';

var APP_VERSION = "1" /* Please no use "." because this is used in variables' name for the local storage */
	
var API_EMPOLOYEES = API_ROOT + "employees/EMPLOYEE_ID";
var API_ASSIGNMENTS = API_ROOT + "assignments/ASSIGNMENT_ID/";

var API_LOGIN = API_ROOT + "users/sign_in.json";
var API_FORGOTPWD = DOMAIN + "/users/password/new";
var API_PASSWORD = API_ROOT + "/users/password"
var API_AUTHORIZED_SERVICES = API_ASSIGNMENTS + "authorized_services";

var API_COORDINATOR = API_ASSIGNMENTS + "coordinators";

var API_SHIPMENTS = API_ASSIGNMENTS + "shipments";
var API_HOUSINGS = API_ASSIGNMENTS + "housings";

/* profile */
var API_PROFILE_SPOUSES = API_ASSIGNMENTS + "spouses";
var API_PROFILE_DEPENDENTS = API_ASSIGNMENTS + "dependents";
var API_PROFILE_CONTACTS = API_ASSIGNMENTS + "contacts";
var API_PROFILE_ADDRESSES = API_ASSIGNMENTS + "addresses";

/* expenses */
var API_EXPENSES = API_ASSIGNMENTS + "expenses";
var API_EXPENSE_VOUCHERS = API_ASSIGNMENTS + "expense_vouchers";
var API_EXPENSE_REPORTS = API_ASSIGNMENTS + "expenses";
var API_EXPENSE_ITEMS = API_ASSIGNMENTS + "expense_items";

var API_EXPENSE_REPORTS_SUBMITTED = API_ASSIGNMENTS + "assignment_expense_reports";

var API_EXPENSE_REPORTS_NOTSUBMITTED = API_ASSIGNMENTS + "expense_reports";
var API_EXPENSE_REPORTS_NOTSUBMITTED_SHOW = API_ROOT + "expense_reports";

var API_EXPENSE_CATEGORIES = API_ASSIGNMENTS + "expense_categories";
var API_EXPENSE_ACCOUNTS = API_ASSIGNMENTS + "expense_accounts";

/* bank */
var API_BANK_ACCOUNTS = API_ASSIGNMENTS + "bank_accounts";

var API_BANK_ACCOUNT_LOCATIONS = API_ROOT + "bank_account_locations";
var API_BANK_ACCOUNT_TYPES = API_ROOT + "bank_account_types";

/* Experiences */
var API_EXPERIENCES = API_ASSIGNMENTS + "experiences";

var API_EXPERIENCE_CATEGORIES = API_ROOT + "experience_categories";

/* Home Sale & Purchase */
var API_HOMESALES = API_ASSIGNMENTS + "home_sales";	
var API_HOMESHOWINGS = API_ASSIGNMENTS + "home_showings";
var API_HOMESHOWINGS_DETAIL = API_ROOT + "home_showings";

/* common data */
var API_SPOUSE_RELATIONSHIPS = API_ROOT + "spouse_relationships";

var API_DEPENDENT_RELATIONSHIPS = API_ROOT + "dependent_relationships";
var API_LOCATION_TYPES = API_ROOT + "location_types";
var API_CONTACT_TYPES = API_ROOT + "contact_types";
var API_STATE_PROVINCES = API_ROOT + "state_provinces";
var API_COUNTRIES = API_ROOT + "countries";
var API_CURRENCIES = API_ROOT + "currencies";

var API_PRIVACY_POLICY = DOMAIN + "/privacy";

/* constants */
var lookupGenders = [
	{code: "EQGNML", display_value: "Male"},
	{code: "EQGNFM", display_value: "Female"}/*,
	{code: "EQGNUN", display_value: ""}	*/
];
var lookupPrimary = [
	{code: 'EQTRUE', display_value: "Yes"},
	{code: 'EQFALSE', display_value: "No"}
];
var intermediaries = [
	{code: 'yes', display_value: "Yes"},
	{code: 'no', display_value: "No"}
];
var intermediaries = [
	{code: 'yes', display_value: "Yes"},
	{code: 'no', display_value: "No"}
];
var lookupCurrencies = [
	{code: "USD", display_value: "USD"},
	{code: "EUR", display_value: "EUR"}
];
var publicExperienceCategories = [{"id":1,"name":"Bristol Advisor","description":"Compliment"},{"id":2,"name":"Move Management","description":"Compliment"},{"id":3,"name":"Home Sale","description":"Compliment"},{"id":4,"name":"Home Purchase","description":"Compliment"},{"id":5,"name":"Rental","description":"Compliment"},{"id":6,"name":"Temp Housing","description":"Compliment"},{"id":7,"name":"Mortgage","description":"Compliment"},{"id":8,"name":"Expense","description":"Compliment"}];
