(function() {
	
	'use strict';
	
	var app = angular.module('angularApp');

	app.filter('address', function () {
		  return function (input) {
		      return input.street + ', ' + input.city + ', ' + input.state + ', ' + input.zip;
		  };
		});

})();