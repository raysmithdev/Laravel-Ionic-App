angular.module('starter.controllers', [])

.controller('homeCtrl', function($scope, ajax, $ionicLoading) {

})

.controller('LoginCtrl', function($scope, ajax, $ionicPopup, $state) {
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

.controller('RegisterCtrl', function($scope, ajax, $ionicPopup, $state, $ionicLoading) {

    $scope.signUp = function(data, isValid) {

  		if (isValid) {

        $ionicLoading.show();

        // Check if username exists


        ajax.post(data, 'http://localhost:8000/check-if-username-exists')
          .success(function(resp) {

            // Username already taken
            if (resp.success)
            {
              $scope.usernameExists = true;
              $scope.data = {};
              $ionicLoading.hide();
            }
            else {
                ajax.post(data, 'http://localhost:8000/register-user')
                  .success(function(resp) {

                    if(resp.success) {
                      $ionicLoading.hide();
                      $state.go('tab.dash');
                    }
                    else
                    {
                      $scope.errorRegistering = true;
                    }
                });
            }
          });
  		}
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
