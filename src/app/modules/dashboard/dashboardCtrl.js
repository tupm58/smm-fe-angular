'use strict';

angular
    .module('dashboard')
    .controller('dashboardCtrl', function (cfpLoadingBar,$scope, $rootScope, pageService,initialPageData,$cookies,$location) {
        console.log('inside dashboard controller');
        
        $scope.pages = initialPageData;

        $scope.isActive = function (path) {
            console.log($location.path() == path);
            return $location.path() == path;
        };
    });