'use strict';

var dashboard = angular.module('dashboard', []);

dashboard.config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('app.dashboard', {
            url: '/dashboard',
            templateUrl: 'src/app/modules/dashboard/dashboard.html',
            controller: 'dashboardCtrl'
        });
}]);