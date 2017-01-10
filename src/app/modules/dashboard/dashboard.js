'use strict';

var dashboard = angular.module('dashboard', []);

dashboard.config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('app.dashboard', {
            url: '/dashboard',
            templateUrl: 'src/app/modules/dashboard/dashboard.html',
            controller: 'dashboardCtrl'
        })
    .state('app.dashboard.page', {
        url: '/page',
        templateUrl: 'src/app/modules/page/page-list.html',
        controller: 'pageCtrl'
    })
    .state('app.dashboard.post', {
        url: '/post',
        templateUrl: 'src/app/modules/post/post-list.html',
        // controller: 'postCtrl'
    });
}]);