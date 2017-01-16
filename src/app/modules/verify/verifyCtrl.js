'use strict';

angular
    .module('verify')
    .controller('verifyCtrl', function ($scope, $rootScope,$cookies, userService, oauthService, pageService,verifyService ) {
        console.log('inside dashboard controller');

        $scope.message = {};
        $scope.param = oauthService.getToken();
       // $scope.param = checkVerifyToken;

        $scope.userId = $cookies.get('user-id');
        verifyService.checkToken($scope.userId, $scope.param).then(function (response) {
            var result = response.data;

            if(result == 'success'){
                $scope.message = "YOU VERIFIED SUCCESSFULLY";
            }else{
                $scope.message = "VERIFY FAIL";
            }
        })
        
    });