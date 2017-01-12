'use strict';

angular
    .module('dashboard')
    .controller('dashboardCtrl', function ($scope, $rootScope, pageService,initialPageData) {
        console.log('inside dashboard controller');
        
        $scope.pages = initialPageData;
       
    });