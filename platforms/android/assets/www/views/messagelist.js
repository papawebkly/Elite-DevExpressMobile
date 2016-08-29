ELITE['messagelist'] = function (params) {
    var viewModel = {

        messages: [
            {
                contact_name: 'Tom Watkins',
                last_message: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
                last_contact: '10/1/2013'
            },
            {
                contact_name: 'Sue Whales',
                last_message: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
                last_contact: '10/5/2013'
            }
        ],

        contact_name: ko.observable(''),
        last_message: ko.observable(''),
        last_contact: ko.observable('')
    };

//    function handleItemClick(e) {
//        ELITE.app.navigate("shipment/show" + e.itemData.id);
//    };

    return viewModel;
};

