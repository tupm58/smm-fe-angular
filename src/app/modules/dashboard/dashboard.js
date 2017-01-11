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
    .state('app.dashboard.page-detail', {
        url: '/page/:pageId',
        templateUrl: 'src/app/modules/page-detail/page-detail.html',
        controller: 'pageDetailCtrl'
    })
    .state('app.dashboard.page-detail.inbox', {
        url: '/page/:pageId/inbox',
        templateUrl: 'src/app/modules/inbox/inbox.html',
        controller: 'inboxCtrl'
    })
    .state('app.dashboard.page-detail.rule-page', {
        url: '/page/:pageId/rule-page',
        templateUrl: 'src/app/modules/rule-page/rule-page.html',
        controller: 'rulePageCtrl'
    })
    .state('app.dashboard.page-detail.manage-user', {
        url: '/page/:pageId/manage-user',
        templateUrl: 'src/app/modules/manage-user/manage-user.html',
        controller: 'manageUserCtrl'
    })
}]);