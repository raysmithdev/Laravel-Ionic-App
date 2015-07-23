angular.module('starter.controllers', [])

.controller('homeCtrl', function($scope, ajax) {

  ajax.get('http://localhost:8000/users')
    .success(function(resp) {
      console.log(resp);
      return false;

      if(resp.success) {
        $state.go('/tab.dash')
      }
      else
      {
        $scope.errorRegistering = true;
      }
  });

})

.controller('LoginCtrl', function($scope, Http, $ionicPopup, $state) {
    $scope.data = {};

    $scope.signIn = function(data)
    {
	    console.log('Clicked!');
	    if (data.username === '') {

		    $scope.validationError = true;
		    console.log('Error');
	    }
    }

    $scope.submitted = true;


    $scope.login = function() {
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
            $state.go('tab.dash');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
    }
})

.controller('RegisterCtrl', function($scope, ajax, $ionicPopup, $state) {

    $scope.signUp = function(data, isValid) {

		if (isValid) {

			ajax.post(data, 'http://localhost:8888/ionic-api/RegisterController/saveUser')
				.success(function(resp) {
					console.log(resp);

					if(resp.success) {
						$state.go('/tab.dash')
					}
					else
					{
						$scope.errorRegistering = true;
					}
			});
		}
	    	$scope.loading = true;


	    console.log(data);
    }

})

.controller('DashCtrl', function($scope) {

	$scope.loginLoading = true;



})


.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
