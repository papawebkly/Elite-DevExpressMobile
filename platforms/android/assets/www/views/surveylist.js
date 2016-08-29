/**
 * Created by alanruth on 11/8/13.
 */
ELITE['surveylist'] = function (params) {
    var viewModel = {
	};
	surveys = [
		{
			index: 0,
			icon: 'img/Signpost.png',
			survey_type: 'Temporary Housing',
			origin: 'Denver, CO',
			status: 'Open',
			score: 4
		},
		{
			index: 1,
			icon: 'img/Box_Open.png',
			survey_type: 'Air put Ground Shipment',
			origin: 'Denver',
			status: 'Closed',
			score: 4
		}
	];
	
	return viewModel;
}

function renderedSurveyList(){
	$('#surveylist_page .rateit').rateit({ max: 20, step: 2 });
}