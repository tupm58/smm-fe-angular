'use strict';

angular
    .module('dashboard')
    .controller('dashboardCtrl', function ($scope, $rootScope, pageService) {
        console.log('inside dashboard controller');
        
        $scope.pages = [];
        $scope.getPage = function() {
            pageService.getPage(function(response){
                console.log(response);
                // for (var i=0; i<response.length; i++) {
                //     $scope.pages.push(response[i]);
                // }
            },function(err){
                console.log(err)
            });
        }
    });