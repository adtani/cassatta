(function() {

	'use strict';

	var app = angular.module('angularApp');

	app.directive('listview', function() {
		return {
			restrict : 'E',
			templateUrl : 'list.view.html'
		};
	});

})();