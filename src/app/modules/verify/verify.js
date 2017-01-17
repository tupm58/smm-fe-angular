'use strict';

var verify = angular.module('verify', []);

verify.config(['$stateProvider', function ($stateProvider, $stateParams, oauthService) {
    $stateProvider
        .state('app.verify', {
            url: '/verify',
            templateUrl: 'src/app/modules/verify/verify-user.html',
            controller: 'verifyCtrl'
        })
}]);
