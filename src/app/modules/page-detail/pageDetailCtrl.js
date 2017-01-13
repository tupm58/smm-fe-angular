/**
 * Created by thanh huyền on 11-Jan-17.
 */
'use strict';

angular
    .module('dashboard')
    .controller('pageDetailCtrl', function ($scope, $rootScope, pageService,$stateParams) {
        console.log('inside dashboard controller');
        $scope.pageId = $stateParams.pageId;

        function init() {
            console.log(window.FB);
            getPageDetail($scope.pageId);
        }
        init();
        
        function getPageDetail(pageId){
            pageService.getPageDetail(pageId)
                .then(function(response){
                    console.log(response);
                    $rootScope.pageAccessToken = response.data.accessToken;
                    
                })
        }
    });