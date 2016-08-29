/**
 * Created by alanruth on 11/8/13.
 */
ELITE['survey'] = function (params) {
    var viewModel = {
		surveryGalleryData : [{
			'title': 'QUESTION1',
			'question': 'I am satisfied with my temporary living experience.',
			'score': 5
		}, {
			'title': 'QUESTION2',
			'question': 'temporary housing question # 2',
			'score': 5
		}, {
			'title': 'QUESTION3',
			'question': 'temporary housing question # 3',
			'score': 5
		}]
	};
	
	return viewModel;
}

function surveryRendered(){
	$('.rateit').rateit({'starwidth': 32, 'starheight':32});
}