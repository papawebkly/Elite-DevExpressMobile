/**
 * Created by alanruth on 11/8/13.
 */
Elite['suppliercontacts'] = function (params) {
    var viewModel = {
		suppliercontacts_list: new DevExpress.data.DataSource({
    		store: suppliercontacts_store
		}),
		sendEmail: function(r){
			var email_addr = r.model.email;
			window.plugin.email.open({ to: [email_addr] });
		},
		callPhone: function(r){
			var phone_number = r.model.phone;
			window.location.href='tel:' + phone_number;
		}
	};

	return viewModel;
}

