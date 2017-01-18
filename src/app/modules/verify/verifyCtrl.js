'use strict';

angular
    .module('verify')
    .controller('verifyCtrl', function ($scope, $rootScope,$cookies,oauthService, verifyService ) {
        console.log('inside dashboard controller');
        // $scope.message = {};
        // $scope.result = initialVerify;
        // if($scope.result == 'success'){
        //     $scope.message = "YOU VERIFIED SUCCESSFULLY";
        // }else{
        //     $scope.message = "VERIFY FAIL";
        // }
        
        
        $scope.message = {};
        $scope.param = oauthService.getToken();
        $scope.userId = $cookies.get('user-id');
        verifyService.checkToken($scope.userId, $scope.param).then(function (response) {
            var result = response.data;
            $cookies.remove('verifyID');
            if(result == 'success'){

                $scope.message = "YOU VERIFIED SUCCESSFULLY";
            }else{
                $scope.message = "VERIFY FAIL";
            }
        })
        
    });