/**
 * Created by thanh huyền on 11-Jan-17.
 */
'use strict';

angular
    .module('dashboard')
    .controller('pageDetailCtrl', function ($scope, $rootScope, pageService,$stateParams,initialPageDetailData) {
        console.log('inside page detail controller');
        $scope.pageId = $stateParams.pageId;

        $rootScope.pageAccessToken = initialPageDetailData.accessToken;
        $rootScope.pageName = initialPageDetailData.pageName;
        $rootScope.avatarPageUrl = initialPageDetailData.avatarPageUrl;
    });