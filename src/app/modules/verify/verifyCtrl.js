'use strict';

angular
    .module('verify')
    .controller('verifyCtrl', function ($scope, $rootScope, userService, oauthService, pageService,verifyService ) {
        console.log('inside dashboard controller');

        $scope.message = {};
        $scope.param = oauthService.getToken();
       // $scope.param = checkVerifyToken;

        $scope.user = {};
        verifyService.checkToken($scope.user, $scope.param).then(function (response) {
            var result = response.data;

            if(result == 'success'){
                $scope.message = "SUCCESSSSSSSSSSSS";
            }else{
                $scope.message = "Failllllllllllllll";
            }
        })
        
    });