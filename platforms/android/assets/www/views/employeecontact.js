ELITE['employeecontact'] = function (params) {
    var viewModel = {

        phone: ko.observable(''),
        full_name: ko.observable('')
    };

    viewModel.phone('123456789');
    viewModel.full_name('John Wayne');

    return viewModel;
};

