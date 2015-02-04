(function () {
    'use strict';

    angular.module('angularApp').controller('DialogsController', ['$scope', '$rootScope', '$timeout', 'app', function($scope,$rootScope,$timeout,app){
		
		//-- Variables --//
		
		$scope.lang = 'en-US';
		$scope.language = 'English';

		var _progress = 33;
		
		$scope.name = '';
		$scope.confirmed = 'No confirmation yet!';
		
		$scope.custom = {
			val: 'Initial Value'
		};
		
		//-- Listeners & Watchers --//

		$scope.$watch('lang',function(val,old){
			switch(val){
				case 'en-US':
					$scope.language = 'English';
					break;
				case 'es':
					$scope.language = 'Spanish';
					break;
			}
		});

		//-- Methods --//

		$scope.setLanguage = function(lang){
			$scope.lang = lang;
		};

		$scope.launch = function(which){
			switch(which){
				case 'error':
					app.dialogs.error();
					break;
				case 'wait':
					var dlg = app.dialogs.wait(undefined,undefined,_progress);
					_fakeWaitProgress();
					break;
				case 'notify':
					app.dialogs.notify();
					break;
				case 'confirm':
					var dlg = app.dialogs.confirm('Are you sure?',"Please tell me!",["Yeah","May Be!","No Way!"]);
					dlg.result.then(function(btn){
						$scope.confirmed = 'You confirmed "Yes."';
					},function(btn){
						$scope.confirmed = 'You confirmed "No."';
					});
					break;
				case 'custom':
					var dlg = app.dialogs.create('/dialogs/custom.html','customDialogCtrl',{},'lg');
					dlg.result.then(function(name){
						$scope.name = name;
					},function(){
						if(angular.equals($scope.name,''))
							$scope.name = 'You did not enter in your name!';
					});
					break;
				case 'custom2':
					var dlg = app.dialogs.create('/dialogs/custom2.html','customDialogCtrl2',$scope.custom,'lg');
					break;
			}
		}; // end launch
		
		var _fakeWaitProgress = function(){
			$timeout(function(){
				if(_progress < 100){
					_progress += 33;
					$rootScope.$broadcast('dialogs.wait.progress',{'progress' : _progress});
					_fakeWaitProgress();
				}else{
					$rootScope.$broadcast('dialogs.wait.complete');
				}
			},1000);
		};
	}]) // end controller(dialogsServiceTest)
	
	.controller('customDialogCtrl',['$scope', '$modalInstance', 'data', function($scope,$modalInstance,data){
		//-- Variables --//

		$scope.user = {name : ''};

		//-- Methods --//
		
		$scope.cancel = function(){
			$modalInstance.dismiss('Canceled');
		}; // end cancel
		
		$scope.save = function(){
			$modalInstance.close($scope.user.name);
		}; // end save
		
		$scope.hitEnter = function(evt){
			if(angular.equals(evt.keyCode,13) && !(angular.equals($scope.user.name,null) || angular.equals($scope.user.name,'')))
				$scope.save();
		};
	}]) // end controller(customDialogCtrl)
	
	.controller('customDialogCtrl2',['$scope', '$modalInstance', 'data', function($scope,$modalInstance,data){
		
		$scope.data = data;
		
		//-- Methods --//
		
		$scope.done = function(){
			$modalInstance.close($scope.data);
		}; // end done
		
	}])

	.run(['$templateCache',function($templateCache){
  		$templateCache.put('/dialogs/custom.html','<div class="modal-header"><h4 class="modal-title"><span class="glyphicon glyphicon-star"></span> User\'s Name</h4></div><div class="modal-body"><ng-form name="nameDialog" novalidate role="form"><div class="form-group input-group-lg" ng-class="{true: \'has-error\'}[nameDialog.username.$dirty && nameDialog.username.$invalid]"><label class="control-label" for="course">Name:</label><input type="text" class="form-control" name="username" id="username" ng-model="user.name" ng-keyup="hitEnter($event)" required><span class="help-block">Enter your full name, first &amp; last.</span></div></ng-form></div><div class="modal-footer"><button type="button" class="btn btn-default" ng-click="cancel()">Cancel</button><button type="button" class="btn btn-primary" ng-click="save()" ng-disabled="(nameDialog.$dirty && nameDialog.$invalid) || nameDialog.$pristine">Save</button></div>');
  		$templateCache.put('/dialogs/custom2.html','<div class="modal-header"><h4 class="modal-title"><span class="glyphicon glyphicon-star"></span> Custom Dialog 2</h4></div><div class="modal-body"><label class="control-label" for="customValue">Custom Value:</label><input type="text" class="form-control" id="customValue" ng-model="data.val" ng-keyup="hitEnter($event)"><span class="help-block">Using "dialogsProvider.useCopy(false)" in your applications config function will allow data passed to a custom dialog to retain its two-way binding with the scope of the calling controller.</span></div><div class="modal-footer"><button type="button" class="btn btn-default" ng-click="done()">Done</button></div>')
	}]); 
    
})();