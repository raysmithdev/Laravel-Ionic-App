angular.module('starter.controllers', [])

.controller('homeCtrl', function($scope, ajax, $ionicLoading) {

})

.controller('LoginCtrl', function($scope, ajax, $ionicLoading, $state) {

    $scope.signIn = function(data, isValid)
    {
	     if (isValid)
       {
         $ionicLoading.show();
         ajax.post(data, 'http://localhost:8000/login-user')
           .success(function(resp) {

             if (resp.success)
             {
               $ionicLoading.hide();
               $state.go('tab.dash');
             }
             else {
               $scope.loginError = true;
             }

           });
      }
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


.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
